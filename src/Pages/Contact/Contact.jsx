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
        headers: { "Content-Type": "application/json" },
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
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-emerald-400">
        Contact
      </h1>

      <div className="grid md:grid-cols-2 gap-8 p-6 rounded-xl bg-gray-900/80 shadow-md">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Get in Touch
          </h2>

          <p className="text-gray-300 ">
            Have any questions? Our team is ready to help you anytime.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <FiMapPin size={24} className="text-emerald-400" />
              <div>
                <p className="font-medium text-white">Address</p>
                <p className="text-gray-300 ">
                  Kushtia, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone size={24} className="text-emerald-400" />
              <div>
                <p className="font-medium text-white">Phone</p>
                <p className="text-gray-300 ">
                  +880 1705470131
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMail size={24} className="text-emerald-400" />
              <div>
                <p className="font-medium text-white">Email</p>
                <p className="text-gray-300 ">
                  mdfuadamir@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-emerald-400">
            Send us a Message
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="
                w-full p-3 rounded-lg
                bg-gray-900/60
                border border-white/10
                text-gray-800 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary/40
              "
              required
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="
                w-full p-3 rounded-lg
                bg-gray-900/60
                border border-white/10
                text-gray-800 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary/40
              "
              required
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message..."
              className="
                w-full p-3 rounded-lg
                bg-gray-900/60
                border border-white/10
                text-gray-800 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-primary/40
              "
              required
            />

            <button
              disabled={contactMutation.isPending}
              className="
                w-full py-3 rounded-xl
                bg-primary text-white font-semibold
                hover:opacity-90 transition
              "
            >
              {contactMutation.isPending ? "Sending..." : "Send Message"}
            </button>

            {contactMutation.isSuccess && (
              <p className="text-green-500 text-sm mt-2">
                ✅ Message sent successfully
              </p>
            )}

            {contactMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
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
