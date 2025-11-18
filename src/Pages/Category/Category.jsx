const categories = [
  { title: "Electronics", img: "https://i.ibb.co.com/BH7J0jGk/asf.png" },
  { title: "Mobile Phones", img: "https://i.ibb.co.com/BH7J0jGk/asf.png" },
  { title: "Fashion", img: "https://i.ibb.co.com/BH7J0jGk/asf.png" },
  { title: "Home Appliances", img: "https://i.ibb.co.com/BH7J0jGk/asf.png" },
  { title: "Grocery", img: "https://i.ibb.co.com/BH7J0jGk/asf.png" },
  { title: "Beauty", img: "https://i.ibb.co/H7SZZqC/beauty.png" },
  { title: "Baby Products", img: "https://i.ibb.co/xzwWqDn/baby.png" },
  { title: "Men's Wear", img: "https://i.ibb.co/VjqqhT1/men.png" },
  { title: "Women's Wear", img: "https://i.ibb.co/vPPVshP/women.png" },
  { title: "Computers", img: "https://i.ibb.co/NrKB4zv/computer.png" },
  { title: "Kitchen", img: "https://i.ibb.co/W58CwFw/kitchen.png" },
  { title: "Sports", img: "https://i.ibb.co/LJhD1nD/sports.png" },
  { title: "Shoes", img: "https://i.ibb.co/pxGhZVH/shoes.png" },
  { title: "Watches", img: "https://i.ibb.co/FxLPtQH/watch.png" },
  { title: "Bags", img: "https://i.ibb.co/Vxr3Vpb/bag.png" },
  { title: "Gaming", img: "https://i.ibb.co/1r7jWrM/gaming.png" },
];

const Category = () => {
    return (
        <div className="mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {categories.map((cat, index) => (
          <div
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