import { useApp } from "../context/AppContext";
import PGCard from "../components/PGCard";

const DashboardPage = () => {
  const { wishlist } = useApp();

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen p-10 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-8">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No saved PGs yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map(pg => (
            <PGCard key={pg._id} pg={pg} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;