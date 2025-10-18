import React, { useState } from "react";
import Swal from "sweetalert2";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: send formData to backend API
    console.log(formData);
    Swal.fire("Success", "Your message has been sent!", "success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-indigo-200 p-4">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          sectionTitle={"Contact Us"}
          sectionSubTitle={
            "Have questions or want to reach out? Fill out the form below or find our contact info."
          }
        ></SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiMapPin className="text-indigo-600 text-2xl" />
              <p>123 Main Street, Dhaka, Bangladesh</p>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-indigo-600 text-2xl" />
              <p>+880 1234 567890</p>
            </div>
            <div className="flex items-center gap-4">
              <FiMail className="text-indigo-600 text-2xl" />
              <p>support@shopparcel.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-indigo-950 text-white p-6 rounded-xl shadow space-y-4"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
