import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@stores/userStore";
import { toast } from "react-toastify";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCameraOutline,
  IoSparklesOutline,
} from "react-icons/io5";
import {
  useProfile,
  useProfileUpdate,
  useSubscriptionStatus,
} from "@hooks/api/useMokafaatQueries";
import { isUserSubscribed } from "@utils/subscription";

/** تجميع الأرقام بمسافات (مثل 242 325 678 122) */
function formatDigitsSpaced(raw: string) {
  const d = String(raw).replace(/\D/g, "");
  if (!d) return raw;
  const parts: string[] = [];
  let i = d.length;
  while (i > 0) {
    parts.unshift(d.slice(Math.max(0, i - 3), i));
    i -= 3;
  }
  return parts.join(" ");
}

/** بطاقة تعريفية — مطابقة التصميم المرجعي (فعالة أخضر / منتهية رمادي) */
function ProfileMembershipCard({
  fullName,
  membershipNumber,
  idNumber,
  isActive = true,
}: {
  fullName: string;
  membershipNumber: string;
  /** يظهر في سطر «رقم إثبات»؛ إن لم يُمرَّر يُستخدم رقم العضوية */
  idNumber?: string;
  /** إن false تُعرض «الحالة منتهية» بتصميم رمادي */
  isActive?: boolean;
}) {
  const proofLine = String(idNumber || membershipNumber || "").trim();
  const qrValue = useMemo(
    () =>
      JSON.stringify({
        type: "mokafaat_member",
        membership_number: membershipNumber,
      }),
    [membershipNumber],
  );
  const qrSrc = useMemo(() => {
    const enc = encodeURIComponent(qrValue);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data=${enc}`;
  }, [qrValue]);
  const displayBig = formatDigitsSpaced(membershipNumber);
  /** تدرج خلفية: فوق #6A0DAD → تحت #4B0082 */
  const cardGradient = "linear-gradient(180deg, #6A0DAD 0%, #4B0082 100%)";
  const purpleDeep = "#4B0082";

  return (
    <div
      className="mb-6 rounded-2xl px-3 py-4 shadow-xl sm:px-4 sm:py-5"
      style={{
        backgroundImage: cardGradient,
        backgroundAttachment: "fixed",
      }}
      dir="rtl"
    >
      <div
        className="px-4 py-3.5 text-center text-white sm:py-4"
        style={{
          backgroundImage: cardGradient,
          backgroundAttachment: "fixed",
        }}
      >
        <h3 className="text-base font-bold tracking-wide sm:text-lg">
          البطاقة التعريفية
        </h3>
      </div>
      <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.18)] sm:rounded-3xl">
        {/* شريط العنوان — نفس تدرج الخلفية */}

        {/* قصّ تذكرة — يكمل التدرج مع بقية الصفحة */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 z-10 h-9 w-4 -translate-y-1/2 rounded-r-full sm:h-10 sm:w-5"
          style={{
            marginLeft: "-2px",
            backgroundImage: cardGradient,
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-1/2 z-10 h-9 w-4 -translate-y-1/2 rounded-l-full sm:h-10 sm:w-5"
          style={{
            marginRight: "-2px",
            backgroundImage: cardGradient,
            backgroundAttachment: "fixed",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          aria-hidden
        />

        <div className="px-5 pb-8 pt-5 text-center sm:px-6 sm:pb-10 sm:pt-6">
          <p className="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
            تستخدم هذه البطاقة في الدفع للمتاجر
          </p>

          <div className="mb-5 flex justify-center sm:mb-6">
            <img
              src={qrSrc}
              alt=""
              width={200}
              height={200}
              className="block h-[180px] w-[180px] sm:h-[200px] sm:w-[200px]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 sm:my-5" />

          <p className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
            {fullName}
          </p>
          <p className="mb-4 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            رقم إثبات /{" "}
            <span className="font-mono font-semibold text-gray-800">
              {proofLine}
            </span>
          </p>

          <p
            className="mb-5 font-mono text-2xl font-bold leading-snug sm:mb-5 sm:text-2xl "
            style={{
              wordBreak: "break-word",
              color: purpleDeep,
            }}
          >
            {displayBig}
          </p>

          {/* حالة البطاقة — فعالة (أخضر) أو منتهية (رمادي) */}
          <div
            className={`mx-auto flex max-w-[150px] flex-col items-center gap-1 rounded-2xl px-5 py-4 ${
              isActive ? "" : "bg-gray-100"
            }`}
            style={isActive ? { backgroundColor: "#EAF8EE" } : undefined}
          >
            <div
              className={`flex items-center justify-center rounded-xl p-2 sm:p-2 ${
                isActive ? "" : "bg-gray-200"
              }`}
              style={
                isActive
                  ? { backgroundColor: "rgb(4 120 87 / 15%)" }
                  : undefined
              }
            >
              {isActive ? (
                <svg
                  className="h-8 w-8 sm:h-8 sm:w-8"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M16 2.5L5.5 6.2v7.8c0 6.2 4.3 12 10.5 13.5 6.2-1.5 10.5-7.3 10.5-13.5V6.2L16 2.5z"
                    fill="#047857"
                  />
                  <path
                    d="M14 16.2l2.2 2.2 4.8-4.8"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8 sm:h-8 sm:w-8 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              )}
            </div>
            <span className="text-[11px] text-gray-500 sm:text-xs">
              حالة البطاقة
            </span>
            <span
              className={`text-base font-bold sm:text-lg ${
                isActive ? "text-gray-900" : "text-gray-600"
              }`}
            >
              {isActive ? "فعالة" : "الحالة منتهية"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { data: profileData, refetch: refetchProfile } = useProfile();
  const { data: subscriptionData } = useSubscriptionStatus(!!user);
  const profileUpdateMutation = useProfileUpdate();

  // استخراج بيانات البروفايل من استجابة API: { data: { user: { first_name, last_name, email, phone, ... } }, user_meta }
  const profile = useMemo(() => {
    const raw = profileData as Record<string, unknown> | undefined;
    if (!raw) return null;
    const data = raw.data as Record<string, unknown> | undefined;
    const userObj = (data?.user ?? data) as Record<string, unknown> | undefined;
    if (!userObj) return null;
    const firstName = (userObj.first_name ?? userObj.name) as
      | string
      | undefined;
    const lastName = userObj.last_name as string | undefined;
    const fullName =
      [firstName, lastName].filter(Boolean).join(" ").trim() ||
      (userObj.name as string) ||
      "";
    const stats = (userObj.stats ?? {}) as Record<string, number | undefined>;
    return {
      name: fullName || (user?.name ?? ""),
      email: (userObj.email ?? user?.email ?? "") as string,
      phone: (userObj.phone ?? userObj.mobile ?? user?.phone ?? "") as string,
      avatar: (userObj.avatar ?? userObj.image ?? user?.avatar) as
        | string
        | undefined,
      createdAt: (userObj.created_at ??
        userObj.createdAt ??
        user?.createdAt) as string | undefined,
      isVerified: (userObj.is_profile_completed ??
        userObj.is_verified ??
        user?.isVerified) as boolean | undefined,
      favoritesCount: stats.favorites_count ?? 0,
      ordersCount: stats.orders_count ?? 0,
      followingCount: stats.following_count ?? 0,
    };
  }, [profileData, user]);

  const userMeta = useMemo(() => {
    const raw = profileData as Record<string, unknown> | undefined;
    const data = raw?.data as Record<string, unknown> | undefined;
    return (raw?.user_meta ?? data?.user_meta) as
      | Record<string, unknown>
      | undefined;
  }, [profileData]);

  const displayUser = profile ?? {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    avatar: user?.avatar,
    createdAt: user?.createdAt,
    isVerified: user?.isVerified,
    favoritesCount: 0,
    ordersCount: 0,
    followingCount: 0,
  };

  const profileUser = profileData as Record<string, unknown> | undefined;
  const profileUserObj = (
    profileUser?.data as Record<string, unknown> | undefined
  )?.user as Record<string, unknown> | undefined;
  const hasSubscriptionFromProfile = Boolean(
    profileUserObj?.has_subscription ?? userMeta?.has_active_subscription,
  );
  const isSubscribed =
    hasSubscriptionFromProfile || isUserSubscribed(subscriptionData);
  const subRaw =
    (subscriptionData as Record<string, unknown>)?.data ?? subscriptionData;
  const sub = subRaw as Record<string, unknown> | undefined;
  const planObj = sub?.plan as Record<string, unknown> | undefined;
  const subObj = sub?.subscription as Record<string, unknown> | undefined;
  const profileSubscription = profileUserObj?.subscription as
    | Record<string, unknown>
    | null
    | undefined;
  const planFromSub = profileSubscription?.plan as
    | Record<string, unknown>
    | undefined;
  const planName = (profileSubscription?.plan_name ??
    planFromSub?.name ??
    sub?.plan_name ??
    planObj?.name ??
    subObj?.plan_name) as string | undefined;
  const expiresAt = (profileSubscription?.end_date ??
    profileSubscription?.expires_at ??
    sub?.expires_at ??
    subObj?.expires_at ??
    sub?.end_date) as string | undefined;
  const walletBalance =
    Number(profileUserObj?.wallet_balance ?? userMeta?.wallet_balance ?? 0) ||
    0;

  const subscriptionStatusActive =
    String(profileSubscription?.status ?? "").toLowerCase() === "active";
  const showMembershipCard =
    Boolean(
      profileUserObj?.has_subscription ?? userMeta?.has_active_subscription,
    ) && subscriptionStatusActive;
  const membershipNumber = String(
    profileUserObj?.membership_number ?? "",
  ).trim();
  const cardFullName =
    [profileUserObj?.first_name, profileUserObj?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim() || displayUser.name;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: displayUser.name || "",
    email: displayUser.email || "",
    phone: displayUser.phone || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setFormData({
        name: displayUser.name || "",
        email: displayUser.email || "",
        phone: displayUser.phone || "",
      });
    }
  }, [displayUser.name, displayUser.email, displayUser.phone, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const [first, ...rest] = (formData.name || "").trim().split(/\s+/);
      const last = rest.join(" ") || "";
      const res = await profileUpdateMutation.mutateAsync({
        name: formData.name?.trim() || undefined,
        first_name: first || formData.name || undefined,
        last_name: last || undefined,
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
      });
      const payload = (res?.data ?? res) as Record<string, unknown>;
      const ok = payload?.status !== false && payload?.status !== "error";
      if (ok) {
        setIsEditing(false);
        toast.success(
          (payload?.msg ?? payload?.message ?? "تم تحديث البروفايل") as string,
        );
        await refetchProfile();
      } else {
        toast.error(
          (payload?.msg ?? payload?.message ?? "فشل تحديث البروفايل") as string,
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errResponse = (
        error as { response?: { data?: { message?: string; msg?: string } } }
      )?.response?.data;
      const msg =
        errResponse?.message ??
        (error as { response?: { data?: { msg?: string } } })?.response?.data
          ?.msg;
      toast.error(msg ?? "حدث خطأ أثناء تحديث البروفايل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: displayUser.name || "",
      email: displayUser.email || "",
      phone: displayUser.phone || "",
    });
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("يرجى اختيار صورة صالحة");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم الصورة يجب أن يكون أقل من 5 ميجابايت");
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
    setIsUploadingAvatar(true);
    e.target.value = "";
    try {
      const res = await profileUpdateMutation.mutateAsync({ avatar: file });
      const payload = (res?.data ?? res) as Record<string, unknown>;
      const ok = payload?.status !== false && payload?.status !== "error";
      if (ok) {
        toast.success("تم تحديث الصورة بنجاح");
        setAvatarPreview(null);
        await refetchProfile();
      } else {
        toast.error(
          (payload?.msg ?? payload?.message ?? "فشل تحديث الصورة") as string,
        );
        setAvatarPreview(null);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      const errResponse = (
        error as { response?: { data?: { message?: string; msg?: string } } }
      )?.response?.data;
      const msg =
        errResponse?.message ??
        (error as { response?: { data?: { msg?: string } } })?.response?.data
          ?.msg;
      toast.error(msg ?? "حدث خطأ أثناء تحديث الصورة");
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const avatarSrc = avatarPreview ?? displayUser.avatar;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            غير مسجل دخول
          </h2>
          <p className="text-gray-600">يجب تسجيل الدخول لعرض البروفايل</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-8"
      style={{ marginTop: "77px", minHeight: "calc(-76px + 70vh)" }}
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        {/* هيدر: يمين = المستخدم | يسار = إحصائيات (بدون عنوان) + تعديل */}
        <div
          className="mb-6 rounded-2xl border border-gray-200/80 bg-white shadow-md overflow-hidden"
          dir="rtl"
        >
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              {/* يمين الشاشة: صورة + اسم + بريد + موثق */}
              <div className="flex items-center gap-4 sm:gap-5 min-w-0 shrink-0">
                <div className="relative shrink-0">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                  <img
                    src={
                      avatarSrc ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    }
                    alt={displayUser.name}
                    className="w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#440798]/10 shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    disabled={isUploadingAvatar}
                    className="absolute -bottom-1 -left-1 bg-[#440798] text-white p-2 rounded-xl shadow-lg hover:bg-[#350775] transition-colors disabled:opacity-70"
                    title="تغيير الصورة"
                  >
                    {isUploadingAvatar ? (
                      <span className="w-4 h-4 block border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <IoCameraOutline className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="min-w-0 text-right">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {displayUser.name}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-500 truncate mt-0.5">
                    {displayUser.email}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs sm:text-sm font-medium border border-emerald-100">
                    {displayUser.isVerified ? (
                      <>
                        <IoCheckmarkCircleOutline className="w-4 h-4 shrink-0" />
                        حساب موثق
                      </>
                    ) : (
                      <span className="text-amber-700">حساب غير موثق</span>
                    )}
                  </div>
                </div>
              </div>

              {/* يسار الشاشة: إحصائيات (بدون عنوان) ثم زر التعديل — بترتيب DOM مع RTL يصير تعديل أقصى اليسار */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 lg:flex-1 lg:justify-end lg:min-w-0">
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 flex-1 sm:max-w-[340px] lg:max-w-[380px] order-2 sm:order-1">
                  {(
                    [
                      {
                        label: "المفضلة",
                        to: "/saved",
                        value:
                          (displayUser as { favoritesCount?: number })
                            .favoritesCount ?? 0,
                      },
                      {
                        label: "الطلبات",
                        to: "/orders",
                        value:
                          (displayUser as { ordersCount?: number })
                            .ordersCount ?? 0,
                      },
                      {
                        label: "المحفظة",
                        to: "/wallet",
                        value: `${walletBalance}`,
                        suffix: " ريال",
                      },
                    ] as const
                  ).map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className="rounded-xl bg-white border border-gray-100 px-2 py-2 sm:py-2.5 text-center sm:text-right hover:border-[#440798]/40 hover:shadow-md hover:bg-[#440798]/[0.03] transition-all cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#440798]/50"
                    >
                      <p className="text-[10px] sm:text-[11px] text-gray-500 mb-0.5 truncate">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base font-bold text-[#440798] tabular-nums leading-tight">
                        {item.value}
                        {"suffix" in item ? item.suffix : ""}
                      </p>
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="shrink-0 rounded-xl bg-[#440798] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#350775] transition-colors w-full sm:w-auto order-1 sm:order-2"
                >
                  {isEditing ? "إلغاء التعديل" : "تعديل البروفايل"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("profile.profile_info")}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoPersonOutline className="inline w-4 h-4 ml-1" />
                    الاسم الكامل
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#440798] focus:border-[#440798]"
                    />
                  ) : (
                    <p className="text-gray-900">{displayUser.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoMailOutline className="inline w-4 h-4 ml-1" />
                    البريد الإلكتروني
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#440798] focus:border-[#440798]"
                    />
                  ) : (
                    <p className="text-gray-900">{displayUser.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoCallOutline className="inline w-4 h-4 ml-1" />
                    رقم الهاتف
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#440798] focus:border-[#440798]"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {displayUser.phone || "غير محدد"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoCalendarOutline className="inline w-4 h-4 ml-1" />
                    تاريخ الانضمام
                  </label>
                  <p className="text-gray-900">
                    {displayUser.createdAt
                      ? new Date(displayUser.createdAt).toLocaleDateString(
                          "ar-SA",
                        )
                      : "—"}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4 space-x-reverse mt-6">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-[#440798] text-white px-6 py-2 rounded-md hover:bg-[#440798c9] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Subscription & Preferences */}
          <div className="lg:col-span-1">
            {/* Subscription status card */}
            <div
              className={`rounded-xl shadow-sm p-5 mb-6 border-2 ${
                isSubscribed
                  ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSubscribed
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-400 text-white"
                  }`}
                >
                  <IoSparklesOutline className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bold text-lg ${
                      isSubscribed ? "text-emerald-800" : "text-amber-800"
                    }`}
                  >
                    {isSubscribed
                      ? t("profile.subscription_active")
                      : t("profile.subscription_inactive")}
                  </p>
                  {isSubscribed && planName && (
                    <p className="text-sm text-emerald-700 mt-0.5">
                      {t("profile.subscription_plan")}: {planName}
                    </p>
                  )}
                  {isSubscribed && expiresAt && (
                    <p className="text-sm text-emerald-600 mt-0.5">
                      {t("profile.subscription_expires")}:{" "}
                      {new Date(expiresAt).toLocaleDateString("ar-SA")}
                    </p>
                  )}
                  {!isSubscribed && (
                    <button
                      onClick={() =>
                        navigate("/subscription/plans", {
                          state: { from: "/profile" },
                        })
                      }
                      className="mt-3 text-sm font-medium bg-[#440798] text-white px-4 py-2 rounded-lg hover:bg-[#440798c9] transition-colors"
                    >
                      {t("profile.subscribe_now")}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {showMembershipCard && membershipNumber && (
              <ProfileMembershipCard
                fullName={cardFullName}
                membershipNumber={membershipNumber}
                idNumber={String(profileUserObj?.id_number ?? "").trim()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
