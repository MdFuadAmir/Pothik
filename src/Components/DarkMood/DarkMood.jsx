import { useEffect, useState } from "react";
import { FaImage, FaRegImage } from "react-icons/fa";
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
       text-sky-500 fixed bottom-24 right-4 z-50
    flex items-center justify-center
    w-12 h-12
    rounded-full
    bg-white dark:bg-gray-900/70
    backdrop-blur-md
    shadow-lg shadow-black/20
    hover:scale-110 hover:shadow-xl
    transition-all
      "
    >
      {theme === "dark" ? <FaImage size={22} /> : <FaRegImage size={20} />}
    </button>
  );
};

export default DarkMood;
