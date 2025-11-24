import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 shadow rounded-lg">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-3">
            Have any questions? Our team is ready to help you anytime.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3">
              <FiMapPin size={24} className="text-blue-600" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-600">Kushtia, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiPhone size={24} className="text-blue-600" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+880 1705470131</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMail size={24} className="text-blue-600" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">mdfuadamir@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full border p-2 rounded mt-1"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;


