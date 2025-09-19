import React from "react";
import { useIsRTL } from "@hooks";
import { BsHeart, BsShare } from "react-icons/bs";
import { IoStar } from "react-icons/io5";

interface InvestmentCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  rating?: number;
  onShare?: (id: number) => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  id,
  image,
  title,
  price,
  rating = 4.9,
  onShare,
}) => {
  const isRTL = useIsRTL();

  const handleShare = () => {
    if (onShare) onShare(id);
  };

  return (
    <div
      className="investmentCard bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm"
      style={{
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Image Section */}
      <div className="relative h-[420px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Top Left - Rating */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 ">
            <span className="text-sm font-bold text-white">{rating}</span>
            <IoStar className="text-orange-500 text-sm" />
          </div>
        </div>

        {/* Top Right - Share Icon */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleShare}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
          <button
            // onClick={() => onFavoriteClick?.(id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsHeart className="text-sm" />
          </button>
        </div>

        {/* Bottom Overlay with Gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent px-4 py-8 flex items-end"
          style={{ height: "90%" }}
        >
          <div className="text-white">
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            <p className="text-sm opacity-90">{price} / الليلة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
