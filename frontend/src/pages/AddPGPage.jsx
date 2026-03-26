import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import OwnerSidebar from "../components/OwnerSidebar";
import toast from "react-hot-toast";

const AddPGPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    area: "",
    price: "",
    gender: "Boys",
    amenities: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        amenities: formData.amenities.split(",").map(item => item.trim())
      };

      await api.post("/pgs/owner/add-pg", payload);
      toast.success("Property added successfully!");
      navigate("/owner/my-pgs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <OwnerSidebar />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-2">
            Add New <span className="text-orange-500">Property</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">List a new PG accommodation to start receiving bookings.</p>
        </header>

        <form onSubmit={handleSubmit} className="max-w-2xl bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-orange-500/5 border border-gray-100 dark:border-gray-800 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Property Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Skyline PG Hostel"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">City / Location</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Mumbai, Borivali West"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Area / Locality</label>
              <input
                type="text"
                name="area"
                required
                placeholder="e.g. Near Station Road"
                value={formData.area}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Monthly Rent</label>
              <input
                type="text"
                name="price"
                required
                placeholder="e.g. ₹ 8,000 / Month"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Gender Preference</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors appearance-none"
            >
              <option value="Boys">Boys Only</option>
              <option value="Girls">Girls Only</option>
              <option value="Co-ed">Co-ed / Both</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Amenities (Comma separated)</label>
            <input
              type="text"
              name="amenities"
              required
              placeholder="e.g. AC, Wi-Fi, Food, Laundry"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-2">Cover Image URL</label>
            <input
              type="url"
              name="image"
              required
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:scale-[1.02] text-white font-black py-4 rounded-2xl mt-8 shadow-xl shadow-orange-500/30 uppercase tracking-widest text-sm transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? "Publishing Property..." : "Add Property"}
          </button>
        </form>

      </main>
    </div>
  );
};

export default AddPGPage;
