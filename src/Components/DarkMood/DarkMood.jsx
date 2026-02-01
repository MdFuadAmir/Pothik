import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const DarkMood = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="
        px-3 py-2 rounded-full
        bg-white dark:bg-slate-900
        text-gray-800 dark:text-gray-200
        border border-gray-200 dark:border-slate-800
        flex items-center gap-2
        transition-all duration-300
        hover:bg-gray-100 dark:hover:bg-slate-800
      "
    >
      {theme === "dark" ? <CiLight size={22} /> : <MdDarkMode size={20} />}
    </button>
  );
};

export default DarkMood;
