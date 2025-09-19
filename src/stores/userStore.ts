import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// واجهة المستخدم
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  preferences: {
    language: "ar" | "en";
    notifications: boolean;
    emailUpdates: boolean;
  };
}

// واجهة العنصر المحفوظ
export interface SavedItem {
  id: string;
  type: "offer" | "card" | "booking";
  itemId: string;
  companyId?: string;
  title: { ar: string; en: string };
  image: string;
  price?: number;
  originalPrice?: number;
  savedAt: string;
}

// واجهة عنصر السلة
export interface CartItem {
  id: string;
  type: "offer" | "card" | "booking";
  itemId: string;
  companyId?: string;
  title: { ar: string; en: string };
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  addedAt: string;
}

// واجهة الطلب
export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
}

// واجهة حالة المستخدم
interface UserState {
  // بيانات المستخدم
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;

  // المحفوظات
  savedItems: SavedItem[];

  // السلة
  cartItems: CartItem[];

  // الطلبات
  orders: Order[];

  // الإجراءات OTP
  sendOtp: () => Promise<{ status: boolean; msg: string }>;
  verifyOtp: (
    phone: string,
    otp: string
  ) => Promise<{
    status: boolean;
    msg: string;
    data?: { user: User; token: string };
  }>;
  completeRegistration: (
    userData: Partial<User>
  ) => Promise<{ status: boolean; msg: string }>;

  // الإجراءات القديمة (للتوافق)
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;

  // المحفوظات
  addToSaved: (item: Omit<SavedItem, "id" | "savedAt">) => void;
  removeFromSaved: (itemId: string) => void;
  isItemSaved: (itemId: string) => boolean;

  // السلة
  addToCart: (item: Omit<CartItem, "id" | "addedAt">) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // إعادة تعيين البيانات
  resetStore: () => void;

  // الطلبات
  createOrder: (paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

// بيانات وهمية للمستخدمين
const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Ahmed Mohammed",
    phone: "+966501234567",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    createdAt: "2024-01-15T10:00:00Z",
    preferences: {
      language: "ar",
      notifications: true,
      emailUpdates: true,
    },
  },
  {
    id: "2",
    email: "sara@example.com",
    name: "Sarah Ahmed",
    phone: "+966507654321",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isVerified: true,
    createdAt: "2024-02-20T14:30:00Z",
    preferences: {
      language: "ar",
      notifications: false,
      emailUpdates: true,
    },
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // الحالة الأولية
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      otpSent: false,
      savedItems: [
        // بيانات وهمية للمحفوظات
        {
          id: "saved_1",
          type: "offer",
          itemId: "hunger-burger-50",
          companyId: "hunger-station",
          title: { ar: "خصم 50% على البرجر", en: "50% off on Burgers" },
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
          price: 225,
          originalPrice: 450,
          savedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "saved_2",
          type: "card",
          itemId: "stc-tv-3months",
          companyId: "stc",
          title: { ar: "STC TV 3 أشهر", en: "STC TV 3 Months" },
          image:
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
          price: 100,
          originalPrice: 150,
          savedAt: "2024-01-20T14:30:00Z",
        },
        {
          id: "saved_3",
          type: "offer",
          itemId: "pizza-hut-30",
          companyId: "pizza-hut",
          title: { ar: "خصم 30% على البيتزا", en: "30% off on Pizza" },
          image:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
          price: 70,
          originalPrice: 100,
          savedAt: "2024-01-22T16:45:00Z",
        },
        {
          id: "saved_4",
          type: "booking",
          itemId: "flight-ticket-riyadh-dubai",
          companyId: "saudi-airlines",
          title: {
            ar: "تذكرة طيران الرياض - دبي",
            en: "Flight Ticket Riyadh - Dubai",
          },
          image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
          price: 450,
          originalPrice: 600,
          savedAt: "2024-01-25T11:20:00Z",
        },
        {
          id: "saved_5",
          type: "card",
          itemId: "netflix-6months",
          companyId: "netflix",
          title: { ar: "نتفليكس 6 أشهر", en: "Netflix 6 Months" },
          image:
            "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=400&fit=crop",
          price: 180,
          originalPrice: 240,
          savedAt: "2024-01-28T13:15:00Z",
        },
        {
          id: "saved_6",
          type: "offer",
          itemId: "kfc-chicken-40",
          companyId: "kfc",
          title: { ar: "خصم 40% على الدجاج", en: "40% off on Chicken" },
          image:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=400&fit=crop",
          price: 36,
          originalPrice: 60,
          savedAt: "2024-01-30T18:30:00Z",
        },
        {
          id: "saved_7",
          type: "booking",
          itemId: "car-rental-toyota-camry",
          companyId: "budget-rental",
          title: {
            ar: "إيجار سيارة تويوتا كامري",
            en: "Toyota Camry Car Rental",
          },
          image:
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
          price: 120,
          originalPrice: 180,
          savedAt: "2024-02-01T09:00:00Z",
        },
        {
          id: "saved_8",
          type: "card",
          itemId: "spotify-premium-1year",
          companyId: "spotify",
          title: { ar: "سبوتيفاي بريميوم سنة", en: "Spotify Premium 1 Year" },
          image:
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
          price: 240,
          originalPrice: 360,
          savedAt: "2024-02-03T15:45:00Z",
        },
      ],
      cartItems: [
        // بيانات وهمية للسلة
        {
          id: "cart_1",
          type: "offer",
          itemId: "starbucks-coffee-35",
          companyId: "starbucks",
          title: { ar: "خصم 35% على القهوة", en: "35% off on Coffee" },
          image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
          price: 29,
          originalPrice: 45,
          quantity: 2,
          addedAt: "2024-01-25T09:15:00Z",
        },
      ],
      orders: [
        // بيانات وهمية للطلبات
        {
          id: "order_1",
          items: [
            {
              id: "cart_1",
              type: "offer",
              itemId: "hunger-burger-50",
              companyId: "hunger-station",
              title: { ar: "خصم 50% على البرجر", en: "50% off on Burgers" },
              image:
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
              price: 225,
              originalPrice: 450,
              quantity: 1,
              addedAt: "2024-01-10T10:00:00Z",
            },
          ],
          totalAmount: 225,
          status: "completed",
          paymentMethod: "Credit Card",
          createdAt: "2024-01-10T10:00:00Z",
          completedAt: "2024-01-10T10:30:00Z",
        },
        {
          id: "order_2",
          items: [
            {
              id: "cart_2",
              type: "card",
              itemId: "netflix-6months",
              companyId: "netflix",
              title: {
                ar: "اشتراك نتفليكس 6 أشهر",
                en: "Netflix 6 Months Subscription",
              },
              image:
                "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=400&fit=crop",
              price: 120,
              originalPrice: 180,
              quantity: 1,
              addedAt: "2024-01-15T14:20:00Z",
            },
          ],
          totalAmount: 120,
          status: "pending",
          paymentMethod: "Digital Wallet",
          createdAt: "2024-01-15T14:20:00Z",
        },
        {
          id: "order_3",
          items: [
            {
              id: "cart_3",
              type: "booking",
              itemId: "flight-ticket-riyadh-dubai",
              companyId: "saudi-airlines",
              title: {
                ar: "تذكرة طيران الرياض - دبي",
                en: "Flight Ticket Riyadh - Dubai",
              },
              image:
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
              price: 450,
              originalPrice: 600,
              quantity: 2,
              addedAt: "2024-01-20T09:15:00Z",
            },
          ],
          totalAmount: 900,
          status: "confirmed",
          paymentMethod: "Bank Transfer",
          createdAt: "2024-01-20T09:15:00Z",
        },
        {
          id: "order_4",
          items: [
            {
              id: "cart_4",
              type: "offer",
              itemId: "pizza-hut-30",
              companyId: "pizza-hut",
              title: { ar: "خصم 30% على البيتزا", en: "30% off on Pizza" },
              image:
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
              price: 70,
              originalPrice: 100,
              quantity: 3,
              addedAt: "2024-01-22T16:45:00Z",
            },
          ],
          totalAmount: 210,
          status: "completed",
          paymentMethod: "Cash",
          createdAt: "2024-01-22T16:45:00Z",
          completedAt: "2024-01-22T17:15:00Z",
        },
        {
          id: "order_5",
          items: [
            {
              id: "cart_5",
              type: "card",
              itemId: "spotify-premium-1year",
              companyId: "spotify",
              title: {
                ar: "اشتراك سبوتيفاي بريميوم سنة",
                en: "Spotify Premium 1 Year",
              },
              image:
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
              price: 36,
              originalPrice: 60,
              quantity: 1,
              addedAt: "2024-01-25T11:30:00Z",
            },
          ],
          totalAmount: 36,
          status: "cancelled",
          paymentMethod: "Credit Card",
          createdAt: "2024-01-25T11:30:00Z",
        },
        {
          id: "order_6",
          items: [
            {
              id: "cart_6",
              type: "booking",
              itemId: "car-rental-toyota-camry",
              companyId: "budget-rental",
              title: {
                ar: "إيجار سيارة تويوتا كامري",
                en: "Toyota Camry Car Rental",
              },
              image:
                "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
              price: 120,
              originalPrice: 180,
              quantity: 1,
              addedAt: "2024-01-28T08:00:00Z",
            },
          ],
          totalAmount: 120,
          status: "pending",
          paymentMethod: "Digital Wallet",
          createdAt: "2024-01-28T08:00:00Z",
        },
        {
          id: "order_7",
          items: [
            {
              id: "cart_7",
              type: "offer",
              itemId: "starbucks-coffee-40",
              companyId: "starbucks",
              title: { ar: "خصم 40% على القهوة", en: "40% off on Coffee" },
              image:
                "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
              price: 45,
              originalPrice: 75,
              quantity: 2,
              addedAt: "2024-01-30T12:00:00Z",
            },
          ],
          totalAmount: 90,
          status: "confirmed",
          paymentMethod: "Credit Card",
          createdAt: "2024-01-30T12:00:00Z",
        },
        {
          id: "order_8",
          items: [
            {
              id: "cart_8",
              type: "card",
              itemId: "apple-music-3months",
              companyId: "apple",
              title: {
                ar: "اشتراك أبل ميوزك 3 أشهر",
                en: "Apple Music 3 Months",
              },
              image:
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
              price: 25,
              originalPrice: 45,
              quantity: 1,
              addedAt: "2024-02-01T15:30:00Z",
            },
          ],
          totalAmount: 25,
          status: "completed",
          paymentMethod: "Bank Transfer",
          createdAt: "2024-02-01T15:30:00Z",
          completedAt: "2024-02-01T16:00:00Z",
        },
        {
          id: "order_9",
          items: [
            {
              id: "cart_9",
              type: "booking",
              itemId: "hotel-reservation-5stars",
              companyId: "luxury-hotels",
              title: { ar: "حجز فندق 5 نجوم", en: "5 Star Hotel Reservation" },
              image:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
              price: 800,
              originalPrice: 1200,
              quantity: 1,
              addedAt: "2024-02-03T10:15:00Z",
            },
          ],
          totalAmount: 800,
          status: "pending",
          paymentMethod: "Credit Card",
          createdAt: "2024-02-03T10:15:00Z",
        },
        {
          id: "order_10",
          items: [
            {
              id: "cart_10",
              type: "offer",
              itemId: "mcdonalds-combo-25",
              companyId: "mcdonalds",
              title: {
                ar: "خصم 25% على كومبو ماكدونالدز",
                en: "25% off McDonald's Combo",
              },
              image:
                "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
              price: 30,
              originalPrice: 40,
              quantity: 4,
              addedAt: "2024-02-05T18:45:00Z",
            },
          ],
          totalAmount: 120,
          status: "cancelled",
          paymentMethod: "Cash",
          createdAt: "2024-02-05T18:45:00Z",
        },
      ],

      // إرسال OTP
      sendOtp: async () => {
        set({ loading: true, error: null });
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // محاكاة إرسال OTP ناجح
          set({
            otpSent: true,
            loading: false,
            error: null,
          });

          return {
            status: true,
            msg: "Verification code sent to mobile number",
          };
        } catch (error) {
          const errorMsg = "Error sending verification code";
          set({ error: errorMsg, loading: false });
          return { status: false, msg: errorMsg };
        }
      },

      // التحقق من OTP
      verifyOtp: async (phone: string, otp: string) => {
        set({ loading: true, error: null });
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // محاكاة التحقق من OTP
          if (otp === "1234") {
            // البحث عن مستخدم موجود أو إنشاء مستخدم جديد
            const existingUser = mockUsers.find((u) => u.phone === phone);
            let user: User;

            if (existingUser) {
              user = existingUser;
            } else {
              // إنشاء مستخدم جديد
              user = {
                id: `user_${Date.now()}`,
                email: `${phone}@example.com`,
                name: "New User",
                phone: phone,
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                isVerified: true,
                createdAt: new Date().toISOString(),
                preferences: {
                  language: "ar",
                  notifications: true,
                  emailUpdates: true,
                },
              };
            }

            const token = `token_${user.id}_${Date.now()}`;

            set({
              user,
              token,
              isAuthenticated: true,
              otpSent: false,
              loading: false,
              error: null,
            });

            return {
              status: true,
              msg: "Login successful",
              data: { user, token },
            };
          } else {
            set({ loading: false, error: "Invalid verification code" });
            return { status: false, msg: "Invalid verification code" };
          }
        } catch (error) {
          const errorMsg = "Error verifying code";
          set({ error: errorMsg, loading: false });
          return { status: false, msg: errorMsg };
        }
      },

      // إكمال التسجيل
      completeRegistration: async (userData: Partial<User>) => {
        set({ loading: true, error: null });
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const { user } = get();
          if (user) {
            const updatedUser = { ...user, ...userData };
            set({
              user: updatedUser,
              loading: false,
              error: null,
            });

            return {
              status: true,
              msg: "Data updated successfully",
            };
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          const errorMsg = "Error updating data";
          set({ error: errorMsg, loading: false });
          return { status: false, msg: errorMsg };
        }
      },

      // تسجيل الدخول (الطريقة القديمة - للتوافق)
      login: async (email: string, password: string) => {
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const user = mockUsers.find((u) => u.email === email);
          if (user && password === "password123") {
            const token = `token_${user.id}_${Date.now()}`;
            set({
              user,
              token,
              isAuthenticated: true,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login error:", error);
          return false;
        }
      },

      // التسجيل
      register: async (userData: Partial<User>) => {
        try {
          // محاكاة API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const newUser: User = {
            id: `user_${Date.now()}`,
            email: userData.email || "",
            name: userData.name || "",
            phone: userData.phone,
            avatar: userData.avatar,
            isVerified: false,
            createdAt: new Date().toISOString(),
            preferences: {
              language: "ar",
              notifications: true,
              emailUpdates: true,
            },
          };

          const token = `token_${newUser.id}_${Date.now()}`;
          set({
            user: newUser,
            token,
            isAuthenticated: true,
          });
          return true;
        } catch (error) {
          console.error("Register error:", error);
          return false;
        }
      },

      // تسجيل الخروج
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          cartItems: [],
        });
      },

      // تحديث البروفايل
      updateProfile: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },

      // إضافة للمحفوظات
      addToSaved: (item: Omit<SavedItem, "id" | "savedAt">) => {
        const { savedItems } = get();
        const newItem: SavedItem = {
          ...item,
          id: `saved_${Date.now()}`,
          savedAt: new Date().toISOString(),
        };

        // تجنب التكرار
        const exists = savedItems.some((saved) => saved.itemId === item.itemId);
        if (!exists) {
          set({ savedItems: [...savedItems, newItem] });
        }
      },

      // إزالة من المحفوظات
      removeFromSaved: (itemId: string) => {
        const { savedItems } = get();
        set({
          savedItems: savedItems.filter((item) => item.itemId !== itemId),
        });
      },

      // التحقق من وجود العنصر في المحفوظات
      isItemSaved: (itemId: string) => {
        const { savedItems } = get();
        return savedItems.some((item) => item.itemId === itemId);
      },

      // إضافة للسلة
      addToCart: (item: Omit<CartItem, "id" | "addedAt">) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(
          (cartItem) => cartItem.itemId === item.itemId
        );

        if (existingItem) {
          // زيادة الكمية
          set({
            cartItems: cartItems.map((cartItem) =>
              cartItem.itemId === item.itemId
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
          });
        } else {
          // إضافة عنصر جديد
          const newItem: CartItem = {
            ...item,
            id: `cart_${Date.now()}`,
            addedAt: new Date().toISOString(),
          };
          set({ cartItems: [...cartItems, newItem] });
        }
      },

      // إزالة من السلة
      removeFromCart: (itemId: string) => {
        const { cartItems } = get();
        set({
          cartItems: cartItems.filter((item) => item.itemId !== itemId),
        });
      },

      // تحديث كمية العنصر في السلة
      updateCartQuantity: (itemId: string, quantity: number) => {
        const { cartItems } = get();
        if (quantity <= 0) {
          get().removeFromCart(itemId);
        } else {
          set({
            cartItems: cartItems.map((item) =>
              item.itemId === itemId ? { ...item, quantity } : item
            ),
          });
        }
      },

      // مسح السلة
      clearCart: () => {
        set({ cartItems: [] });
      },

      // حساب إجمالي السلة
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      // إعادة تعيين البيانات
      resetStore: () => {
        // مسح localStorage
        localStorage.removeItem("user-store");
        // إعادة تحميل الصفحة لتطبيق البيانات الجديدة
        window.location.reload();
      },

      // إنشاء طلب جديد
      createOrder: (paymentMethod: string) => {
        const { cartItems } = get();
        const totalAmount = get().getCartTotal();

        const newOrder: Order = {
          id: `order_${Date.now()}`,
          items: [...cartItems],
          totalAmount,
          status: "pending",
          paymentMethod,
          createdAt: new Date().toISOString(),
        };

        set({
          orders: [newOrder, ...get().orders],
          cartItems: [], // مسح السلة بعد إنشاء الطلب
        });

        return newOrder;
      },

      // تحديث حالة الطلب
      updateOrderStatus: (orderId: string, status: Order["status"]) => {
        const { orders } = get();
        set({
          orders: orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  status,
                  completedAt:
                    status === "completed"
                      ? new Date().toISOString()
                      : order.completedAt,
                }
              : order
          ),
        });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        savedItems: state.savedItems,
        cartItems: state.cartItems,
        orders: state.orders,
      }),
    }
  )
);
