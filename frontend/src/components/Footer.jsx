import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors duration-500">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-black text-orange-500 mb-6 block">
              PG Finder
            </Link>
            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
              Revolutionizing student living in Ahmedabad with verified spaces and seamless experiences.
            </p>
            <div className="flex gap-4">
              {/* Simple Social Icons */}
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors cursor-pointer">TW</div>
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors cursor-pointer">LI</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100 mb-8">Explore</h4>
            <ul className="space-y-4">
              <li><Link to="/search" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold">Search PGs</Link></li>
              <li><Link to="/compare" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold">Compare Options</Link></li>
              <li><Link to="/search?gender=Girls" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold">Girls PGs</Link></li>
              <li><Link to="/search?gender=Boys" className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold">Boys PGs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100 mb-8">Company</h4>
            <ul className="space-y-4">
              <li><span className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold cursor-pointer">About Us</span></li>
              <li><span className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold cursor-pointer">Contact</span></li>
              <li><span className="text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors font-bold cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 dark:text-gray-100 mb-8">Newsletter</h4>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">Get updates on new premium listings.</p>
            <div className="flex bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
              <input type="email" placeholder="Email" className="bg-transparent outline-none px-4 py-2 w-full text-sm dark:text-white" />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-orange-600">Join</button>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-[10px]">
            © 2025 PG Finder • Final Year Project
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-gray-400 hover:text-orange-500 cursor-pointer font-black uppercase tracking-widest">Site Map</span>
            <span className="text-[10px] text-gray-400 hover:text-orange-500 cursor-pointer font-black uppercase tracking-widest">Help Center</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;