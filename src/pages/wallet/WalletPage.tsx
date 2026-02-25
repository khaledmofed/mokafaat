import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoWalletOutline, IoGiftOutline } from "react-icons/io5";
import { TbArrowsExchange2 } from "react-icons/tb";
import CurrencyIcon from "@components/CurrencyIcon";
import {
  usePointsBalance,
  usePointsHistory,
  useWallet,
  usePointsRedeem,
} from "@hooks/api/useMokafaatQueries";
import { toast } from "react-toastify";

// Normalize API response shapes
function getPointsBalance(data: unknown): { points: number; value?: number } {
  const d = (data as Record<string, unknown>)?.data ?? data;
  const obj = d as Record<string, unknown>;
  const points = Number(obj?.points ?? obj?.balance ?? 0) || 0;
  const value = typeof obj?.value === "number" ? obj.value : typeof obj?.points_value === "number" ? obj.points_value : undefined;
  return { points, value };
}

function getWalletBalance(data: unknown): number {
  const d = (data as Record<string, unknown>)?.data ?? data;
  const obj = d as Record<string, unknown>;
  return Number(obj?.balance ?? obj?.amount ?? 0) || 0;
}

function getHistoryList(data: unknown): Array<Record<string, unknown>> {
  const d = (data as Record<string, unknown>)?.data ?? data;
  if (Array.isArray(d)) return d;
  const obj = d as Record<string, unknown>;
  const list = (obj?.history ?? obj?.transactions ?? obj?.list) as unknown;
  return Array.isArray(list) ? list : [];
}

const WalletPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"points" | "transactions">("transactions");

  const { data: pointsData, isLoading: pointsLoading, isError: pointsError } = usePointsBalance();
  const { data: pointsHistoryData, isLoading: pointsHistoryLoading } = usePointsHistory();
  const { data: walletData, isLoading: walletLoading, isError: walletError } = useWallet();
  const redeemMutation = usePointsRedeem();

  const { points, value: pointsValue } = getPointsBalance(pointsData);
  const walletBalance = getWalletBalance(walletData);
  const pointsList = getHistoryList(pointsHistoryData);
  const walletList = getHistoryList(walletData);

  const onRedeem = () => {
    redeemMutation.mutate(undefined, {
      onSuccess: (res) => {
        const payload = res?.data ?? res;
        const ok = (payload as Record<string, unknown>)?.status ?? (payload as Record<string, unknown>)?.success;
        if (ok !== false) {
          toast.success(t("wallet.redeem_success"));
          return;
        }
        toast.error((payload as Record<string, unknown>)?.msg ?? (payload as Record<string, unknown>)?.message ?? t("wallet.redeem_error"));
      },
      onError: () => toast.error(t("wallet.redeem_error")),
    });
  };

  const isLoading = pointsLoading || walletLoading;
  const showPointsError = pointsError && !pointsData;
  const showWalletError = walletError && !walletData;

  return (
    <div
      className="min-h-screen bg-gray-50 pt-8 pb-28"
      style={{ marginTop: "77px" }}
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{t("wallet.title")}</h1>
            <IoWalletOutline className="w-8 h-8 text-[#440798]" />
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8 text-gray-500">{t("wallet.loading")}</div>
        )}

        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <IoGiftOutline className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{points}</div>
                <div className="text-sm opacity-90">{t("wallet.points_balance")}</div>
                {pointsValue != null && (
                  <div className="text-sm opacity-90 mt-1">
                    {t("wallet.points_value")}: {pointsValue} <CurrencyIcon size={14} className="inline text-white" />
                  </div>
                )}
                <button
                  onClick={onRedeem}
                  disabled={redeemMutation.isPending || points < 1}
                  className="mt-3 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 disabled:opacity-50"
                >
                  {redeemMutation.isPending ? "..." : t("wallet.redeem_to_wallet")}
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <IoWalletOutline className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2 flex items-center gap-2">
                  {walletBalance}
                  <CurrencyIcon size={24} className="text-white" />
                </div>
                <div className="text-sm opacity-90">{t("wallet.account_balance")}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={() => setActiveTab("points")}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeTab === "points"
                      ? "bg-[#400198] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("wallet.points_log")}
                </button>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeTab === "transactions"
                      ? "bg-[#400198] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("wallet.financial_transactions")}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">{t("wallet.transaction_log")}</h3>
              {(activeTab === "points" ? pointsHistoryLoading : walletLoading) && (
                <div className="text-center py-6 text-gray-500">{t("wallet.loading")}</div>
              )}
              {!pointsHistoryLoading && !walletLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(activeTab === "transactions" ? walletList : pointsList).map((item, idx) => (
                    <WalletTransactionRow
                      key={(item.id as string) ?? idx}
                      item={item}
                      type={activeTab}
                      t={t}
                    />
                  ))}
                  {(activeTab === "transactions" ? walletList : pointsList).length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      {t("wallet.no_transactions")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {(showPointsError || showWalletError) && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 p-4 mb-6">
            {showPointsError && <p>{t("wallet.loading")} (points)</p>}
            {showWalletError && <p>{t("wallet.loading")} (wallet)</p>}
          </div>
        )}
      </div>
    </div>
  );
};

function WalletTransactionRow({
  item,
  type,
  t,
}: {
  item: Record<string, unknown>;
  type: "points" | "transactions";
  t: (key: string) => string;
}) {
  const amount = Number(item.amount ?? item.points ?? 0);
  const description = String(item.description ?? item.title ?? item.reason ?? "—");
  const dateStr = item.created_at ?? item.date ?? item.created_at_human;
  const date = dateStr
    ? typeof dateStr === "string" && /^\d{4}-\d{2}-\d{2}/.test(dateStr)
      ? new Date(dateStr).toLocaleDateString("ar-SA")
      : String(dateStr)
    : "—";
  const isEarn = type === "points" ? (item.type === "earn" || (item.points as number) > 0) : (Number(item.amount ?? 0) > 0);

  if (type === "transactions") {
    return (
      <div className="flex items-center justify-between py-3 px-4 bg-white border border-[1.5px] border-gray-200 rounded-full hover:shadow-md transition-all">
        <div className="flex-1 text-start">
          <div className="text-base font-semibold text-gray-900">{description}</div>
          <div className="text-sm text-gray-500 mt-1">{date}</div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className={`text-lg font-bold ${isEarn ? "text-green-600" : "text-orange-500"}`}>
            {isEarn ? "+" : "-"}
            {Math.abs(amount)}
          </span>
          <CurrencyIcon size={18} className="text-gray-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-white border border-[1.5px] border-gray-200 rounded-full hover:shadow-md transition-all">
      <div className="text-start">
        <div className="text-sm font-semibold text-gray-900">{description}</div>
        <div className="text-sm text-gray-500 mt-1">{date}</div>
      </div>
      <div className="flex items-center space-x-4 space-x-reverse me-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isEarn ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <TbArrowsExchange2 className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center space-x-2 space-x-reverse">
        <span className="text-sm font-semibold text-gray-900">{Math.abs(amount)}</span>
        <span className="text-sm font-semibold text-gray-900">
          {isEarn ? "+" : "-"} {t("wallet.points")}
        </span>
      </div>
    </div>
  );
}

export default WalletPage;
