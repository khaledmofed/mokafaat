import React, { useState } from "react";
import { useUserStore } from "@stores/userStore";
import { toast } from "react-toastify";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCallOutline,
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCameraOutline,
} from "react-icons/io5";
// import { Layout } from "@components";
const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      const res = await updateProfile(formData);
      if (res.status) {
        setIsEditing(false);
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("حدث خطأ أثناء تحديث البروفايل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setIsEditing(false);
  };

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
                <img
                  src={
                    user.avatar ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  }
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-[#440798] text-white p-2 rounded-full hover:bg-[#440798c9] transition-colors">
                  <IoCameraOutline className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-2">
                  {user.isVerified ? (
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
                معلومات البروفايل
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
                    <p className="text-gray-900">{user.name}</p>
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
                    <p className="text-gray-900">{user.email}</p>
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
                    <p className="text-gray-900">{user.phone || "غير محدد"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <IoCalendarOutline className="inline w-4 h-4 ml-1" />
                    تاريخ الانضمام
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("ar-SA")}
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

          {/* Preferences */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                التفضيلات
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

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                إحصائيات سريعة
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    العناصر المحفوظة
                  </span>
                  <span className="text-lg font-semibold text-[#440798]">
                    12
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    الطلبات المكتملة
                  </span>
                  <span className="text-lg font-semibold text-[#440798]">
                    8
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">إجمالي الإنفاق</span>
                  <span className="text-lg font-semibold text-[#440798]">
                    1,250 ريال
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
