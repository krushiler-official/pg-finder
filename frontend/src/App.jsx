import { Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ComparePage from "./pages/ComparePage";
import AdminPanel from "./pages/AdminPanel";
import PGDetailPage from "./pages/PGDetailPage";
import MyBookingsPage from "./pages/MyBookingsPage";

import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerMyPGs from "./pages/OwnerMyPGs";
import AddPGPage from "./pages/AddPGPage";
import OwnerBookings from "./pages/OwnerBookings";
import { useApp } from "./context/AppContext";
import { Navigate } from "react-router-dom";

// Requires login for any page
const PrivateRoute = ({ children }) => {
  const { userInfo } = useApp();
  return userInfo ? children : <Navigate to="/login" />;
};

// Protected Route Wrapper for Owner Pages
const OwnerRoute = ({ children }) => {
  const { userInfo } = useApp();
  if (!userInfo) return <Navigate to="/login" />;
  if (userInfo.role !== "owner") return <Navigate to="/" />;
  return children;
};

// Floating home button — only for regular users
const FloatingHomeButton = () => {
  const { userInfo } = useApp();
  if (!userInfo || userInfo.role !== "user") return null;
  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-[100] p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all group lg:flex items-center gap-2"
      title="Go to Home"
    >
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
      <span className="hidden group-hover:block font-bold text-sm text-gray-700 dark:text-gray-300">Home</span>
    </Link>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col relative">

      <FloatingHomeButton />

      <Header />
      <Toaster position="top-center" />

      <main className="flex-grow">
        <Routes>
          {/* Public routes — login/register only */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* All other routes require login */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
          <Route path="/pg/:id" element={<PrivateRoute><PGDetailPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/compare" element={<PrivateRoute><ComparePage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookingsPage /></PrivateRoute>} />

          {/* Protected Owner Routes */}
          <Route path="/owner/dashboard" element={<OwnerRoute><OwnerDashboard /></OwnerRoute>} />
          <Route path="/owner/my-pgs" element={<OwnerRoute><OwnerMyPGs /></OwnerRoute>} />
          <Route path="/owner/add-pg" element={<OwnerRoute><AddPGPage /></OwnerRoute>} />
          <Route path="/owner/bookings" element={<OwnerRoute><OwnerBookings /></OwnerRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/pgs" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/bookings" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;