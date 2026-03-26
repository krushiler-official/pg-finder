import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, PlusCircle, CalendarCheck, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";

const OwnerSidebar = () => {
  const location = useLocation();
  const { logout, userInfo } = useApp();

  const navLinks = [
    { name: "Dashboard", path: "/owner/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My PGs", path: "/owner/my-pgs", icon: <Home size={20} /> },
    { name: "Add New PG", path: "/owner/add-pg", icon: <PlusCircle size={20} /> },
    { name: "Bookings", path: "/owner/bookings", icon: <CalendarCheck size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 hidden md:flex flex-col min-h-[calc(100vh-80px)] top-20 sticky">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          Owner <span className="text-orange-500">Panel</span>
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-semibold uppercase tracking-widest">
          {userInfo?.name}
        </p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 ${
                isActive
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 translate-x-1"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200 hover:translate-x-1"
              }`}
            >
              <span className={isActive ? "text-white" : "text-orange-500"}>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex items-center w-full space-x-3 px-4 py-3 rounded-2xl font-bold text-sm tracking-wide text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut size={20} />
          <span>Secure Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default OwnerSidebar;
