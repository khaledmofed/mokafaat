import { useState } from "react";
import { useIsRTL } from "@hooks";
import {
  // FiX,
  FiMinus,
  FiPlus,
  FiStar,
  // FiEye,
  // FiDownload,
  // FiBookmark,
} from "react-icons/fi";
import { type CardOffer, type CardCompany } from "@data/cards";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
  Cards12,
  Cards13,
  Cards14,
} from "@assets";
import CurrencyIcon from "@components/CurrencyIcon";

interface OfferModalProps {
  offer: CardOffer;
  company: CardCompany;
  isOpen: boolean;
  onClose: () => void;
}

const OfferModal = ({ offer, company, isOpen, onClose }: OfferModalProps) => {
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const totalPrice = offer.price * quantity;
  // const totalOriginalPrice = offer.originalPrice
  //   ? offer.originalPrice * quantity
  //   : null;

  // Function to get card image
  const getCardImage = (logoName: string) => {
    switch (logoName) {
      case "Cards1":
        return Cards1;
      case "Cards2":
        return Cards2;
      case "Cards3":
        return Cards3;
      case "Cards4":
        return Cards4;
      case "Cards5":
        return Cards5;
      case "Cards6":
        return Cards6;
      case "Cards7":
        return Cards7;
      case "Cards8":
        return Cards8;
      case "Cards12":
        return Cards12;
      case "Cards13":
        return Cards13;
      case "Cards14":
        return Cards14;
      default:
        return Cards1;
    }
  };

  const handlePurchase = () => {
    // Navigate to payment page
    window.location.href = `/cards/${company.id}/payment?offer=${offer.id}&quantity=${quantity}`;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img
                src={getCardImage(company.logo)}
                alt={company.name[isRTL ? "ar" : "en"]}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {offer.title[isRTL ? "ar" : "en"]}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span>{offer.rating}</span>
                </div>
                <span>•</span>
                <span>
                  {isRTL
                    ? `${offer.purchases} عدد مرات الشراء`
                    : `${offer.purchases} purchases`}
                </span>
              </div>
            </div>
          </div>
          <div className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-1">
            {totalPrice}
            <CurrencyIcon className="text-gray-800" size={32} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Offer Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isRTL ? "تفاصيل العرض" : "Offer Details"}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <div className="text-sm text-gray-600 mb-0">
                  {isRTL ? "صلاحية الحزمة" : "Package Validity"}
                </div>
                <div className="font-medium text-gray-800">
                  {offer.validity[isRTL ? "ar" : "en"]}
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <div className="text-sm text-gray-600 mb-0">
                  {isRTL ? "مميزات الخدمة" : "Service Features"}
                </div>
                <div className="font-medium text-gray-800">
                  {isRTL ? "متجددة" : "Renewable"}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <h4 className="font-medium text-gray-800 mb-0">
                {isRTL ? "تعرف أكثر عن الخدمة" : "Learn more about the service"}
              </h4>
              <p className="text-gray-600 text-sm">
                {offer.description[isRTL ? "ar" : "en"]}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">
              {isRTL ? "المميزات" : "Features"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {offer.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-10 mt-10 mx-auto flex">
            {/* <h4 className="font-medium text-gray-800 mb-3">
              {isRTL ? "الكمية" : "Quantity"}
            </h4> */}
            <div className="flex items-center gap-4 mx-auto">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-[#A0A5BA] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiMinus className="text-white" />
              </button>
              <div className="w-12 h-12   bg-gray-100   rounded-full flex items-center justify-center font-medium">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{offer.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiDownload />
              <span>{offer.downloads}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiBookmark />
              <span>{offer.bookmarks}</span>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handlePurchase}
              className="py-3 px-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              {isRTL ? "شراء سريع" : "Quick Buy"}
            </button>
            <button
              onClick={handlePurchase}
              className="py-3 px-10 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
            >
              Apple Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
