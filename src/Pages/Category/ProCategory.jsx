import queryString from "query-string";
import { useLocation, useNavigate, useSearchParams } from "react-router";

const categories = [
  { title: "All" },
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

  const activeCategory = params.get("category") || "All";

  const handleClick = (categoryTitle) => {
    const currentQuery = queryString.parse(location.search);

    if (categoryTitle === "All") {
      delete currentQuery.category;
    } else {
      currentQuery.category = categoryTitle;
    }

    const url = queryString.stringifyUrl({
      url: "/products",
      query: currentQuery,
    });

    navigate(url);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-5xl mx-auto">
      {categories.map((categorie) => {
        const isActive = activeCategory === categorie.title;

        return (
          <button
            key={categorie.title}
            onClick={() => handleClick(categorie.title)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium
              transition backdrop-blur
              ${
                isActive
                  ? "bg-primary/20 dark:bg-indigo-500/70 text-primary dark:text-indigo-100"
                  : "bg-white/20 dark:bg-gray-950/50 text-gray-700 dark:text-gray-200 hover:bg-white/30"
              }
            `}
          >
            {categorie.title}
          </button>
        );
      })}
    </div>
  );
};

export default ProCategory;
