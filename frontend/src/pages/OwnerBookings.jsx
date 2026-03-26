import { useEffect, useState } from "react";
import api from "../utils/api";
import OwnerSidebar from "../components/OwnerSidebar";
import toast from "react-hot-toast";
import { Users, Calendar, MapPin, Phone, Briefcase } from "lucide-react";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get("/bookings/owner/bookings");
        setBookings(data);
      } catch (error) {
        toast.error("Failed to load property bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <OwnerSidebar />
      
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-10 border-b border-gray-100 dark:border-gray-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-2">Guest <span className="text-orange-500">Bookings</span></h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">View all incoming reservation requests across your portfolio.</p>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400">
               <Users size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              You haven't received any booking requests at this time.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest font-black">
                    <th className="p-6">Guest Name</th>
                    <th className="p-6">Property</th>
                    <th className="p-6">Move-in Date</th>
                    <th className="p-6">Contact Email</th>
                    <th className="p-6">Mobile</th>
                    <th className="p-6">Workplace</th>
                    <th className="p-6">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-orange-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                      
                      <td className="p-6">
                        <div className="font-bold text-gray-800 dark:text-gray-100">{booking.user?.name || "Unknown Guest"}</div>
                      </td>

                      <td className="p-6">
                        {booking.pg ? (
                          <div>
                            <div className="font-bold text-orange-500">{booking.pg.name}</div>
                            <div className="flex items-center text-xs text-gray-400 mt-1 font-semibold uppercase tracking-wider">
                              <MapPin size={12} className="mr-1" />
                              {booking.pg.location}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Property Removed</span>
                        )}
                      </td>

                      <td className="p-6">
                        <div className="flex items-center text-sm font-bold text-gray-700 dark:text-gray-300">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="p-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {booking.user?.email || "N/A"}
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <Phone size={13} className="text-orange-400" />
                          {booking.mobile || <span className="text-gray-400 font-normal italic">N/A</span>}
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <Briefcase size={13} className="text-orange-400" />
                          {booking.workplace || <span className="text-gray-400 font-normal italic">N/A</span>}
                        </div>
                      </td>

                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-green-50 dark:bg-green-500/10 text-green-500">
                          Confirmed
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerBookings;
