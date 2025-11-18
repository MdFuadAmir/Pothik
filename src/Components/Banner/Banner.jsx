import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import img1 from "../../assets/HomeBanner/image1.jpg";
import img2 from "../../assets/HomeBanner/image2.jpg";
import img3 from "../../assets/HomeBanner/image3.jpg";
import img4 from "../../assets/HomeBanner/image4.jpg";

const Banner = () => {
  return (
    <div className="rounded-lg overflow-hidden mt-6">
      <Carousel showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        transitionTime={1000}>
        <div>
          <img src={img1} className="h-[300px] rounded-xl object-cover"/>
        </div>
        <div>
          <img src={img2} className="h-[300px] rounded-xl object-cover"/>
        </div>
        <div>
          <img src={img3} className="h-[300px] rounded-xl object-cover"/>
        </div>
        <div>
          <img src={img4} className="h-[300px] rounded-xl object-cover"/>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
