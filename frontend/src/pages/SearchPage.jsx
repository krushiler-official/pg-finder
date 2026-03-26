import { useEffect, useState } from "react";
import axios from "axios";
import PGCard from "../components/PGCard";
import FilterPanel from "../components/FilterPanel";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const [pgs, setPgs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    gender: "",
  });

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const loc = query.get("location");
    if (loc) setFilters(prev => ({ ...prev, location: loc }));
  }, [location.search]);

  useEffect(() => {
    const fetchPGs = async () => {
      const { data } = await axios.get("http://localhost:5000/api/pgs");
      setPgs(data);
    };
    fetchPGs();
  }, []);

  const filtered = pgs.filter(pg =>
    (!filters.location || pg.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (!filters.price || pg.price <= filters.price) &&
    (!filters.gender || pg.gender === filters.gender)
  );

  const uniqueAreas = [...new Set(pgs.map(pg => pg.area))].filter(Boolean);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        <div className="md:sticky md:top-24 h-fit">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        <div className="md:col-span-3 grid md:grid-cols-2 gap-6">
          {filtered.map(pg => (
            <PGCard key={pg._id} pg={pg} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default SearchPage;