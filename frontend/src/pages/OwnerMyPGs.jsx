import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import OwnerSidebar from "../components/OwnerSidebar";
import toast from "react-hot-toast";
import { MapPin, Plus, Trash2, Edit, X } from "lucide-react";

const EditModal = ({ pg, onClose, onSaved }) => {
  const [form, setForm] = useState({
    name: pg.name || "",
    location: pg.location || "",
    area: pg.area || "",
    price: pg.price || "",
    gender: pg.gender || "Boys",
    amenities: Array.isArray(pg.amenities) ? pg.amenities.join(", ") : pg.amenities || "",
    image: pg.image || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, amenities: form.amenities.split(",").map((a) => a.trim()) };
      await api.put(`/pgs/owner/update-pg/${pg._id}`, payload);
      toast.success("Property updated successfully!");
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 text-gray-800 dark:text-white p-3 rounded-xl outline-none focus:border-orange-500 transition-colors placeholder:text-gray-400 text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">
            Edit <span className="text-orange-500">Property</span>
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Name</label>
              <input name="name" required value={form.name} onChange={handleChange} className={inputCls} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</label>
              <input name="location" required value={form.location} onChange={handleChange} className={inputCls} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Area</label>
              <input name="area" value={form.area} onChange={handleChange} className={inputCls} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Price (₹/month)</label>
              <input name="price" required value={form.price} onChange={handleChange} className={inputCls} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputCls + " appearance-none"}>
              <option value="Boys">Boys Only</option>
              <option value="Girls">Girls Only</option>
              <option value="Co-ed">Co-ed / Both</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Amenities (comma separated)</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className={inputCls} placeholder="AC, Wi-Fi, Food" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Cover Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className={inputCls} placeholder="https://..." />
          </div>

          <div className="flex space-x-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-2xl border-2 border-gray-100 dark:border-gray-800 font-bold text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-black text-sm uppercase tracking-widest disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-orange-500/30">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const OwnerMyPGs = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPG, setEditingPG] = useState(null);

  const fetchMyPGs = async () => {
    try {
      const { data } = await api.get("/pgs/owner/my-pgs");
      setPgs(data);
    } catch {
      toast.error("Failed to load your PGs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyPGs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PG? This cannot be undone.")) return;
    try {
      await api.delete(`/pgs/owner/delete-pg/${id}`);
      toast.success("PG deleted successfully");
      fetchMyPGs();
    } catch {
      toast.error("Error deleting PG");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <OwnerSidebar />

      {editingPG && (
        <EditModal
          pg={editingPG}
          onClose={() => setEditingPG(null)}
          onSaved={() => { setEditingPG(null); fetchMyPGs(); }}
        />
      )}

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-2">My <span className="text-orange-500">PGs</span></h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Manage all your currently active properties.</p>
          </div>
          <Link
            to="/owner/add-pg"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-2xl font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            <Plus size={18} />
            <span>Add New PG</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : pgs.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-orange-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <MapPin className="text-orange-500" size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">No Properties Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto font-medium">
              You haven't added any PG accommodations yet. Start growing your passive income by listing your first property!
            </p>
            <Link to="/owner/add-pg" className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold tracking-widest uppercase text-sm">
              Add First PG
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pgs.map((pg) => (
              <div key={pg._id} className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl shadow-orange-500/5 group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={pg.image}
                    alt={pg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60"; }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-orange-500">
                    {pg.gender}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-1 truncate">{pg.name}</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                    <MapPin size={14} className="mr-1" />
                    <span className="truncate">{pg.location}</span>
                  </div>
                  <div className="text-2xl font-black text-orange-500 mb-6">
                    ₹{typeof pg.price === "number" ? pg.price.toLocaleString() : pg.price}
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-bold"> / Month</span>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => setEditingPG(pg)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-500 hover:text-white transition-colors duration-300 font-bold text-sm"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(pg._id)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 font-bold text-sm"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerMyPGs;
