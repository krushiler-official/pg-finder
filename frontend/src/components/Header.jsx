import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Sun, Moon, LayoutDashboard, Building2, PlusCircle, CalendarCheck, Users, Settings, LogOut, Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, toggleDarkMode, userInfo, logout } = useApp();

  const handleSearch = () => {
    if (search.trim()) navigate(`/search?location=${search}`);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkCls = (path) =>
    `font-semibold text-sm transition-all duration-200 ${
      isActive(path)
        ? "text-orange-500 border-b-2 border-orange-500 pb-0.5"
        : "text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
    }`;

  // ── OWNER HEADER ──────────────────────────────────────────────
  if (userInfo?.role === "owner") {
    return (
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/owner/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-black text-orange-500">PG Finder</span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500 text-white px-2 py-0.5 rounded-full">Owner</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/owner/dashboard" className={navLinkCls("/owner/dashboard")}>
              <span className="flex items-center gap-1.5"><LayoutDashboard size={15} /> Dashboard</span>
            </Link>
            <Link to="/owner/my-pgs" className={navLinkCls("/owner/my-pgs")}>
              <span className="flex items-center gap-1.5"><Building2 size={15} /> My PGs</span>
            </Link>
            <Link to="/owner/add-pg" className={navLinkCls("/owner/add-pg")}>
              <span className="flex items-center gap-1.5"><PlusCircle size={15} /> Add PG</span>
            </Link>
            <Link to="/owner/bookings" className={navLinkCls("/owner/bookings")}>
              <span className="flex items-center gap-1.5"><CalendarCheck size={15} /> Bookings</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-2xl">
              <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-100 hidden sm:block">{userInfo.name}</span>
            </div>
            <button onClick={toggleDarkMode} className="relative w-14 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center px-1 transition duration-300 shadow-inner">
              <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow flex items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}>
                {darkMode ? <Moon size={11} className="text-yellow-400" /> : <Sun size={11} className="text-orange-500" />}
              </div>
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 px-3 py-2 rounded-xl transition-colors">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ── ADMIN HEADER ──────────────────────────────────────────────
  if (userInfo?.role === "admin") {
    return (
      <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">PG Finder</span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-red-500 text-white px-2 py-0.5 rounded-full">Admin</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/admin" className={`font-semibold text-sm transition-all ${isActive("/admin") ? "text-white border-b-2 border-orange-500 pb-0.5" : "text-gray-400 hover:text-white"}`}>
              <span className="flex items-center gap-1.5"><LayoutDashboard size={15} /> Dashboard</span>
            </Link>
            <Link to="/admin/users" className={`font-semibold text-sm transition-all ${isActive("/admin/users") ? "text-white border-b-2 border-orange-500 pb-0.5" : "text-gray-400 hover:text-white"}`}>
              <span className="flex items-center gap-1.5"><Users size={15} /> Users</span>
            </Link>
            <Link to="/admin/pgs" className={`font-semibold text-sm transition-all ${isActive("/admin/pgs") ? "text-white border-b-2 border-orange-500 pb-0.5" : "text-gray-400 hover:text-white"}`}>
              <span className="flex items-center gap-1.5"><Building2 size={15} /> PGs</span>
            </Link>
            <Link to="/admin/bookings" className={`font-semibold text-sm transition-all ${isActive("/admin/bookings") ? "text-white border-b-2 border-orange-500 pb-0.5" : "text-gray-400 hover:text-white"}`}>
              <span className="flex items-center gap-1.5"><CalendarCheck size={15} /> Bookings</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-2xl">
              <div className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-black">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-bold text-white hidden sm:block">{userInfo.name}</span>
            </div>
            <button onClick={toggleDarkMode} className="relative w-14 h-7 bg-gray-800 rounded-full flex items-center px-1 transition duration-300 shadow-inner border border-gray-700">
              <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-gray-600 shadow flex items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}>
                {darkMode ? <Moon size={11} className="text-yellow-400" /> : <Sun size={11} className="text-orange-400" />}
              </div>
            </button>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-red-300 px-3 py-2 rounded-xl transition-colors border border-red-500/20 hover:border-red-500/50">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ── USER / DEFAULT HEADER ─────────────────────────────────────
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm dark:bg-gray-900 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-2xl font-black text-orange-500 dark:text-orange-400 hover:scale-105 transition shrink-0">
          PG Finder
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 bg-white border-2 border-orange-200 rounded-full px-4 py-2 dark:bg-gray-800 dark:border-gray-700 transition-all">
          <input
            type="text"
            placeholder="Search location..."
            className="outline-none px-3 bg-transparent dark:text-gray-100 w-full text-sm"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition text-sm">
            🔍
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/search" className={navLinkCls("/search")}>Explore</Link>
          <Link to="/compare" className={navLinkCls("/compare")}>Compare</Link>
          <Link to="/dashboard" className={navLinkCls("/dashboard")}>Wishlist</Link>
          {userInfo && <Link to="/my-bookings" className={navLinkCls("/my-bookings")}>My Bookings</Link>}

          {userInfo ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-2xl">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-100 text-sm">{userInfo.name}</span>
              </div>
              <button onClick={logout} className="text-sm font-bold text-gray-500 dark:text-gray-400 border-2 border-gray-200 dark:border-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="font-bold text-orange-500 border-2 border-orange-500/20 px-4 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-all text-sm">
              Login
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} className="relative w-14 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center px-1 transition duration-300 shadow-inner">
            <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 shadow flex items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"}`}>
              {darkMode ? <Moon size={11} className="text-yellow-400" /> : <Sun size={11} className="text-orange-500" />}
            </div>
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 space-y-3">
          <Link to="/search" onClick={() => setMobileOpen(false)} className="block font-semibold text-gray-700 dark:text-gray-300 py-2">Explore</Link>
          <Link to="/compare" onClick={() => setMobileOpen(false)} className="block font-semibold text-gray-700 dark:text-gray-300 py-2">Compare</Link>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block font-semibold text-gray-700 dark:text-gray-300 py-2">Wishlist</Link>
          {userInfo && <Link to="/my-bookings" onClick={() => setMobileOpen(false)} className="block font-semibold text-orange-500 py-2">My Bookings</Link>}
          {userInfo
            ? <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left font-bold text-red-500 py-2">Logout</button>
            : <Link to="/login" onClick={() => setMobileOpen(false)} className="block font-bold text-orange-500 py-2">Login</Link>
          }
        </div>
      )}
    </header>
  );
};

export default Header;
