import queryString from "query-string";
import { useNavigate } from "react-router";

const categories = [
  { title: "Electronics", img: "https://i.ibb.co.com/DHHYdB8k/IRON21443597576-1.jpg" },
  { title: "Mobiles", img: "https://i.ibb.co.com/Wv9FMznp/795330468202408120724.jpg" },
  { title: "Fashion", img: "https://i.ibb.co.com/Z1MjDqHj/360-F-1562359812-64hm3-Wty-OZ56gdd4-Gbh-MNj-BKfv4p-YEw-I.jpg" },
  { title: "Home", img: "https://i.ibb.co.com/7xk9s7FM/download-5.jpg" },
  { title: "Grocery", img: "https://i.ibb.co.com/8gnXkP96/istockphoto-1328853722-612x612.jpg" },
  { title: "Beauty", img: "https://i.ibb.co.com/rfxJQgHY/images.jpg" },
  { title: "Baby", img: "https://i.ibb.co.com/7Nx49f0Y/cute-accessories-newborn-babies-vector-illustrations-set-778687-1299.jpg" },
  { title: "Men's", img: "https://i.ibb.co.com/272Wg4GC/istockphoto-638385938-612x612.jpg" },
  { title: "Women's", img: "https://i.ibb.co.com/Tqchvg9B/stock-vector-patch-of-fashion-accessories-woman-items-and-accessories-collection-of-bags-shoes-high.jpg" },
  { title: "Computers", img: "https://i.ibb.co.com/8L6DR4c1/images-1.jpg" },
  { title: "Kitchen", img: "https://i.ibb.co.com/Qjn5gBB4/download-4.jpg" },
  { title: "Sports", img: "https://i.ibb.co.com/391Hcq9m/download.jpg" },
  { title: "Shoes", img: "https://i.ibb.co.com/0RwJqwQg/download-1.jpg" },
  { title: "Watches", img: "https://i.ibb.co.com/tM1QqJFB/download-2.jpg" },
  { title: "Bags", img: "https://i.ibb.co.com/bgSkgyp5/1d653ee1570f9de8f41974d758d4fc2f-jpg-720x720q80.jpg" },
  { title: "Gaming", img: "https://i.ibb.co.com/TBsyJBqh/download-3.jpg" },
];

const Category = () => {
  const navigate = useNavigate();
  const handleClick = (title) => {
    const url = queryString.stringifyUrl({
      url: "/products",
      query: { category: title },
    });
    navigate(url)
  };
  return (
    <div className="mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {categories.map((cat, index) => (
          <div
          onClick={()=>handleClick(cat.title)}
            key={index}
            className="flex flex-col items-center p-3 bg-white shadow rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-16 h-16 object-contain mb-2 rounded"
            />
            <p className="text-sm text-center font-medium">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
