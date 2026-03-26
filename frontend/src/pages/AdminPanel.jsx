import { useEffect, useState } from "react";
import api from "../utils/api";
import { Users, Building2, CalendarCheck, Wallet, Phone, Briefcase, MapPin, Trash2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white dark:bg-gray-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
    <div className={`absolute -right-4 -top-4 w-20 h-20 bg-${color}-500/10 rounded-full blur-xl`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-800 dark:text-gray-100">{value}</h3>
      </div>
      <div className={`p-3 bg-${color}-50 dark:bg-${color}-500/10 rounded-xl text-${color}-500`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

const TABS = ["Overview", "Users", "PGs", "Bookings"];

const AdminPanel = () => {
  const [tab, setTab] = useState("Overview");
  const [stats, setStats] = useState({ users: 0, owners: 0, pgs: 0, bookings: 0, revenue: 0 });
  const [users, setUsers] = useState([]);
  const [pgs, setPGs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [uRes, pRes, bRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/pgs"),
          api.get("/admin/bookings"),
        ]);
        const u = uRes.data, p = pRes.data, b = bRes.data;
        setUsers(u);
        setPGs(p);
        setBookings(b);
        setStats({
          users: u.filter(x => x.role === "user").length,
          owners: u.filter(x => x.role === "owner").length,
          pgs: p.length,
          bookings: b.length,
          revenue: b.reduce((sum, bk) => sum + (bk.totalPrice || 0), 0),
        });
      } catch {
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success("User deleted");
    } catch { toast.error("Failed to delete user"); }
  };

  const handleDeletePG = async (id) => {
    if (!window.confirm("Delete this PG?")) return;
    try {
      await api.delete(`/admin/pgs/${id}`);
      setPGs(pgs.filter(p => p._id !== id));
      toast.success("PG deleted");
    } catch { toast.error("Failed to delete PG"); }
  };

  const thCls = "p-4 text-left text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500";
  const tdCls = "p-4 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Page Header */}
        <div className="mb-10 flex items-center gap-4">
          <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-2xl text-red-500">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              Admin <span className="text-red-500">Control Panel</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">Full system overview and management</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800 w-fit shadow-sm">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-200 ${
                tab === t
                  ? "bg-gray-950 dark:bg-orange-500 text-white shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW TAB ── */}
            {tab === "Overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                  <StatCard title="Regular Users" value={stats.users} icon={Users} color="blue" />
                  <StatCard title="PG Owners" value={stats.owners} icon={ShieldCheck} color="orange" />
                  <StatCard title="Total PGs" value={stats.pgs} icon={Building2} color="green" />
                  <StatCard title="Total Bookings" value={stats.bookings} icon={CalendarCheck} color="purple" />
                  <StatCard title="Total Revenue" value={`₹${stats.revenue.toLocaleString()}`} icon={Wallet} color="yellow" />
                </div>

                {/* Latest 5 bookings */}
                <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">Latest Bookings</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                          <th className={thCls}>Guest</th>
                          <th className={thCls}>PG</th>
                          <th className={thCls}>Move-in</th>
                          <th className={thCls}>Amount</th>
                          <th className={thCls}>Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {bookings.slice(0, 5).map(b => (
                          <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                            <td className={tdCls}>{b.user?.name || "—"}</td>
                            <td className={tdCls + " text-orange-500 font-bold"}>{b.pg?.name || "—"}</td>
                            <td className={tdCls}>{new Date(b.checkInDate).toLocaleDateString()}</td>
                            <td className={tdCls + " font-black text-green-500"}>₹{b.totalPrice || 0}</td>
                            <td className={tdCls}>
                              <span className="px-2 py-1 rounded-full text-xs font-black bg-green-50 dark:bg-green-500/10 text-green-500 uppercase tracking-widest">
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── USERS TAB ── */}
            {tab === "Users" && (
              <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">All Users <span className="text-gray-400 font-medium text-sm ml-2">({users.length})</span></h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className={thCls}>Name</th>
                        <th className={thCls}>Email</th>
                        <th className={thCls}>Role</th>
                        <th className={thCls}>Joined</th>
                        <th className={thCls}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <td className={tdCls}>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-bold text-gray-800 dark:text-gray-100">{u.name}</span>
                            </div>
                          </td>
                          <td className={tdCls}>{u.email}</td>
                          <td className={tdCls}>
                            <span className={`px-2 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                              u.role === "admin" ? "bg-red-50 dark:bg-red-500/10 text-red-500"
                              : u.role === "owner" ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500"
                              : "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className={tdCls}>{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td className={tdCls}>
                            {u.role !== "admin" && (
                              <button onClick={() => handleDeleteUser(u._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── PGs TAB ── */}
            {tab === "PGs" && (
              <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">All PGs <span className="text-gray-400 font-medium text-sm ml-2">({pgs.length})</span></h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className={thCls}>PG Name</th>
                        <th className={thCls}>Location</th>
                        <th className={thCls}>Price</th>
                        <th className={thCls}>Gender</th>
                        <th className={thCls}>Owner</th>
                        <th className={thCls}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {pgs.map(p => (
                        <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <td className={tdCls + " font-bold text-gray-800 dark:text-gray-100"}>{p.name}</td>
                          <td className={tdCls}>
                            <span className="flex items-center gap-1"><MapPin size={13} className="text-orange-400" />{p.location}</span>
                          </td>
                          <td className={tdCls + " font-black text-orange-500"}>₹{p.price}</td>
                          <td className={tdCls}>
                            <span className={`px-2 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                              p.gender === "Boys" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-500"
                              : p.gender === "Girls" ? "bg-pink-50 dark:bg-pink-500/10 text-pink-500"
                              : "bg-purple-50 dark:bg-purple-500/10 text-purple-500"
                            }`}>{p.gender}</span>
                          </td>
                          <td className={tdCls}>{p.ownerId?.name || <span className="italic text-gray-400">Unassigned</span>}</td>
                          <td className={tdCls}>
                            <button onClick={() => handleDeletePG(p._id)} className="p-2 rounded-xl text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── BOOKINGS TAB ── */}
            {tab === "Bookings" && (
              <div className="bg-white dark:bg-gray-900 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <h2 className="text-lg font-black text-gray-800 dark:text-gray-100">All Bookings <span className="text-gray-400 font-medium text-sm ml-2">({bookings.length})</span></h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                      <tr>
                        <th className={thCls}>Guest</th>
                        <th className={thCls}>PG</th>
                        <th className={thCls}>Move-in</th>
                        <th className={thCls}>Mobile</th>
                        <th className={thCls}>Workplace</th>
                        <th className={thCls}>Amount</th>
                        <th className={thCls}>Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {bookings.map(b => (
                        <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                          <td className={tdCls}>
                            <div className="font-bold text-gray-800 dark:text-gray-100">{b.user?.name || "—"}</div>
                            <div className="text-xs text-gray-400">{b.user?.email}</div>
                          </td>
                          <td className={tdCls}>
                            <div className="font-bold text-orange-500">{b.pg?.name || "—"}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={11} />{b.pg?.location}</div>
                          </td>
                          <td className={tdCls}>{new Date(b.checkInDate).toLocaleDateString()}</td>
                          <td className={tdCls}>
                            <span className="flex items-center gap-1"><Phone size={13} className="text-orange-400" />{b.mobile || "—"}</span>
                          </td>
                          <td className={tdCls}>
                            <span className="flex items-center gap-1"><Briefcase size={13} className="text-orange-400" />{b.workplace || "—"}</span>
                          </td>
                          <td className={tdCls + " font-black text-green-500"}>₹{b.totalPrice || 0}</td>
                          <td className={tdCls}>
                            <span className="px-2 py-1 rounded-full text-xs font-black bg-green-50 dark:bg-green-500/10 text-green-500 uppercase tracking-widest">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
