import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

import img1 from "../../assets/HomeBanner/img1.jpg";
import img2 from "../../assets/HomeBanner/img2.jpg";
import img3 from "../../assets/HomeBanner/img3.jpg";
import img4 from "../../assets/HomeBanner/img5.jpg";
import img5 from "../../assets/HomeBanner/img6.jpg";
import img6 from "../../assets/HomeBanner/img7.jpg";
import img7 from "../../assets/HomeBanner/img8.png";
import img8 from "../../assets/HomeBanner/img9.png";

const slides = [
  { img: img1, title: "Upgrade Your Tech", desc: "Latest smartphones, laptops & gadgets at unbeatable prices.", link: "/products?category=Electronics", btn: "Shop Electronics" },
  { img: img2, title: "Style That Defines You", desc: "Modern fashion curated for everyday lifestyle.", link: "/products?category=Fashion", btn: "Explore Fashion" },
  { img: img3, title: "Smart Home Essentials", desc: "Make your home smarter, simpler & more comfortable.", link: "/products", btn: "Shop Home" },
  { img: img4, title: "Everyday Accessories", desc: "Small things that make a big difference.", link: "/products", btn: "Browse Accessories" },
  { img: img5, title: "Gaming & Entertainment", desc: "High-performance gear for serious gamers.", link: "/products", btn: "Explore Gaming" },
  { img: img6, title: "Work Smarter", desc: "Productivity tools built for modern professionals.", link: "/products", btn: "View Collection" },
  { img: img7, title: "Mobile Must-Haves", desc: "Protect, power & personalize your phone.", link: "/products?category=Mobiles", btn: "Shop Mobile Gear" },
  { img: img8, title: "Essentials for Everyone", desc: "Quality products for your daily needs.", link: "/products", btn: "Start Shopping" },
];

const Banner = () => {
  return (
    <section className="mt-6 overflow-hidden shadow-2xl">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4500}
        transitionTime={900}
        swipeable
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-90 md:h-150 bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            {/* overlay */}
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />

            {/* content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="
                 md:max-w-2xl
                bg-white/10 dark:bg-black/20
                backdrop-blur-lg
                p-6 md:p-10
                rounded-3xl
                border border-white/20
              ">
                <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-3 text-sm md:text-lg text-gray-200">
                  {slide.desc}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to={slide.link}
                    className="
                      px-7 py-3 rounded-full
                      bg-gradient-to-r from-sky-500 to-blue-600
                      text-white font-semibold
                      hover:scale-105 transition
                    "
                  >
                    {slide.btn}
                  </Link>

                  <Link
                    to="/products"
                    className="
                      px-7 py-3 rounded-full
                      border border-white/40
                      text-white font-medium
                      hover:bg-white/10 transition
                    "
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
