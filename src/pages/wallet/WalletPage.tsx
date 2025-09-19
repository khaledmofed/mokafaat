import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoWalletOutline, IoGiftOutline } from "react-icons/io5";
import { TbArrowsExchange2 } from "react-icons/tb";
import CurrencyIcon from "@components/CurrencyIcon";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
} from "@assets";

const WalletPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"points" | "transactions">(
    "transactions"
  );

  // Mock data for wallet
  const walletData = {
    points: 290,
    balance: 3067,
  };

  const transactions = [
    {
      id: "1",
      type: "expense",
      amount: 67,
      description: "اشتراك شاهد نت",
      date: "28 مايو 2025",
      icon: "shahid",
      iconColor: "bg-cyan-400",
      iconText: "شاهد",
      image: Cards1,
    },
    {
      id: "2",
      type: "expense",
      amount: 180,
      description: "خصم 15% قسيمة",
      date: "28 مايو 2025",
      icon: "stc",
      iconColor: "bg-purple-600",
      iconText: "stc",
      image: Cards2,
    },
    {
      id: "3",
      type: "expense",
      amount: 380,
      description: "شراء قسيمة خصم",
      date: "28 مايو 2025",
      icon: "hunger",
      iconColor: "bg-yellow-400",
      iconText: "HUNGER STATION",
      image: Cards3,
    },
    {
      id: "4",
      type: "expense",
      amount: 180,
      description: "خصم 15% مشتريات",
      date: "28 مايو 2025",
      icon: "stc",
      iconColor: "bg-purple-600",
      iconText: "stc",
      image: Cards4,
    },
  ];

  const pointsTransactions = [
    {
      id: "1",
      type: "earn",
      amount: 13,
      description: "قسيمة شرائية 130 ريال",
      date: "28 مايو 2025",
      icon: "points",
      iconColor: "bg-green-500",
      iconText: "+",
      image: Cards5,
    },
    {
      id: "2",
      type: "spend",
      amount: 22,
      description: "صفقة شرائية 270 ريال",
      date: "28 مايو 2025",
      icon: "points",
      iconColor: "bg-red-500",
      iconText: "-",
      image: Cards6,
    },
    {
      id: "3",
      type: "earn",
      amount: 16,
      description: "صفقة شرائية 160 ريال",
      date: "28 مايو 2025",
      icon: "points",
      iconColor: "bg-green-500",
      iconText: "+",
      image: Cards7,
    },
    {
      id: "4",
      type: "spend",
      amount: 17,
      description: "صفقة شرائية 170 ريال",
      date: "28 مايو 2025",
      icon: "points",
      iconColor: "bg-red-500",
      iconText: "-",
      image: Cards8,
    },
  ];

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
                {t("wallet.title")}
              </h1>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <IoWalletOutline className="w-8 h-8 text-[#440798]" />
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Points Card */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <IoGiftOutline className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2">{walletData.points}</div>
            <div className="text-sm opacity-90">
              {t("wallet.points_balance")}
            </div>
          </div>

          {/* Money Card */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <IoWalletOutline className="w-8 h-8" />
            </div>
            <div className="text-3xl font-bold mb-2 flex items-center gap-2">
              {walletData.balance}
              <CurrencyIcon size={24} className="text-white" />
            </div>
            <div className="text-sm opacity-90">
              {t("wallet.account_balance")}
            </div>
          </div>
        </div>

        {/* Tabs */}
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

        {/* Transaction Log Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            {t("wallet.transaction_log")}
          </h3>

          {/* Transactions List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(activeTab === "transactions"
              ? transactions
              : pointsTransactions
            ).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 px-4 bg-white border border-[1.5px] border-gray-200 rounded-full hover:shadow-md transition-all"
              >
                {activeTab === "transactions" ? (
                  <>
                    {/* Right Side - Logo */}
                    <div className="flex items-center space-x-4 space-x-reverse me-2">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-[2px] border-[#ddd]">
                          <img
                            src={transaction.image}
                            alt={transaction.description}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Description */}
                    <div className="flex-1 text-start">
                      <div className="text-base font-semibold text-gray-900">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {transaction.date}
                      </div>
                    </div>

                    {/* Left Side - Price */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-lg font-bold text-orange-500">
                        -{transaction.amount}
                      </span>
                      <CurrencyIcon size={18} className="text-gray-700" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Right Side - Points Icon */}

                    {/* Middle Section - Description */}
                    <div className=" text-start">
                      <div className="text-sm font-semibold text-gray-900">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {transaction.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 space-x-reverse me-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "earn"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        <TbArrowsExchange2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {/* Left Side - Points */}
                    <div className="flex items-center space-x-2 space-x-reverse ">
                      <span className="text-sm font-semibold text-gray-900">
                        {transaction.amount}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {transaction.type === "earn"
                          ? "نقطة إضافية"
                          : "نقطة خصم"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
