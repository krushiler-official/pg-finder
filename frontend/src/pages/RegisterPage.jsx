import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/users/register", formData);
      login(data);
      toast.success(data.role === "owner" ? "Owner Account Created!" : "Registration successful! Welcome.");
      
      if (data.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50 dark:bg-gray-950 min-h-[80vh] transition-colors">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-orange-500/10 w-full max-w-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-4xl font-black mb-8 text-center text-gray-800 dark:text-gray-100">
          Create <span className="text-orange-500">Account</span>
        </h2>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full border-2 border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:text-white outline-none transition-all placeholder:text-gray-400"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full border-2 border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:text-white outline-none transition-all placeholder:text-gray-400"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border-2 border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:text-white outline-none transition-all placeholder:text-gray-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {/* Role Selection */}
          <div className="flex bg-gray-50 dark:bg-gray-800 rounded-2xl p-1.5 border-2 border-gray-50 dark:border-gray-800">
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                formData.role === "user"
                  ? "bg-white dark:bg-gray-900 text-orange-500 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setFormData({ ...formData, role: "user" })}
            >
              Regular User
            </button>
            <button
              type="button"
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                formData.role === "owner"
                  ? "bg-white dark:bg-gray-900 text-orange-500 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setFormData({ ...formData, role: "owner" })}
            >
              PG Owner
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-4 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform active:scale-95 uppercase tracking-widest text-sm"
          >
            {loading ? "Creating Account..." : "Join PG Finder"}
          </button>
        </form>

        <p className="text-center text-gray-400 dark:text-gray-500 mt-8 text-xs font-bold uppercase tracking-widest">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline ml-1">Login</Link>
        </p>
      </div>

    </div>
  );
};

export default RegisterPage;