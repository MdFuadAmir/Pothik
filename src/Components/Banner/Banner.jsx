import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="rounded-lg overflow-hidden mt-6">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        transitionTime={1000}
      >
        {/* Slide - 3 */}
        <div className="h-[300px] rounded-xl bg-blue-500 px-4 md:px-8 flex flex-col justify-center text-white overflow-hidden">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Mega Electronics Sale
          </h1>
          <p className="text-sm md:text-lg max-w-md opacity-90 mb-4 mx-auto">
            Up to 60% off on mobiles, laptops, cameras & more. Grab the best
            deals today!
          </p>

          <button className="border border-white px-5 py-1.5 md:py-2 rounded-md text-sm md:text-base hover:bg-white hover:text-blue-600 transition font-semibold w-fit mx-auto">
            Shop Now
          </button>
        </div>
        {/* Slide - 2 */}
        <div className="h-[300px]  rounded-xl bg-indigo-500 px-6 md:px-10 flex flex-col justify-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Fashion Fest 2025
          </h1>
          <p className="text-sm md:text-lg max-w-md mx-auto opacity-90 mb-4">
            New collections for men & women. Premium styles at the best prices.
          </p>
          <button className="border border-white px-5 py-1.5 md:py-2 rounded-md hover:bg-white hover:text-indigo-600 transition mx-auto font-semibold w-fit">
            Explore Fashion
          </button>
        </div>
        {/* Slide - 3 */}
        <div className="h-[300px] rounded-xl bg-teal-500 px-6 md:px-10 flex flex-col justify-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Home Appliance Deals
          </h1>
          <p className="text-sm md:text-lg mx-auto max-w-md opacity-90 mb-4">
            Save big on refrigerators, ACs, kitchen appliances & more.
          </p>
          <button className="border border-white px-5 py-1.5 md:py-2 rounded-md hover:bg-white hover:text-teal-600 mx-auto transition font-semibold w-fit">
            View Offers
          </button>
        </div>

        {/* Slide - 4 */}
        <div className="h-[300px] rounded-xl  bg-cyan-500 px-6 md:px-10 flex flex-col justify-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Super Deals on Accessories
          </h1>
          <p className="text-sm md:text-lg mx-auto max-w-md opacity-90 mb-4">
            Headphones, smartwatches, speakers & more at the lowest prices.
          </p>
          <button className="border border-white mx-auto px-5 py-1.5 md:py-2 rounded-md hover:bg-white hover:text-cyan-600 transition font-semibold w-fit">
            Check Accessories
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
