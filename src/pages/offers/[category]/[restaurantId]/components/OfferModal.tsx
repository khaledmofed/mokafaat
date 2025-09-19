import { useState } from "react";
import { useIsRTL } from "@hooks";
import { FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { type Offer, type Restaurant } from "@data/offers";
import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8 } from "@assets";
import CurrencyIcon from "@components/CurrencyIcon";

interface OfferModalProps {
  offer: Offer;
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
}

const OfferModal = ({
  offer,
  restaurant,
  isOpen,
  onClose,
}: OfferModalProps) => {
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const totalPrice = offer.discountPrice * quantity;

  // Function to get offer image
  const getOfferImage = (imageName: string) => {
    // If it's already a URL, return it directly
    if (imageName.startsWith("http")) {
      return imageName;
    }

    // Otherwise, use the local images
    switch (imageName) {
      case "Pro1":
        return Pro1;
      case "Pro2":
        return Pro2;
      case "Pro3":
        return Pro3;
      case "Pro4":
        return Pro4;
      case "Pro5":
        return Pro5;
      case "Pro6":
        return Pro6;
      case "Pro7":
        return Pro7;
      case "Pro8":
        return Pro8;
      default:
        return Pro1;
    }
  };

  const handlePurchase = () => {
    // Navigate to payment page
    window.location.href = `/offers/${restaurant.category.key}/${restaurant.slug}/payment?offer=${offer.id}&quantity=${quantity}`;
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
            <div className="w-16 h-16 rounded-xl overflow-hidden">
              <img
                src={getOfferImage(restaurant.logo)}
                alt={restaurant.name[isRTL ? "ar" : "en"]}
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
          <div className="text-3xl font-bold text-gray-800 flex items-center gap-1">
            {totalPrice}
            <CurrencyIcon className="text-gray-800" size={24} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Offer Image */}
          <div className="mb-6">
            <img
              src={getOfferImage(offer.image)}
              alt={offer.title[isRTL ? "ar" : "en"]}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Offer Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isRTL ? "تفاصيل العرض" : "Offer Details"}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {isRTL ? "صلاحية العرض" : "Offer Validity"}
                </div>
                <div className="font-medium text-gray-800">
                  {offer.validity[isRTL ? "ar" : "en"]}
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {isRTL ? "الخصم" : "Discount"}
                </div>
                <div className="font-medium text-gray-800">
                  {offer.discountPercentage}%
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">
                {isRTL ? "وصف العرض" : "Offer Description"}
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

          {/* Terms */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-2">
              {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
            </h4>
            <p className="text-gray-600 text-sm">
              {offer.terms[isRTL ? "ar" : "en"]}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-[#A0A5BA] flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiMinus className="text-white" />
              </button>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-medium">
                {quantity}
              </div>
              <button
                onClick={() =>
                  setQuantity(Math.min(offer.maxQuantity, quantity + 1))
                }
                className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

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
