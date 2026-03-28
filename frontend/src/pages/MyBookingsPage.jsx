import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, MapPin, CheckCircle, Phone, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const MyBookingsPage = () => {
  const { userInfo } = useApp();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userInfo?._id) return;

      try {
       const { data } = await api.get(`/bookings/user/${userInfo._id}`);
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">Please Log In</h2>
          <p className="text-gray-500 max-w-sm mb-6">You need to be logged in to view your bookings.</p>
          <Link to="/login" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-orange-500 font-bold text-lg animate-pulse">
        Loading Your Bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          My <span className="text-orange-500">Bookings</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">Manage and view all your PG reservations.</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-8 font-semibold">
            {error}
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && !error ? (
          <div className="bg-white dark:bg-gray-900 p-16 rounded-[2.5rem] border-2 border-dashed border-orange-200 dark:border-gray-800 text-center shadow-sm">
            <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-orange-500 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">No Bookings Yet!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't booked any PGs. Explore our top properties and find your perfect stay.
            </p>
            <Link to="/search" className="inline-block px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-1 transition-all">
              Explore PGs
            </Link>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => {
              const pg = booking.pg;
              if (!pg) return null; // Fallback in case PG was deleted
              
              const moveInDate = new Date(booking.checkInDate).toLocaleDateString("en-US", {
                weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
              });

              return (
                <div key={booking._id} className="bg-white dark:bg-gray-900 rounded-4xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-orange-500/10 transition-shadow">
                  
                  {/* Image Header */}
                  <div className="relative h-48 w-full">
                    <img 
                      src={pg.images?.length ? pg.images[0] : pg.image || "https://via.placeholder.com/600x400?text=No+Image"} 
                      alt={pg.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 text-green-600 dark:text-green-400 shadow-md">
                      <CheckCircle size={14} />
                      {booking.status}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <Link to={`/pg/${pg._id}`} className="hover:text-orange-500 transition-colors">
                      <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                        {pg.name}
                      </h3>
                    </Link>

                    <p className="text-gray-500 dark:text-gray-400 text-sm font-bold flex items-center gap-1.5 mb-6">
                      <MapPin size={16} className="text-orange-500" />
                      {pg.location} • {pg.area}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Move-in Date</span>
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-lg">
                          {moveInDate}
                        </span>
                      </div>

                      {booking.mobile && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Phone size={12} /> Mobile</span>
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{booking.mobile}</span>
                        </div>
                      )}

                      {booking.workplace && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1"><Briefcase size={12} /> Workplace</span>
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200 text-right max-w-[55%] truncate">{booking.workplace}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-end">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Monthly Rent</span>
                        <div className="flex items-end gap-1">
                          <span className="text-2xl font-black text-orange-500">₹{pg.price}</span>
                          <span className="text-xs font-bold text-gray-400 mb-1">/mo</span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
