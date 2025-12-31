import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to send message");
      }

      return res.json();
    },

    onSuccess: () => {
      setFormData({ name: "", email: "", message: "" });
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 dark:text-white">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Get in Touch</h2>
          <p className="text-gray-600 mb-3 dark:text-gray-300">
            Have any questions? Our team is ready to help you anytime.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <FiMapPin size={24} className="text-blue-600 dark:text-white" />
              <div>
                <p className="font-medium dark:text-white">Address</p>
                <p className="text-gray-600 dark:text-gray-400">Kushtia, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone size={24} className="text-blue-600 dark:text-white" />
              <div>
                <p className="font-medium dark:text-white">Phone</p>
                <p className="text-gray-600 dark:text-gray-400">+880 1705470131</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMail size={24} className="text-blue-600 dark:text-white" />
              <div>
                <p className="font-medium dark:text-white">Email</p>
                <p className="text-gray-600 dark:text-gray-400">mdfuadamir@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Send us a Message</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="w-full border p-2 rounded dark:border-white dark:placeholder-gray-500 dark:text-white"
              placeholder="Enter your name"
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border p-2 rounded dark:border-white dark:placeholder-gray-500 dark:text-white"
              placeholder="Enter your email"
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border p-2 rounded dark:border-white dark:placeholder-gray-500 dark:text-white"
              placeholder="Write your message..."
              required
            ></textarea>

            <button
              disabled={contactMutation.isPending}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </button>

            {/* Success Message */}
            {contactMutation.isSuccess && (
              <p className="text-green-600 text-sm mt-2">
                ✅ Message sent successfully
              </p>
            )}

            {/* Error Message */}
            {contactMutation.isError && (
              <p className="text-red-600 text-sm mt-2">
                ❌ {contactMutation.error.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
