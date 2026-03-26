import { useApp } from "../context/AppContext";

const ComparePage = () => {
  const { compareList, removeFromCompare } = useApp();

  return (
    <div className="min-h-screen p-10 bg-gray-50 dark:bg-gray-950 transition-colors">
      <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-10 tracking-tight">
        Compare <span className="text-orange-500">PGs</span>
      </h2>

      {compareList.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-[2.5rem] border-2 border-dashed border-orange-200 dark:border-gray-800 text-center">
          <p className="text-orange-500 font-black uppercase tracking-widest text-sm">
            Select PGs to compare from the search page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {compareList.map(pg => (
            <div key={pg._id} className="bg-white dark:bg-gray-900 shadow-xl p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all hover:shadow-orange-500/5 flex flex-col h-full">
              <div className="relative mb-6 rounded-3xl overflow-hidden shadow-lg shrink-0">
                <img src={pg.images?.length ? pg.images[0] : pg.image || "https://via.placeholder.com/600x400?text=No+Image"} alt={pg.name} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {pg.gender}
                </div>
              </div>

              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">{pg.name}</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Location</span>
                  <span className="text-gray-700 dark:text-gray-300 font-bold">{pg.location}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Price</span>
                  <span className="text-orange-500 font-black text-xl">₹{pg.price}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Area</span>
                  <span className="text-gray-700 dark:text-gray-300 font-bold">{pg.area}</span>
                </div>
                
                {pg.amenities && pg.amenities.length > 0 && (
                  <div className="flex flex-col py-3 border-b border-gray-50 dark:border-gray-800">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-3">Amenities</span>
                    <div className="flex flex-wrap gap-2">
                      {pg.amenities.map((amenity, index) => (
                        <span key={index} className="bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => removeFromCompare(pg._id)}
                  className="w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300"
                >
                Remove from comparison
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePage;