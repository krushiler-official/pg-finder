import { useState, useEffect } from "react";
import api from "../utils/api";
import { useApp } from "../context/AppContext";
import OwnerSidebar from "../components/OwnerSidebar";
import { Building2, CalendarDays, Wallet, TrendingUp, MapPin, Phone, Briefcase } from "lucide-react";

const OwnerDashboard = () => {
  const { userInfo } = useApp();
  const [stats, setStats] = useState({ totalPGs: 0, totalBookings: 0, estimatedRevenue: 0 });
  const [latestBookings, setLatestBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // We run multiple promises to fetch data concurrently
        const [pgRes, bookingRes] = await Promise.all([
          api.get("/pgs/owner/my-pgs"),
          api.get("/bookings/owner/bookings"),
        ]);

        const pgs = pgRes.data;
        const bookings = bookingRes.data;

        // Calculate estimated revenue from totalPrice field or numeric pg.price
        let revenue = 0;
        bookings.forEach((booking) => {
            if (booking.totalPrice) {
                revenue += booking.totalPrice;
            } else if (booking.pg?.price && typeof booking.pg.price === "number") {
                revenue += booking.pg.price;
            }
        });

        setStats({ totalPGs: pgs.length, totalBookings: bookings.length, estimatedRevenue: revenue });
        setLatestBookings(bookings.slice(0, 5));
      } catch (error) {
        console.error("Dashboard Fetch Error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <div className={`bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-${color}-500/5 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500`} style={{ animationDelay: `${delay}ms` }}>
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl group-hover:bg-${color}-500/20 transition-all duration-500`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{title}</p>
          <h3 className="text-4xl font-black text-gray-800 dark:text-gray-100">
            {loading ? "..." : value}
          </h3>
        </div>
        <div className={`p-4 bg-${color}-50 dark:bg-${color}-500/10 rounded-2xl text-${color}-500 group-hover:scale-110 transition-transform`}>
          <Icon size={28} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <OwnerSidebar />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-2">
            Welcome back, <span className="text-orange-500">{userInfo?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Here is what's happening with your properties today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StatCard 
            title="Active Properties" 
            value={stats.totalPGs} 
            icon={Building2} 
            color="orange"
            delay={100} 
          />
          <StatCard 
            title="Total Bookings" 
            value={stats.totalBookings} 
            icon={CalendarDays} 
            color="blue"
            delay={200} 
          />
          <StatCard 
            title="Est. Monthly Revenue" 
            value={`₹${stats.estimatedRevenue.toLocaleString()}`} 
            icon={Wallet} 
            color="green"
            delay={300} 
          />
        </div>

        {/* Latest Bookings Feed */}
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">Latest <span className="text-orange-500">Bookings</span></h2>
              <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Most recent guest reservations</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-500">
              <CalendarDays size={22} />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>
          ) : latestBookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400 dark:text-gray-500 font-medium">No bookings received yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr className="text-gray-400 dark:text-gray-500 text-xs font-black uppercase tracking-widest">
                    <th className="p-5 text-left">Guest</th>
                    <th className="p-5 text-left">Property</th>
                    <th className="p-5 text-left">Move-in</th>
                    <th className="p-5 text-left">Mobile</th>
                    <th className="p-5 text-left">Workplace</th>
                    <th className="p-5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {latestBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-orange-50/40 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-black shrink-0">
                            {b.user?.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 dark:text-gray-100 text-sm">{b.user?.name || "—"}</div>
                            <div className="text-xs text-gray-400">{b.user?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="font-bold text-orange-500 text-sm">{b.pg?.name || "—"}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><MapPin size={11} />{b.pg?.location}</div>
                      </td>
                      <td className="p-5 text-sm font-bold text-gray-700 dark:text-gray-300">
                        {new Date(b.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Phone size={13} className="text-orange-400" />{b.mobile || "—"}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Briefcase size={13} className="text-orange-400" />{b.workplace || "—"}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-green-50 dark:bg-green-500/10 text-green-500">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default OwnerDashboard;
