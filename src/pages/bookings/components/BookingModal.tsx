import { useState } from "react";
import { useIsRTL } from "@hooks";
import { FiMinus, FiPlus, FiStar } from "react-icons/fi";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import CurrencyIcon from "@components/CurrencyIcon";

interface BookingItem {
  id: number;
  name: { ar: string; en: string };
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: { ar: string; en: string };
  duration?: string;
  airline?: string;
  departure?: string;
  arrival?: string;
  stops?: string;
  class?: string;
  stars?: number;
  amenities?: string;
  location?: string;
  distance?: string;
  type?: string;
  transmission?: string;
  seats?: number;
  fuel?: string;
  year?: number;
  features?: string[];
}

interface BookingModalProps {
  booking: BookingItem;
  type: "flights" | "hotels" | "cars";
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({
  booking,
  type,
  isOpen,
  onClose,
}: BookingModalProps) => {
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!isOpen) return null;

  console.log("🎯 BookingModal rendered with:", { booking, type, isOpen });

  const totalPrice = booking.price * quantity;

  const getTypeIcon = () => {
    switch (type) {
      case "flights":
        return <MdOutlineFlight className="text-2xl" />;
      case "hotels":
        return <RiHotelLine className="text-2xl" />;
      case "cars":
        return <FaCar className="text-2xl" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "flights":
        return isRTL ? "رحلة" : "Flight";
      case "hotels":
        return isRTL ? "فندق" : "Hotel";
      case "cars":
        return isRTL ? "سيارة" : "Car";
      default:
        return "";
    }
  };

  const handlePurchase = () => {
    // Navigate to payment page
    window.location.href = `/bookings/${type}/payment?booking=${booking.id}&quantity=${quantity}&date=${selectedDate}&time=${selectedTime}`;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderFlightDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "مدة الرحلة" : "Duration"}
          </div>
          <div className="font-medium text-gray-800">{booking.duration}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "شركة الطيران" : "Airline"}
          </div>
          <div className="font-medium text-gray-800">{booking.airline}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "وقت المغادرة" : "Departure"}
          </div>
          <div className="font-medium text-gray-800">{booking.departure}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "وقت الوصول" : "Arrival"}
          </div>
          <div className="font-medium text-gray-800">{booking.arrival}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">
          {isRTL ? "التوقف" : "Stops"}
        </div>
        <div className="font-medium text-gray-800">{booking.stops}</div>
      </div>
    </div>
  );

  const renderHotelDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "التقييم" : "Rating"}
          </div>
          <div className="font-medium text-gray-800 flex items-center gap-1">
            <FiStar className="text-yellow-400" />
            {booking.stars} {isRTL ? "نجمة" : "Stars"}
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "الموقع" : "Location"}
          </div>
          <div className="font-medium text-gray-800">{booking.location}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">
          {isRTL ? "المسافة من المركز" : "Distance from Center"}
        </div>
        <div className="font-medium text-gray-800">{booking.distance}</div>
      </div>

      {booking.amenities && (
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "المرافق" : "Amenities"}
          </div>
          <div className="font-medium text-gray-800">{booking.amenities}</div>
        </div>
      )}
    </div>
  );

  const renderCarDetails = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "نوع السيارة" : "Car Type"}
          </div>
          <div className="font-medium text-gray-800">{booking.type}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "ناقل الحركة" : "Transmission"}
          </div>
          <div className="font-medium text-gray-800">
            {booking.transmission}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "عدد المقاعد" : "Seats"}
          </div>
          <div className="font-medium text-gray-800">{booking.seats}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">
            {isRTL ? "نوع الوقود" : "Fuel Type"}
          </div>
          <div className="font-medium text-gray-800">{booking.fuel}</div>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">
          {isRTL ? "سنة الصنع" : "Year"}
        </div>
        <div className="font-medium text-gray-800">{booking.year}</div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              {getTypeIcon()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {booking.name[isRTL ? "ar" : "en"]}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  <span>{booking.rating}</span>
                </div>
                <span>•</span>
                <span>
                  {isRTL
                    ? `${booking.reviews} تقييم`
                    : `${booking.reviews} reviews`}
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
          {/* Booking Image */}
          <div className="mb-6">
            <img
              src={booking.image}
              alt={booking.name[isRTL ? "ar" : "en"]}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Booking Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {isRTL ? `تفاصيل ${getTypeLabel()}` : `${getTypeLabel()} Details`}
            </h3>

            {type === "flights" && renderFlightDetails()}
            {type === "hotels" && renderHotelDetails()}
            {type === "cars" && renderCarDetails()}

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h4 className="font-medium text-gray-800 mb-2">
                {isRTL ? "الوصف" : "Description"}
              </h4>
              <p className="text-gray-600 text-sm">
                {booking.description[isRTL ? "ar" : "en"]}
              </p>
            </div>
          </div>

          {/* Features List */}
          {booking.features && booking.features.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-3">
                {isRTL ? "المميزات" : "Features"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {booking.features.map((feature, index) => (
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
          )}

          {/* Date and Time Selection */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-800 mb-3">
              {isRTL ? "اختيار التاريخ والوقت" : "Select Date & Time"}
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {isRTL ? "التاريخ" : "Date"}
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  {isRTL ? "الوقت" : "Time"}
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent"
                />
              </div>
            </div>
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
                onClick={() => setQuantity(quantity + 1)}
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
              {isRTL ? "احجز الآن" : "Book Now"}
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

export default BookingModal;
