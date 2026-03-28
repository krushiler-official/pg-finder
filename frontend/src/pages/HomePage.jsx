import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import PGCard from "../components/PGCard";

const HomePage = () => {
  const [pgs, setPgs] = useState([]);

  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const { data } = await api.get("/pgs");
        setPgs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPGs();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-500 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image and Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=2070"
            alt="Premium Student Living"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          {/* Main Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-gray-950 dark:via-gray-950/80 dark:to-transparent z-10"></div>
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="max-w-4xl py-12">
            <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-orange-200 dark:border-orange-500/20 mb-10 transition-all hover:translate-x-2">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em]">Ahmedabad's Premium PG Network</span>
            </div>

            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] mb-8 text-gray-900 dark:text-gray-50 tracking-tighter drop-shadow-sm">
              Find your <br />
              <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent italic pl-1">Ideal Stay.</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-12 text-xl md:text-2xl font-semibold leading-relaxed max-w-2xl">
              Verified premium stays in Ahmedabad. Experience modern comfort,
              safety, and community in the city's best locations.
            </p>

            <div className="flex flex-wrap items-center gap-10">
              <Link to="/search">
                <button className="relative group overflow-hidden bg-gray-950 dark:bg-orange-500 text-white px-14 py-6 rounded-[2.5rem] text-lg font-black shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-500/40 active:scale-95 uppercase tracking-widest leading-none">
                  <span className="relative z-10">Explore Spaces</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
              </Link>

              <div className="flex items-center gap-5 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm p-3 rounded-3xl border border-white/50 dark:border-gray-800">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-xl transition-transform hover:scale-110 hover:z-20">
                      <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="border-l border-gray-300 dark:border-gray-700 pl-5">
                  <p className="text-lg font-black text-gray-900 dark:text-gray-100 tracking-tight leading-none mb-1">2,400+</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest whitespace-nowrap">Active Residents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-6 py-32 border-t border-gray-50 dark:border-gray-900">
        <div className="flex items-end justify-between mb-20">
          <div>
            <h2 className="text-6xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
              Popular <span className="bg-gradient-to-r from-vibrantOrange to-vibrantYellow bg-clip-text text-transparent">Listings</span>
            </h2>
            <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Handpicked accommodations for you</p>
          </div>
          <Link to="/search" className="text-vibrantOrange font-black uppercase tracking-widest text-xs border-b-2 border-vibrantOrange pb-1 hover:tracking-[0.4em] transition-all duration-500">
            View All PGs
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {pgs.slice(0, 6).map((pg) => (
            <PGCard key={pg._id} pg={pg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;