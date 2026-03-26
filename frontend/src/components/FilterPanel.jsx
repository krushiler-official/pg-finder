const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-orange-100 dark:border-gray-800 transition-colors duration-300">

      <h3 className="text-xl font-bold text-orange-500 dark:text-orange-400 mb-6 flex items-center">
        <span className="mr-2">📂</span> Categories
      </h3>

      <div className="space-y-6">
        {/* Location Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Location</label>
          <input
            type="text"
            placeholder="City or landmark..."
            className="w-full border-2 border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5 rounded-xl outline-none focus:border-orange-500 transition-colors"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        {/* Price Range Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Max Price</label>
            <span className="text-orange-500 font-bold">₹{filters.price || 30000}</span>
          </div>
          <input
            type="range"
            min="6000"
            max="30000"
            step="500"
            className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500 dark:bg-gray-800"
            value={filters.price || 30000}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-bold">
            <span>₹6k</span>
            <span>₹30k</span>
          </div>
        </div>

        {/* Gender Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Gender Category</label>
          <select
            className="w-full border-2 border-orange-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2.5 rounded-xl outline-none focus:border-orange-500 transition-colors"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">All Genders</option>
            <option value="Male">Male Only</option>
            <option value="Female">Female Only</option>
            <option value="Unisex">Unisex / Both</option>
          </select>
        </div>


        <button
          onClick={() => setFilters({ location: "", price: "", gender: "" })}
          className="w-full py-2 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors border border-orange-200 rounded-xl hover:bg-orange-50"
        >
          Reset Filters
        </button>
      </div>

    </div>
  );
};

export default FilterPanel;