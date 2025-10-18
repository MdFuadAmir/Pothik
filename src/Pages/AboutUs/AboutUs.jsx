import {
  FaUsers,
  FaShippingFast,
  FaBullseye,
  FaHandsHelping,
} from "react-icons/fa";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";

const AboutUs = () => {
  return (
    <div className="p-4 bg-indigo-200">
      <div className="text-center">
        {/* Hero Section */}
        <SectionTitle sectionTitle={'About Shop & Parcel'} sectionSubTitle={`Your one-stop solution for seamless. online shopping and reliable
          parcel delivery. Connecting sellers, customers, and riders
          efficiently`}></SectionTitle>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mission */}
          <div className="bg-indigo-950 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaBullseye className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Our Mission</h3>
            <p className="text-gray-300 text-sm">
              Provide a secure, fast, and user-friendly platform for sellers,
              customers, and riders.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-indigo-950 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaShippingFast className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Our Vision</h3>
            <p className="text-gray-300 text-sm">
              Become the leading integrated e-commerce & parcel delivery
              solution in the region.
            </p>
          </div>

          {/* Values */}
          <div className="bg-indigo-950 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaHandsHelping className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Our Values</h3>
            <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
              <li>Customer Satisfaction</li>
              <li>Integrity & Transparency</li>
              <li>Efficiency & Reliability</li>
              <li>Innovation & Growth</li>
            </ul>
          </div>

          {/* Who We Serve */}
          <div className="bg-indigo-950 p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaUsers className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2 text-white">Who We Serve</h3>
            <p className="text-gray-300 text-sm">
              Customers, Sellers, Riders, and Admins – each with a seamless,
              role-based experience.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-12">
          <p className="text-gray-800 text-lg mb-4">
            Join us today and experience the future of e-commerce & delivery!
          </p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
