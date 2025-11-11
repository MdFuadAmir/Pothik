import { FaShoppingBag, FaBoxOpen, FaShippingFast, FaTools } from "react-icons/fa";

const HowItWork = () => {
  const steps = [
    { role: "User", action: "Browse & Order", icon: <FaShoppingBag className="text-indigo-600 text-5xl mb-4" /> },
    { role: "Seller", action: "List Products", icon: <FaBoxOpen className="text-green-600 text-5xl mb-4" /> },
    { role: "Rider", action: "Deliver Safely", icon: <FaShippingFast className="text-yellow-500 text-5xl mb-4" /> },
    { role: "Admin", action: "Manage Everything", icon: <FaTools className="text-pink-600 text-5xl mb-4" /> },
  ];

  return (
    <section className="px-4 py-12">
      <div className="mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 mb-10">
          Use our service in 4 simple steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center bg-linear-to-bl from-gray-200 to-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-indigo-950">{step.role}</h3>
              <p className="text-gray-500 mt-2">{step.action}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;