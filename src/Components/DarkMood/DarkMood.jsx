// import { useEffect, useState } from "react";
// import { MdDarkMode } from "react-icons/md";
// import { CiLight } from "react-icons/ci";

// const DarkMood = () => {
//   const [theme,setTheme] = useState("light");
//   const toggleThele = () =>{
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark",newTheme === "dark");
//     localStorage.setItem("theme",newTheme);
//   }
//   useEffect(()=>{
//     const storedTheme = localStorage.getItem("theme",) || "light";
//     setTheme(storedTheme);
//     document.documentElement.classList.toggle("dark",storedTheme === "dark")

//   },[])

//   return (
//      <button
//       onClick={toggleThele}
//       className="px-8 py-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold flex items-center justify-center space-x-2
//                  transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg"
//     >
//       <div className="transform transition-transform duration-500 ease-in-out">
//         {toggleThele ? <CiLight size={24} /> : <MdDarkMode size={24} />}
//       </div>
//       <span className="transition-colors duration-500 ease-in-out">
//         {toggleThele ? "Light Mode" : "Dark Mode"}
//       </span>
//     </button>
//   );
// };

// export default DarkMood;

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
      className="px-4 py-2 rounded-full 
                 bg-gray-300 dark:bg-gray-900 
                 text-gray-800 dark:text-gray-200 
                 font-semibold flex items-center gap-2
                 transition-all duration-500 ease-in-out 
                 hover:scale-105 hover:shadow-lg ml-2"
    >
      <div className="transition-transform duration-500">
        {theme === "dark" ? <CiLight size={24} /> : <MdDarkMode size={24} />}
      </div>
    </button>
  );
};

export default DarkMood;
