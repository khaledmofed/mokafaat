import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { FiStar, FiEye, FiDownload } from "react-icons/fi";
import { BsHeart, BsShare } from "react-icons/bs";
import { Offer } from "@data/offers";

interface Restaurant {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  logo: string;
  location: { ar: string; en: string };
  distance: string;
  rating: number;
  views: number;
  saves: number;
  isOpen: boolean;
  offers: Offer[];
  slug: string;
}

interface RestaurantListViewProps {
  restaurants: Restaurant[];
  category: string;
  getRestaurantImage: (logoName: string) => string;
  className?: string;
}

const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  category,
  getRestaurantImage,
  className = "",
}) => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          onClick={() => navigate(`/offers/${category}/${restaurant.slug}`)}
        >
          <div className="flex">
            {/* Image Section - Right */}
            <div className="w-48 h-32 relative flex-shrink-0">
              <img
                src={getRestaurantImage(restaurant.logo)}
                alt={restaurant.name[isRTL ? "ar" : "en"]}
                className="w-full h-full object-cover"
              />

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsShare className="text-xs" />
                </button>
                <button
                  className="w-6 h-6 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsHeart className="text-xs" />
                </button>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {restaurant.offers[0]?.discountPercentage || 30}%{" "}
                  {isRTL ? "خصم" : "OFF"}
                </span>
              </div>

              {/* Status Badge */}
              {restaurant.isOpen && (
                <div className="absolute bottom-2 left-2">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {isRTL ? "مفتوح" : "Open"}
                  </span>
                </div>
              )}
            </div>
            {/* Content Section - Left */}
            <div className="flex-1 px-4 h-32 py-3 flex flex-col justify-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {restaurant.name[isRTL ? "ar" : "en"]}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {restaurant.description[isRTL ? "ar" : "en"]}
                </p>

                {/* Location and Distance */}
                <div className="flex items-center justify-between gap-2 mb-0">
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiEye />
                      <span>{restaurant.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiDownload />
                      <span>{restaurant.saves}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {restaurant.location[isRTL ? "ar" : "en"]}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      {restaurant.distance}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantListView;
