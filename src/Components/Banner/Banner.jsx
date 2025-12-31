import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../assets/HomeBanner/img1.jpg";
import img2 from "../../assets/HomeBanner/img2.jpg";
import img3 from "../../assets/HomeBanner/img3.jpg";
import img4 from "../../assets/HomeBanner/img5.jpg";
import img5 from "../../assets/HomeBanner/img6.jpg";
import img6 from "../../assets/HomeBanner/img7.jpg";
import img7 from "../../assets/HomeBanner/img8.png";
import img8 from "../../assets/HomeBanner/img9.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="rounded-xl overflow-hidden mt-6 shadow-md">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={3500}
        transitionTime={900}
      >
        {/* Slide Template */}
        {[
          {
            img: img1,
            title: "Upgrade Your Tech",
            desc: "Latest smartphones, laptops & gadgets at best deals.",
            link: "/products?category=Electronics",
            btnText: "Shop Electronics",
            btnColor: "text-blue-600",
          },
          {
            img: img2,
            title: "Style That Defines You",
            desc: "Discover modern fashion for everyday lifestyle.",
            link: "/products?category=Fashion",
            btnText: "Browse Fashion",
            btnColor: "text-purple-600",
          },
          {
            img: img3,
            title: "Smart Home Essentials",
            desc: "Appliances that make your home more comfortable.",
            link: "/products",
            btnText: "View Appliances",
            btnColor: "text-teal-600",
          },
          {
            img: img4,
            title: "Everyday Accessories",
            desc: "Essential items designed for daily convenience.",
            link: "/products",
            btnText: "Shop Accessories",
            btnColor: "text-sky-600",
          },
          {
            img: img5,
            title: "Gaming & Entertainment",
            desc: "Experience high-quality gaming & sound gear.",
            link: "/products",
            btnText: "Explore Now",
            btnColor: "text-sky-600",
          },
          {
            img: img6,
            title: "Work & Productivity",
            desc: "Tools that help you work smarter every day.",
            link: "/products",
            btnText: "View Collection",
            btnColor: "text-sky-600",
          },
          {
            img: img7,
            title: "Mobile Must-Haves",
            desc: "Power, protect & personalize your device.",
            link: "/products?category=Mobiles",
            btnText: "Shop Mobile Gear",
            btnColor: "text-sky-600",
          },
          {
            img: img8,
            title: "Essentials for Everyone",
            desc: "Quality products that fit your daily needs.",
            link: "/products",
            btnText: "Start Shopping",
            btnColor: "text-sky-600",
          },
        ].map((slide, index) => (
          <div
            key={index}
            className="h-[300px] md:h-[420px] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            {/* Overlay with dark/light support */}
            <div className="bg-black/40 dark:bg-black/70 w-full h-full flex items-center justify-center px-5 transition-colors duration-500">
              <div className="max-w-xl text-center text-white">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-lg opacity-90 mb-5">
                  {slide.desc}
                </p>
                <Link
                  to={slide.link}
                  className={`bg-white dark:bg-gray-200 ${slide.btnColor} dark:text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-300 transition`}
                >
                  {slide.btnText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
