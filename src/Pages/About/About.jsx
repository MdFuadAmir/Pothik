import {
  FiTruck,
  FiCheckCircle,
  FiMessageCircle,
  FiTarget,
  FiAward,
} from "react-icons/fi";
import happy from "../../assets/happy.png";
import logo from "../../assets/pothik.png";
import fuad from "../../assets/fuad.jpeg";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="mx-auto pb-24 pt-8">
      {/* Page Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10  text-sky-400 dark:text-emerald-400">
        About Pothik
      </h1>
      {/* Who We Are */}
      <section className="grid md:grid-cols-2 gap-8 items-center px-4 md:px-10 lg:px-20">
        <img src={logo} alt="team" className="rounded-lg hidden md:block" />
        <div className="p-4 rounded-xl bg-gray-900/80">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-400">
            Who We Are
          </h2>
          <p className="text-gray-200 leading-7">
            <span className="font-semibold text-blue-500">Pothik</span> is a
            modern and trusted e-commerce platform dedicated to providing
            high-quality products at affordable prices. We started our journey
            with one goal — to make online shopping simple, secure, and
            enjoyable for everyone.
          </p>

          <p className="text-gray-200 mt-4 leading-7 ">
            From daily essentials to lifestyle products, we carefully select and
            verify each item to ensure the best customer experience.
          </p>
        </div>
      </section>
      {/* Mission & Vision */}
      <section className="grid md:grid-cols-2 gap-8 my-24 px-4 md:px-10 lg:px-20">
        <div className="p-6 bg-gray-900/80  shadow-md rounded-lg ">
          <FiTarget size={32} className="text-emerald-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-emerald-400">
            Our Mission
          </h3>
          <p className="text-gray-200 leading-7">
            Our mission is to deliver reliable products with fast delivery,
            secure payment systems, and outstanding customer support while
            building long-term trust with our customers.
          </p>
        </div>

        <div className="p-6 bg-gray-900/80  shadow-md rounded-lg ">
          <FiAward size={32} className="text-emerald-400 mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-emerald-400">
            Our Vision
          </h3>
          <p className="text-gray-200 leading-7">
            We envision Pothik as one of the most customer-centric e-commerce
            platforms, empowering people to shop confidently anytime, anywhere.
          </p>
        </div>
      </section>
      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 my-24 px-4 md:px-10 lg:px-20">
        <div className="p-6 bg-gray-900/80  rounded-lg flex items-start gap-4">
          <FiTruck size={32} className="text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold mb-1 text-emerald-400">
              Fast Delivery
            </h3>
            <p className="text-gray-200">
              Safe and quick delivery right to your doorstep.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-900/80 rounded-lg flex items-start gap-4">
          <FiCheckCircle size={32} className="text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold mb-1 text-emerald-400">
              Trusted Products
            </h3>
            <p className="text-gray-200">
              Every product is quality-checked and verified.
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-900/80 rounded-lg flex items-start gap-4">
          <FiMessageCircle size={32} className="text-emerald-400" />
          <div>
            <h3 className="text-xl font-semibold mb-1 text-emerald-400">
              24/7 Support
            </h3>
            <p className="text-gray-200">
              Our support team is always ready to assist you.
            </p>
          </div>
        </div>
      </section>
      {/* Founder Section */}
      <section className="my-24 px-4 md:px-10 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-8 text-emerald-400">
          Meet the Founder
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 shadow-md rounded-xl p-6 bg-gray-900/80">
          {/* Image Wrapper */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-400 flex-shrink-0">
            <img
              src={fuad}
              alt="Founder"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-emerald-400">
              Md Fuad Amir
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Founder & MERN Stack Developer
            </p>
            <p className="text-gray-200 leading-7">
              <b className="text-red-500">Pothik</b> was founded by a passionate{" "}
              <span className="text-rose-500">MERN</span>{" "}
              <span className="text-red-500">Stack</span> developer with a
              strong vision to create a reliable and scalable e-commerce
              platform for modern users. This platform is designed to deliver a
              smooth, secure, and engaging shopping experience by combining
              clean user interface design with powerful backend architecture.
              <br />
              <br />
              With a deep interest in web technologies and problem-solving, the
              founder focuses on building solutions that are efficient,
              maintainable, and future-ready.{" "}
              <span className="text-red-500">Pothik</span> reflects a commitment
              to innovation, performance optimization, and customer-centric
              design, ensuring long-term value for both users and businesses.
            </p>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center px-4 md:px-10 lg:px-20">
        <div className="bg-gray-900/80  shadow-md rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-emerald-400">77 +</h3>
          <p className="text-gray-300 mt-1">Happy Customers</p>
        </div>

        <div className="bg-gray-900/80  shadow-md rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-emerald-400">65 +</h3>
          <p className="text-gray-300 mt-1">Products</p>
        </div>

        <div className="bg-gray-900/80 shadow-md rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-emerald-400">24/7</h3>
          <p className="text-gray-300 mt-1">Support</p>
        </div>

        <div className="bg-gray-900/80 shadow-md rounded p-6 transition-colors duration-500">
          <h3 className="text-3xl font-bold text-emerald-400">99%</h3>
          <p className="text-gray-300 mt-1">Satisfaction</p>
        </div>
      </section>
      {/* Post Style Section */}
      <section className="mt-16 grid md:grid-cols-2 gap-8 items-center px-4 md:px-10 lg:px-20">
        <img src={happy} alt="shopping" className="rounded-lg" />

        <div className="bg-gray-900/80 p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibol d mb-4 text-emerald-400">
            Why Customers Love Pothik
          </h2>
          <p className="leading-7 text-gray-200">
            Customers choose Pothik because we prioritize trust, transparency,
            and convenience. Our platform is designed to ensure a smooth
            shopping experience from browsing to delivery.
          </p>

          <p className="mt-4 leading-7 text-gray-200">
            We continuously improve our services based on customer feedback to
            serve you better every day.
          </p>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gray-900/50 mt-24 mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Start Your Journey With{" "}
          <span className="text-indigo-500">Pothik</span>
        </h2>
        <p className="text-gray-400 mb-8">
          Discover products, manage your store, and grow your business with our
          platform.
        </p>
        <Link
          to={"/products"}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition font-semibold"
        >
          Explore Shop
        </Link>
      </section>
    </div>
  );
};

export default About;
