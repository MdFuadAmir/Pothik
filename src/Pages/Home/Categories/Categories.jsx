import {
  FaTshirt,
  FaLaptop,
  FaLeaf,
  FaHeart,
  FaHome,
  FaFutbol,
  FaBaby,
  FaBook,
  FaCar,
  FaMobileAlt,
  FaGem,
  FaPaw,
} from "react-icons/fa";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

const Categories = () => {
    const categories = [
  {
    name: "Fashion",
    icon: <FaTshirt className="text-4xl text-blue-500" />,
    description: "Trendy clothes, shoes & accessories.",
  },
  {
    name: "Electronics",
    icon: <FaLaptop className="text-4xl text-green-500" />,
    description: "Latest gadgets & devices.",
  },
  {
    name: "Groceries",
    icon: <FaLeaf className="text-4xl text-yellow-500" />,
    description: "Fresh groceries delivered to you.",
  },
  {
    name: "Beauty & Health",
    icon: <FaHeart className="text-4xl text-pink-500" />,
    description: "Cosmetics & wellness products.",
  },
  {
    name: "Home & Living",
    icon: <FaHome className="text-4xl text-purple-500" />,
    description: "Furniture & home essentials.",
  },
  {
    name: "Sports & Fitness",
    icon: <FaFutbol className="text-4xl text-red-500" />,
    description: "Gear for active lifestyle.",
  },
  {
    name: "Toys & Baby",
    icon: <FaBaby className="text-4xl text-pink-400" />,
    description: "Safe & fun toys for kids.",
  },
  {
    name: "Books & Stationery",
    icon: <FaBook className="text-4xl text-indigo-500" />,
    description: "Books, pens & office supplies.",
  },
  {
    name: "Automotive",
    icon: <FaCar className="text-4xl text-gray-700" />,
    description: "Car accessories & tools.",
  },
  {
    name: "Mobile & Accessories",
    icon: <FaMobileAlt className="text-4xl text-teal-500" />,
    description: "Smartphones & gadgets.",
  },
  {
    name: "Jewelry & Watches",
    icon: <FaGem className="text-4xl text-yellow-600" />,
    description: "Elegant accessories for you.",
  },
  {
    name: "Pet Supplies",
    icon: <FaPaw className="text-4xl text-orange-500" />,
    description: "Everything for your pets.",
  },
];

    return (
        <section className="py-8 p-4">
      <SectionTitle sectionTitle={'Categories'} sectionSubTitle={'Discover a variety of categories tailored for every need.'}></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-indigo-950 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <div className="mb-4">{cat.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{cat.name}</h3>
            <p className="text-gray-500 text-center text-sm">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default Categories;

// 2. Featured Categories / Popular Products

// ৪–৬টা প্রোডাক্ট ক্যাটাগরি (Fashion, Electronics, Groceries ইত্যাদি)।

// User যেন দ্রুত বুঝতে পারে কী কী পাওয়া যায়।