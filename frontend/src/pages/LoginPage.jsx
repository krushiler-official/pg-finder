import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/users/login", formData);
      login(data);
      toast.success("Logged in successfully!");
      
      if (data.role === "owner") {
        navigate("/owner/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-gray-50 dark:bg-gray-950 min-h-[80vh] transition-colors">

      <div className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl shadow-orange-500/10 w-full max-w-md border border-gray-100 dark:border-gray-800">
        <h2 className="text-4xl font-black mb-8 text-center text-gray-800 dark:text-gray-100">
          Welcome <span className="text-orange-500">Back</span>
        </h2>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:opacity-90 disabled:opacity-50 text-white font-black py-4 rounded-2xl mt-4 shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform active:scale-95 uppercase tracking-widest text-sm"
          >
            {loading ? "Authenticating..." : "Login to Your Account"}
          </button>
        </form>

        <p className="text-center text-gray-400 dark:text-gray-500 mt-8 text-xs font-bold uppercase tracking-widest">
          Don't have an account? <Link to="/register" className="text-orange-500 hover:underline ml-1">Register</Link>
        </p>
      </div>

    </div>
  );
};

export default LoginPage;