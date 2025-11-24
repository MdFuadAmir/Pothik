import { FiTruck, FiCheckCircle, FiMessageCircle } from "react-icons/fi";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        About Us
      </h1>

      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">

        <img
          src="https://i.ibb.co.com/BH7J0jGk/asf.png"
          alt="team"
          className="rounded-lg shadow"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-7">
            Pothik is a modern e-commerce platform providing high-quality 
            products at the best prices. We started with a vision 
            to make online shopping easier, faster, and more reliable.
          </p>

          <p className="text-gray-600 mt-4 leading-7">
            Our mission is to provide excellent products with fast delivery,
            secure payment, and trusted customer support.
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <div className="p-6 bg-white shadow rounded flex items-start gap-4">
          <FiTruck size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Fast Delivery</h3>
            <p className="text-gray-600">
              We ensure safe delivery to your doorstep.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white shadow rounded flex items-start gap-4">
          <FiCheckCircle size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Trusted Products</h3>
            <p className="text-gray-600">
              All products are verified and quality checked.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white shadow rounded flex items-start gap-4">
          <FiMessageCircle size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1">Support 24/7</h3>
            <p className="text-gray-600">
              Our team is always ready to help you.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default About;
