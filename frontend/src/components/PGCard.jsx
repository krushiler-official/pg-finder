import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const PGCard = ({ pg }) => {
  const {
    addToCompare,
    removeFromCompare,
    compareList,
    toggleWishlist,
    wishlist,
  } = useApp();

  const isCompared = compareList.find((item) => item._id === pg._id);
  const isWishlisted = wishlist.find((item) => item._id === pg._id);

  // ✅ Safe Image Handling (Prevents Crash)
  const displayImage =
    pg.images?.length
      ? pg.images[0]
      : pg.image || "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl hover:shadow-orange-200 dark:hover:shadow-orange-950/20 transition-all duration-500 p-5 border border-transparent dark:border-gray-800 group">

      {/* Image Section */}
      <Link to={`/pg/${pg._id}`} className="block relative overflow-hidden rounded-[2rem]">
        <img
          src={displayImage}
          alt={pg.name}
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gender Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${pg.gender === "Male"
                ? "bg-blue-500 text-white"
                : pg.gender === "Female"
                  ? "bg-pink-500 text-white"
                  : "bg-purple-500 text-white"
              }`}
          >
            {pg.gender}
          </span>
        </div>
      </Link>

      {/* Content Section */}
      <div className="mt-6 space-y-2">

        {/* Title + Wishlist */}
        <div className="flex justify-between items-start">
          <Link to={`/pg/${pg._id}`}>
            <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors leading-tight">
              {pg.name}
            </h3>
          </Link>

          <button
            onClick={() => toggleWishlist(pg)}
            className={`p-3 rounded-2xl transition-all ${isWishlisted
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-orange-500"
              }`}
          >
            <span className="text-xl">♥</span>
          </button>
        </div>

        {/* Location */}
        <p className="text-gray-500 dark:text-gray-400 font-bold flex items-center text-sm">
          <span className="mr-2 text-orange-500">📍</span>
          {pg.location} •{" "}
          <span className="ml-1 text-gray-400">{pg.area}</span>
        </p>

        {/* Amenities */}
        <div className="flex items-center gap-3 py-3">
          <div className="flex flex-wrap gap-2">
            {pg.amenities?.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[10px] font-bold bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-3 py-1 rounded-lg text-gray-500"
              >
                {item}
              </span>
            ))}
            {pg.amenities?.length > 3 && (
              <span className="text-[10px] font-bold text-orange-500">
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price + Compare */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
          <div>
            <span className="text-3xl font-black text-orange-500">
              ₹{pg.price}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
              / mo
            </span>
          </div>

          <button
            onClick={() =>
              isCompared
                ? removeFromCompare(pg._id)
                : addToCompare(pg)
            }
            className={`px-6 py-3 text-xs rounded-2xl font-black uppercase tracking-widest transition-all ${isCompared
                ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                : "bg-gray-900 dark:bg-orange-500 text-white shadow-lg hover:opacity-90 active:scale-95"
              }`}
          >
            {isCompared ? "Remove" : "Compare"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default PGCard;