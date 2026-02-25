import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { useProfile, useProfileUpdate, useSubscriptionStatus } from "@hooks/api/useMokafaatQueries";
import { isUserSubscribed } from "@utils/subscription";

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
    const firstName = (userObj.first_name ?? userObj.name) as string | undefined;
    const lastName = userObj.last_name as string | undefined;
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim() || (userObj.name as string) || "";
    const stats = (userObj.stats ?? {}) as Record<string, number | undefined>;
    return {
      name: fullName || (user?.name ?? ""),
      email: (userObj.email ?? user?.email ?? "") as string,
      phone: (userObj.phone ?? userObj.mobile ?? user?.phone ?? "") as string,
      avatar: (userObj.avatar ?? userObj.image ?? user?.avatar) as string | undefined,
      createdAt: (userObj.created_at ?? userObj.createdAt ?? user?.createdAt) as string | undefined,
      isVerified: (userObj.is_profile_completed ?? userObj.is_verified ?? user?.isVerified) as boolean | undefined,
      favoritesCount: stats.favorites_count ?? 0,
      ordersCount: stats.orders_count ?? 0,
      followingCount: stats.following_count ?? 0,
    };
  }, [profileData, user]);

  const userMeta = useMemo(() => {
    const raw = profileData as Record<string, unknown> | undefined;
    const data = raw?.data as Record<string, unknown> | undefined;
    return (raw?.user_meta ?? data?.user_meta) as Record<string, unknown> | undefined;
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
  const profileUserObj = (profileUser?.data as Record<string, unknown> | undefined)?.user as Record<string, unknown> | undefined;
  const hasSubscriptionFromProfile = Boolean(profileUserObj?.has_subscription ?? userMeta?.has_active_subscription);
  const isSubscribed = hasSubscriptionFromProfile || isUserSubscribed(subscriptionData);
  const subRaw = (subscriptionData as Record<string, unknown>)?.data ?? subscriptionData;
  const sub = subRaw as Record<string, unknown> | undefined;
  const planObj = sub?.plan as Record<string, unknown> | undefined;
  const subObj = sub?.subscription as Record<string, unknown> | undefined;
  const profileSubscription = profileUserObj?.subscription as Record<string, unknown> | null | undefined;
  const planFromSub = profileSubscription?.plan as Record<string, unknown> | undefined;
  const planName = (profileSubscription?.plan_name ?? planFromSub?.name ?? sub?.plan_name ?? planObj?.name ?? subObj?.plan_name) as string | undefined;
  const expiresAt = (profileSubscription?.expires_at ?? sub?.expires_at ?? subObj?.expires_at ?? sub?.end_date) as string | undefined;
  const walletBalance = Number(profileUserObj?.wallet_balance ?? userMeta?.wallet_balance ?? 0) || 0;

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
        toast.success((payload?.msg ?? payload?.message ?? "تم تحديث البروفايل") as string);
        await refetchProfile();
      } else {
        toast.error((payload?.msg ?? payload?.message ?? "فشل تحديث البروفايل") as string);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errResponse = (error as { response?: { data?: { message?: string; msg?: string } } })?.response?.data;
      const msg = errResponse?.message ?? (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
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
        toast.error((payload?.msg ?? payload?.message ?? "فشل تحديث الصورة") as string);
        setAvatarPreview(null);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      const errResponse = (error as { response?: { data?: { message?: string; msg?: string } } })?.response?.data;
      const msg = errResponse?.message ?? (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg;
      toast.error(msg ?? "حدث خطأ أثناء تحديث الصورة");
      setAvatarPreview(null);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const avatarSrc = avatarPreview ?? displayUser.avatar;

  if (!user) {
    return (
      //   <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            غير مسجل دخول
          </h2>
          <p className="text-gray-600">يجب تسجيل الدخول لعرض البروفايل</p>
        </div>
      </div>
      //   </Layout>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 py-8"
      style={{ marginTop: "77px", height: "calc(-76px + 70vh)" }}
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
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
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-0 right-0 bg-[#440798] text-white p-2 rounded-full hover:bg-[#440798c9] transition-colors disabled:opacity-70"
                  title="تغيير الصورة"
                >
                  {isUploadingAvatar ? (
                    <span className="w-4 h-4 block border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <IoCameraOutline className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {displayUser.name}
                </h1>
                <p className="text-gray-600">{displayUser.email}</p>
                <div className="flex items-center mt-2">
                  {displayUser.isVerified ? (
                    <span className="flex items-center text-green-600 text-sm">
                      <IoCheckmarkCircleOutline className="w-4 h-4 ml-1" />
                      حساب موثق
                    </span>
                  ) : (
                    <span className="text-yellow-600 text-sm">
                      حساب غير موثق
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#440798] text-white px-4 py-2 rounded-md hover:bg-[#440798c9] transition-colors"
            >
              {isEditing ? "إلغاء" : "تعديل البروفايل"}
            </button>
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
                    <p className="text-gray-900">{displayUser.phone || "غير محدد"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoCalendarOutline className="inline w-4 h-4 ml-1" />
                    تاريخ الانضمام
                  </label>
                  <p className="text-gray-900">
                    {displayUser.createdAt
                      ? new Date(displayUser.createdAt).toLocaleDateString("ar-SA")
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
                    isSubscribed ? "bg-emerald-500 text-white" : "bg-amber-400 text-white"
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
                      onClick={() => navigate("/subscription/plans")}
                      className="mt-3 text-sm font-medium bg-[#440798] text-white px-4 py-2 rounded-lg hover:bg-[#440798c9] transition-colors"
                    >
                      {t("profile.subscribe_now")}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("profile.preferences")}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">الإشعارات</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.preferences.notifications}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#440798] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#440798]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    تحديثات البريد الإلكتروني
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.preferences.emailUpdates}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#440798] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#440798]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Stats - من بيانات API البروفايل */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {t("profile.quick_stats")}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    العناصر المحفوظة
                  </span>
                  <span className="text-lg font-semibold text-[#440798]">
                    {(displayUser as { favoritesCount?: number }).favoritesCount ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    الطلبات المكتملة
                  </span>
                  <span className="text-lg font-semibold text-[#440798]">
                    {(displayUser as { ordersCount?: number }).ordersCount ?? 0}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">رصيد المحفظة</span>
                  <span className="text-lg font-semibold text-[#440798]">
                    {walletBalance} ريال
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
