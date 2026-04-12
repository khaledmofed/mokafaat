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
  IoTrashOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useCancelOrder, useOrders } from "@hooks/api/useMokafaatQueries";
import { normalizeOrdersList } from "@utils/orders";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { downloadVoucher } from "@utils/voucherDownload";
import { toast } from "react-toastify";
import { pickLocalized } from "@utils/pickLocalized";

const OrdersPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const langBase = i18n.language?.split("-")[0] || "en";
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const getToken = useUserStore.getState;
  const { data: ordersData, isLoading, isError, error } = useOrders(undefined, { enabled: !!token });
  const orders = useMemo(() => normalizeOrdersList(ordersData ?? null), [ordersData]);
  const cancelOrderMutation = useCancelOrder();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);

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

  const dateLocale =
    langBase === "ar"
      ? "ar-SA"
      : langBase === "ur"
        ? "ur-PK"
        : langBase === "hi"
          ? "hi-IN"
          : "en-US";

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t("orders.status_labels.pending");
      case "confirmed":
        return t("orders.status_labels.confirmed");
      case "completed":
        return t("orders.status_labels.completed");
      case "cancelled":
        return t("orders.status_labels.cancelled");
      default:
        return t("orders.status_labels.unknown");
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

  const canCancelOrder = (order: (typeof orders)[number]) => {
    // Only offer orders can be cancelled.
    const isOffer = order.orderType === "offer" || order.items?.[0]?.type === "offer";
    if (!isOffer) return false;

    // Not used
    const rawStatus = String(order.rawStatus ?? "").toLowerCase();
    const isUsed = rawStatus === "used" || rawStatus === "redeemed" || Boolean(order.usedAt);
    if (isUsed) return false;

    // Not cancelled
    if (order.status === "cancelled") return false;

    // Not expired (if expiresAt exists and is in the past)
    if (order.expiresAt) {
      const exp = new Date(order.expiresAt).getTime();
      if (!Number.isNaN(exp) && exp < Date.now()) return false;
    }

    return true;
  };

  const openCancelModal = (orderId: string) => {
    setCancelTargetId(orderId);
    setCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    if (cancelOrderMutation.isPending) return;
    setCancelModalOpen(false);
    setCancelTargetId(null);
  };

  const confirmCancelOrder = () => {
    if (!cancelTargetId || cancelOrderMutation.isPending) return;
    cancelOrderMutation.mutate(cancelTargetId, {
      onSuccess: (res) => {
        const payload = (res as { data?: unknown })?.data ?? res;
        const p = payload as Record<string, unknown>;
        const nestedMessage =
          (
            (p?.data as Record<string, unknown> | undefined)?.order as
              | Record<string, unknown>
              | undefined
          )?.message ?? p?.message;
        const msg =
          (nestedMessage as string | undefined) ||
          (p?.msg as string | undefined) ||
          t("orders.toast_cancel_ok");
        toast.success(msg);
        closeCancelModal();
      },
      onError: (err) => {
        const msg =
          (err as { response?: { data?: { msg?: string; message?: string } } })
            ?.response?.data?.msg ||
          (err as { response?: { data?: { msg?: string; message?: string } } })
            ?.response?.data?.message ||
          t("orders.toast_cancel_fail");
        toast.error(String(msg));
      },
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoReceiptOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("orders.login_required")}
          </h2>
          <p className="text-gray-600 mb-6">{t("orders.sign_in_to_view")}</p>
          <Link to="/login?returnUrl=/orders" className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors inline-block">
            {t("orders.login_cta")}
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t("orders.error_title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {String(error?.message || t("orders.load_failed"))}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors"
          >
            {t("orders.retry")}
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
        {cancelModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
            onClick={closeCancelModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
          >
            <div
              className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <button
                type="button"
                onClick={closeCancelModal}
                className="absolute top-4 end-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
                aria-label={t("orders.close")}
                disabled={cancelOrderMutation.isPending}
              >
                <IoCloseCircleOutline className="text-2xl" />
              </button>

              <div className="p-6 text-center">
                <div className="mx-auto w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-4">
                  <IoTrashOutline className="w-7 h-7" />
                </div>
                <h2
                  id="cancel-order-title"
                  className="text-xl font-bold text-gray-900 mb-2"
                >
                  {t("orders.cancel_modal_title")}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t("orders.cancel_modal_body")}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={closeCancelModal}
                    disabled={cancelOrderMutation.isPending}
                    className="order-2 sm:order-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors disabled:opacity-60"
                  >
                    {t("orders.back")}
                  </button>
                  <button
                    type="button"
                    onClick={confirmCancelOrder}
                    disabled={cancelOrderMutation.isPending}
                    className="order-1 sm:order-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors disabled:opacity-60"
                  >
                    {cancelOrderMutation.isPending
                      ? "..."
                      : t("orders.confirm_cancel_order")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
                        {t("orders.table.order_number")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.date")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.offer")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.status")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.total")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.payment_method")}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t("orders.table.actions")}
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
                              dateLocale,
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString(
                              dateLocale,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {(order.items[0]?.image) ? (
                              <img
                                src={order.items[0].image}
                                alt={
                                  order.items[0]?.title
                                    ? pickLocalized(
                                        order.items[0].title,
                                        langBase,
                                      )
                                    : ""
                                }
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                                #
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {order.items[0]?.title
                                  ? pickLocalized(
                                      order.items[0].title,
                                      langBase,
                                    )
                                  : "—"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.items.length > 1 &&
                                  t("orders.more_offers", {
                                    count: order.items.length - 1,
                                  })}
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
                              {t("orders.view")}
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
                                {t("orders.download")}
                              </button>
                            )}
                            {canCancelOrder(order) && (
                              <button
                                type="button"
                                onClick={() => openCancelModal(order.id)}
                                disabled={cancelOrderMutation.isPending}
                                className="text-red-600 hover:text-red-700 transition-colors inline-flex items-center gap-1 disabled:opacity-60"
                              >
                                <IoTrashOutline className="w-4 h-4" />
                                {t("orders.cancel_action")}
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
                  {t("pagination.previous")}
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
                  {t("pagination.next")}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <IoReceiptOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all"
                ? t("orders.empty.title")
                : t("orders.empty.title_filtered", {
                    status: getStatusLabel(filter),
                  })}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("orders.empty.description")}
            </p>
            <Link
              to="/offers"
              className="bg-[#440798] text-white px-6 py-2 rounded-md hover:bg-[#440798c9] transition-colors inline-block"
            >
              {t("orders.empty.browse_offers")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
