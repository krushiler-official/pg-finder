import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem("darkMode");
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
    const [userInfo, setUserInfo] = useState(null);

    // 🔹 Load saved data on first render
    useEffect(() => {
        const savedCompare = localStorage.getItem("compare");
        const savedWishlist = localStorage.getItem("wishlist");
        const savedUser = localStorage.getItem("userInfo");

        if (savedCompare) setCompareList(JSON.parse(savedCompare));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        if (savedUser) setUserInfo(JSON.parse(savedUser));
    }, []);

    // 🌗 Professional Dark Mode Handling (Improved)
    useEffect(() => {
        const root = window.document.documentElement;

        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    // 🔹 Persist compare list
    useEffect(() => {
        localStorage.setItem("compare", JSON.stringify(compareList));
    }, [compareList]);

    // 🔹 Persist wishlist
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // 🔹 Authentication
    const login = (data) => {
        setUserInfo(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem("userInfo");
        toast.success("Logged out successfully!");
    };

    // 🔹 Compare Logic
    const addToCompare = (pg) => {
        if (compareList.find((item) => item._id === pg._id)) return;

        setCompareList([...compareList, pg]);
    };

    const removeFromCompare = (id) => {
        setCompareList(compareList.filter((pg) => pg._id !== id));
    };

    // 🔹 Wishlist Logic
    const toggleWishlist = (pg) => {
        const exists = wishlist.find((item) => item._id === pg._id);
        if (exists) {
            setWishlist(wishlist.filter((item) => item._id !== pg._id));
        } else {
            setWishlist([...wishlist, pg]);
        }
    };

    // 🌗 Toggle Dark Mode (Improved but Same Behavior)
    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <AppContext.Provider
            value={{
                compareList,
                wishlist,
                darkMode,
                userInfo,
                login,
                logout,
                addToCompare,
                removeFromCompare,
                toggleWishlist,
                toggleDarkMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);