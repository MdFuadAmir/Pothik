

// const AboutUs = () => {
//     return (
//     <div className="py-12 px-4 md:px-16 bg-gray-50">
//       <div className="max-w-5xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-indigo-900 mb-4">
//           About Our Platform
//         </h2>
//         <p className="text-lg text-gray-700 mb-8">
//           Welcome to <span className="font-semibold text-indigo-600">Shop & Parcel</span>, your one-stop solution for both e-commerce and reliable parcel delivery services. We combine a seamless shopping experience with an efficient delivery system, ensuring your products reach your doorstep safely and on time.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
//           <div>
//             <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Our Mission</h3>
//             <p className="text-gray-700">
//               To provide a secure, fast, and user-friendly platform where sellers can showcase their products, customers can shop conveniently, and parcels are delivered reliably by trained riders.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Our Vision</h3>
//             <p className="text-gray-700">
//               To become the leading integrated e-commerce and delivery solution in the region, connecting users, sellers, and riders efficiently while ensuring trust and transparency.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Our Values</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               <li>Customer Satisfaction</li>
//               <li>Integrity & Transparency</li>
//               <li>Efficiency & Reliability</li>
//               <li>Innovation & Growth</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold text-indigo-800 mb-2">Who We Serve</h3>
//             <p className="text-gray-700">
//               Our platform serves four types of users: Customers who shop online, Sellers who manage their products, Riders who handle parcel deliveries, and Admins who oversee the system operations.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     );
// };

// export default AboutUs;

import React from "react";
import { FaUsers, FaShippingFast, FaBullseye, FaHandsHelping } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">
          About <span className="text-indigo-600">Shop & Parcel</span>
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          Your one-stop solution for seamless online shopping and reliable parcel delivery. Connecting sellers, customers, and riders efficiently.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mission */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaBullseye className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-700 text-sm">
              Provide a secure, fast, and user-friendly platform for sellers, customers, and riders.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaShippingFast className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-700 text-sm">
              Become the leading integrated e-commerce & parcel delivery solution in the region.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaHandsHelping className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
            <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
              <li>Customer Satisfaction</li>
              <li>Integrity & Transparency</li>
              <li>Efficiency & Reliability</li>
              <li>Innovation & Growth</li>
            </ul>
          </div>

          {/* Who We Serve */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <FaUsers className="text-indigo-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Who We Serve</h3>
            <p className="text-gray-700 text-sm">
              Customers, Sellers, Riders, and Admins – each with a seamless, role-based experience.
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
