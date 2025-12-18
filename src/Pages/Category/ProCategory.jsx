import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const categories = [
  { title: "Electronics" },
  { title: "Mobiles" },
  { title: "Fashion" },
  { title: "Home" },
  { title: "Grocery" },
  { title: "Beauty" },
  { title: "Baby" },
  { title: "Men's" },
  { title: "Women's" },
  { title: "Computers" },
  { title: "Kitchen" },
  { title: "Sports" },
  { title: "Shoes" },
  { title: "Watches" },
  { title: "Bags" },
  { title: "Gaming" },
];

const ProCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const category = params.get("category");
  const isMobile = window.innerWidth < 768;
  const [showCategories, setShowCategories] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowCategories(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (categoryTitle) => {
    const currentQuery = queryString.parse(location.search);
    const updatedQuery = {
      ...currentQuery,
      category: categoryTitle,
    };
    const url = queryString.stringifyUrl({
      url: "/products",
      query: updatedQuery,
    });

    navigate(url);
    if (window.innerWidth < 768) {
      setShowCategories(false);
    }
  };
  return (
    <div className="md:border-r p-4 w-full">
      <button
        onClick={() => setShowCategories(!showCategories)}
        className="px-4 py-2 w-full justify-between text-sm border overflow-hidden rounded flex items-center gap-2"
      >
        All Categories
        {showCategories ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {showCategories && (
        <div className="mt-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              onClick={() => handleClick(cat.title)}
              role="button"
              className={`flex flex-col p-2 rounded-lg cursor-pointer transition
                ${category === cat.title ? "bg-gray-300" : "hover:bg-gray-100"}
              `}
            >
              <span className="text-sm">{cat.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProCategory;
