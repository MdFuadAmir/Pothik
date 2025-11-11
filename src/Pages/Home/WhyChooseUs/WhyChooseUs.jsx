import { FaShippingFast, FaShoppingCart, FaLock, FaHeadset } from "react-icons/fa";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

// 🔹 JSON data (array of objects)
const serviceData = [
  {
    id: 1,
    icon: <FaShippingFast className="text-5xl text-yellow-400 mb-4" />,
    title: "Fast Delivery",
    description: "Quick and reliable parcel delivery services.",
  },
  {
    id: 2,
    icon: <FaShoppingCart className="text-5xl text-pink-400 mb-4" />,
    title: "Easy Shopping",
    description: "Shop conveniently with a smooth experience.",
  },
  {
    id: 3,
    icon: <FaLock className="text-5xl text-green-400 mb-4" />,
    title: "Secure Payment",
    description: "Safe and encrypted payment methods.",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-5xl text-blue-400 mb-4" />,
    title: "24/7 Support",
    description: "Always here to help you anytime, anywhere.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <SectionTitle
          sectionTitle="Why Choose Us"
          sectionSubTitle="Our services are designed to provide the best experience for you."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          {serviceData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition-all duration-300 bg-linear-to-br from-gray-200  to-gray-100"
            >
              {item.icon}
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className=" mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
