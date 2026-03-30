import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { ChevronLeft, ChevronRight, Calendar, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const PGDetailPage = () => {
  const { id } = useParams();
  const [pg, setPg] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  
  // Booking State
  const { userInfo } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const { data } = await api.get(`/pgs/${id}`);
        setPg(data);
        setActiveImage(0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPG();
  }, [id]);

  if (!pg)
    return (
      <div className="flex items-center justify-center min-h-screen text-orange-500 font-bold text-lg animate-pulse">
        Loading PG Details...
      </div>
    );

  const imagesArray =
    pg.images?.length
      ? pg.images
      : pg.image
        ? [pg.image]
        : ["/no-image.jpg"];

  const nextImage = () => {
    if (activeImage < imagesArray.length - 1) {
      setActiveImage((prev) => prev + 1);
    }
  };

  const prevImage = () => {
    if (activeImage > 0) {
      setActiveImage((prev) => prev - 1);
    }
  };

  const handleBookPG = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error("Please login to book a PG");
      return;
    }
    if (!bookingDate) {
      toast.error("Please select a move-in date");
      return;
    }
    if (!mobile) {
      toast.error("Please enter your mobile number");
      return;
    }
    if (!workplace) {
      toast.error("Please enter your workplace");
      return;
    }

    try {
      setIsBooking(true);
      const { data } = await api.post("/bookings", {
        pgId: pg._id,
        userId: userInfo._id,
        checkInDate: bookingDate,
        totalPrice: pg.price,
        mobile,
        workplace,
      });
      toast.success("PG Booked Successfully!");
      setIsModalOpen(false);
      setBookingDate("");
      setMobile("");
      setWorkplace("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-start">

        {/* ================= LEFT: IMAGE SECTION ================= */}
        <div className="space-y-6">

          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src={imagesArray[activeImage]}
              alt={pg.name}
              onError={(e) => (e.target.src = "/no-image.jpg")}
              className="w-full h-[480px] object-cover"
            />

            <button
              onClick={prevImage}
              disabled={activeImage === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-md transition ${activeImage === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:scale-110"
                }`}
            >
              <ChevronLeft className="text-orange-500" size={22} />
            </button>

            <button
              onClick={nextImage}
              disabled={activeImage === imagesArray.length - 1}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 shadow-md transition ${activeImage === imagesArray.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:scale-110"
                }`}
            >
              <ChevronRight className="text-orange-500" size={22} />
            </button>

            <div className="absolute top-5 left-5 bg-orange-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
              Premium Stay
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto">
            {imagesArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onError={(e) => (e.target.src = "/no-image.jpg")}
                onClick={() => setActiveImage(index)}
                className={`h-20 w-28 object-cover rounded-xl cursor-pointer transition border-2 ${activeImage === index
                    ? "border-orange-500 scale-105"
                    : "border-transparent hover:border-orange-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT: INFO SECTION ================= */}
        <div className="space-y-10">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-xs font-semibold">
                {pg.gender} PG
              </span>
              <span className="bg-gray-500/10 text-gray-400 px-3 py-1 rounded-lg text-xs font-semibold">
                {pg.city || "Ahmedabad"}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-3">
              {pg.name}
            </h1>

            <p className="text-gray-400 text-lg">
              📍 {pg.location} • {pg.area}
            </p>
          </div>

          {/* Price Card */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-lg">
            <div className="flex items-end gap-3 mb-6">
              <span className="text-5xl font-bold text-orange-500">
                ₹{pg.price}
              </span>
              <span className="text-gray-400 text-sm font-medium">
                / month
              </span>
            </div>

            <button 
              onClick={() => {
                if (!userInfo) {
                  toast.error("Please login to book a PG");
                  return;
                }
                setIsModalOpen(true);
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold text-lg transition duration-300 shadow-md hover:shadow-orange-500/40"
            >
              Book PG
            </button>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">
              ✨ Exclusive Amenities
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {pg.amenities?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-orange-500/40 transition"
                >
                  <span className="text-gray-300 font-medium">
                    • {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOOKING MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="bg-orange-50 dark:bg-orange-500/10 p-6 flex justify-between items-center border-b border-orange-100 dark:border-orange-500/20">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Book Your Stay</h3>
                <p className="text-orange-600 dark:text-orange-400 text-sm font-semibold">{pg.name}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-orange-200/50 dark:hover:bg-orange-500/20 transition-colors"
              >
                <X className="text-orange-500" size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleBookPG} className="p-6 space-y-6">
              
              {/* User Info (Read Only) */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={userInfo?.name || ""} 
                    disabled 
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={userInfo?.email || ""} 
                    disabled 
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-300 font-medium cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-100 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Workplace / College</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Infosys, Mumbai University"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value)}
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-700 dark:text-gray-100 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Select Move-in Date</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Calendar className="text-orange-500" size={18} />
                  </div>
                  <input 
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]} // Prevent past dates
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-100 font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Total Price display */}
              <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Total Price / month</span>
                <span className="text-xl font-black text-orange-500">₹{pg.price}</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isBooking}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex justify-center items-center"
              >
                {isBooking ? "Confirming..." : "Confirm Booking"}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PGDetailPage;