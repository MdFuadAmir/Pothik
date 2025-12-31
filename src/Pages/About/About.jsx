import {
  FiTruck,
  FiCheckCircle,
  FiMessageCircle,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import happy from "../../assets/happy.png";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 dark:text-white">
        About Us
      </h1>

      {/* Who We Are */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://i.ibb.co.com/BH7J0jGk/asf.png"
          alt="team"
          className="rounded-lg shadow-2xl"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-7 dark:text-gray-300">
            <span className="font-semibold text-blue-500">Pothik</span> is a
            modern and trusted e-commerce platform dedicated to providing
            high-quality products at affordable prices. We started our journey
            with one goal — to make online shopping simple, secure, and
            enjoyable for everyone.
          </p>

          <p className="text-gray-600 mt-4 leading-7 dark:text-gray-300">
            From daily essentials to lifestyle products, we carefully select and
            verify each item to ensure the best customer experience.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mt-14">
        <div className="p-6 bg-base-100 shadow rounded dark:bg-gray-800">
          <FiTarget size={32} className="text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Our Mission
          </h3>
          <p className="text-gray-600 leading-7 dark:text-gray-300">
            Our mission is to deliver reliable products with fast delivery,
            secure payment systems, and outstanding customer support while
            building long-term trust with our customers.
          </p>
        </div>

        <div className="p-6 bg-base-100 shadow rounded dark:bg-gray-800">
          <FiAward size={32} className="text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Our Vision
          </h3>
          <p className="text-gray-600 leading-7 dark:text-gray-300">
            We envision Pothik as one of the most customer-centric e-commerce
            platforms, empowering people to shop confidently anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-14">
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-start gap-4">
          <FiTruck size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1 dark:text-white">
              Fast Delivery
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Safe and quick delivery right to your doorstep.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-start gap-4">
          <FiCheckCircle size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1 dark:text-white">
              Trusted Products
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Every product is quality-checked and verified.
            </p>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded flex items-start gap-4">
          <FiMessageCircle size={32} className="text-blue-600" />
          <div>
            <h3 className="text-xl font-semibold mb-1 dark:text-white">
              24/7 Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our support team is always ready to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">
          Meet the Founder
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 bg-base-100 dark:bg-gray-800 shadow rounded p-6">
          <img
            src="https://i.ibb.co.com/sdnRqr8d/1665051423857-min-1.jpg"
            alt="Founder"
            className="w-40 h-40 object-cove rounded-full"
          />

          <div>
            <h3 className="text-xl font-semibold dark:text-white">
              Md Fuad Amir
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-200 mb-3">
              Founder & MERN Stack Developer
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-7">
              Pothik was founded by a passionate developer with a vision to
              build a scalable and user-friendly e-commerce solution. The
              platform is built using modern technologies with performance,
              security, and user experience in mind.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-primary dark:text-white">
            77 +
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Happy Customers
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-primary dark:text-white">
            65 +
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Products</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-primary dark:text-white">
            24/7
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Support</p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-primary dark:text-white">
            99%
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Satisfaction</p>
        </div>
      </div>

      {/* Post Style Section */}
      <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
        <img src={happy} alt="shopping" className="rounded-lg shadow" />

        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Why Customers Love Pothik
          </h2>
          <p className="text-gray-600 leading-7 dark:text-gray-300">
            Customers choose Pothik because we prioritize trust, transparency,
            and convenience. Our platform is designed to ensure a smooth
            shopping experience from browsing to delivery.
          </p>

          <p className="text-gray-600 mt-4 leading-7 dark:text-gray-300">
            We continuously improve our services based on customer feedback to
            serve you better every day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
