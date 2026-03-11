import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import {
  IoReceiptOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoDownloadOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useOrders } from "@hooks/api/useMokafaatQueries";
import { normalizeOrdersList } from "@utils/orders";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { downloadVoucher } from "@utils/voucherDownload";

const OrdersPage: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const getToken = useUserStore.getState;
  const { data: ordersData, isLoading, isError, error } = useOrders(undefined, { enabled: !!token });
  const orders = useMemo(() => normalizeOrdersList(ordersData ?? null), [ordersData]);

  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "completed" | "cancelled"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "confirmed":
        return "مؤكد";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغي";
      default:
        return "غير محدد";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <IoTimeOutline className="w-4 h-4" />;
      case "confirmed":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "completed":
        return <IoCheckmarkCircleOutline className="w-4 h-4" />;
      case "cancelled":
        return <IoCloseCircleOutline className="w-4 h-4" />;
      default:
        return <IoReceiptOutline className="w-4 h-4" />;
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoReceiptOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{isRTL ? "تسجيل الدخول مطلوب" : "Login required"}</h2>
          <p className="text-gray-600 mb-6">{isRTL ? "سجّل دخولك لعرض طلباتك" : "Sign in to view your orders"}</p>
          <Link to="/login?returnUrl=/orders" className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors inline-block">
            {isRTL ? "تسجيل الدخول" : "Login"}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-28 flex justify-center items-center" style={{ marginTop: "77px" }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoCloseCircleOutline className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{isRTL ? "حدث خطأ" : "Something went wrong"}</h2>
          <p className="text-gray-600 mb-6">{String(error?.message || (isRTL ? "تعذر تحميل الطلبات" : "Failed to load orders"))}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors"
          >
            {isRTL ? "إعادة المحاولة" : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 pt-8 pb-28"
      style={{ marginTop: "77px" }}
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("orders.title")}
              </h1>
              <p className="text-gray-600 mt-1">
                {t("orders.subtitle", { count: orders.length })}
              </p>
            </div>
            {/* <div className="flex items-center space-x-2 space-x-reverse">
              <IoReceiptOutline className="w-8 h-8 text-[#440798]" />
              <button
                onClick={resetStore}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                title="إعادة تعيين البيانات لعرض الطلبات الجديدة"
              >
                إعادة تعيين
              </button>
            </div> */}
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-start mb-8 gap-3 relative z-10 w-1/2">
          {[
            {
              key: "all",
              label: t("orders.filters.all"),
              count: orders.length,
            },
            {
              key: "pending",
              label: t("orders.filters.pending"),
              count: orders.filter((order) => order.status === "pending")
                .length,
            },
            {
              key: "confirmed",
              label: t("orders.filters.confirmed"),
              count: orders.filter((order) => order.status === "confirmed")
                .length,
            },
            {
              key: "completed",
              label: t("orders.filters.completed"),
              count: orders.filter((order) => order.status === "completed")
                .length,
            },
            {
              key: "cancelled",
              label: t("orders.filters.cancelled"),
              count: orders.filter((order) => order.status === "cancelled")
                .length,
            },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() =>
                setFilter(
                  filterOption.key as
                    | "all"
                    | "pending"
                    | "confirmed"
                    | "completed"
                    | "cancelled"
                )
              }
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                filter === filterOption.key
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {currentOrders.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الطلب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {isRTL ? "اسم العرض" : "Offer"}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المبلغ الإجمالي
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        طريقة الدفع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            #{String(order.id).slice(-8)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString(
                              "ar-SA"
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString(
                              "ar-SA",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {(order.items[0]?.image) ? (
                              <img
                                src={order.items[0].image}
                                alt={order.items[0]?.title?.[isRTL ? "ar" : "en"] ?? ""}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                #
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.items[0]?.title?.[isRTL ? "ar" : "en"] ?? "—"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.items.length > 1 &&
                                  (isRTL ? `+${order.items.length - 1} عروض أخرى` : `+${order.items.length - 1} more offers`)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            {getStatusIcon(order.status)}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#440798] flex items-center gap-1">
                            {order.totalAmount}
                            <CurrencyIcon
                              size={14}
                              className="text-[#440798]"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {order.paymentMethod}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2 space-x-reverse">
                            <Link
                              to={`/orders/${order.id}`}
                              className="text-[#440798] hover:text-[#440798c9] transition-colors inline-flex items-center gap-1"
                            >
                              <IoEyeOutline className="w-4 h-4" />
                              {isRTL ? "عرض" : "View"}
                            </Link>
                            {order.status === "completed" && order.voucherUrl && (
                              <button
                                type="button"
                                onClick={() =>
                                  downloadVoucher(order.voucherUrl!, () => getToken().token)
                                    .catch(() => {})
                                }
                                className="text-green-600 hover:text-green-700 transition-colors inline-flex items-center gap-1"
                              >
                                <IoDownloadOutline className="w-4 h-4" />
                                {isRTL ? "تنزيل" : "Download"}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 space-x-reverse mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  السابق
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === page
                          ? "bg-[#400198] text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  التالي
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <IoReceiptOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all"
                ? "لا توجد طلبات"
                : `لا توجد طلبات ${getStatusLabel(filter)}`}
            </h3>
            <p className="text-gray-600 mb-6">
              ابدأ بإضافة العروض والبطاقات إلى سلة التسوق
            </p>
            <a
              href="/offers"
              className="bg-[#440798] text-white px-6 py-2 rounded-md hover:bg-[#440798c9] transition-colors inline-block"
            >
              تصفح العروض
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
