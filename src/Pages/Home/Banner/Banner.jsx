import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image2 from "../../../assets/HomeBanner/image2.webp";
import image3 from "../../../assets/HomeBanner/image3.webp";
import image4 from "../../../assets/HomeBanner/image4.webp";
import image5 from "../../../assets/HomeBanner/image5.webp";
import image6 from "../../../assets/HomeBanner/image6.webp";

const banners = [
  {
    image: image2,
    title: "Discover Your Style",
    subtitle: "Trendy collections that define you.",
    button: "Shop Now",
  },
  {
    image: image3,
    title: "Upgrade Your Lifestyle",
    subtitle: "Premium gadgets at amazing prices.",
    button: "Explore Deals",
  },
  {
    image: image4,
    title: "Comfort Meets Fashion",
    subtitle: "Find your favorite everyday essentials.",
    button: "View Collection",
  },
  {
    image: image5,
    title: "Be Bold, Be You",
    subtitle: "Express your true self with Pothik.",
    button: "Start Shopping",
  },
  {
    image: image6,
    title: "Exclusive Offers Await!",
    subtitle: "Grab limited-time discounts today.",
    button: "Grab Now",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full max-h-[500px] overflow-hidden rounded-2xl mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3500}
        className="rounded-2xl shadow-md"
      >
        {banners.map((item, index) => (
          <div key={index} className="relative max-h-[500px]">
            <img
              src={item.image}
              alt={item.title}
              className="object-cover w-full h-[500px]"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold drop-shadow-md">
                {item.title}
              </h2>
              <p className="mt-3 text-lg md:text-xl font-light drop-shadow-sm">
                {item.subtitle}
              </p>
              <button className="mt-5 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300">
                {item.button}
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
