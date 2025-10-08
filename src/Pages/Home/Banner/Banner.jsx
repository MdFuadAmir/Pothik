import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image2 from "../../../assets/HomeBanner/image2.webp";
import image3 from "../../../assets/HomeBanner/image3.webp";
import image4 from "../../../assets/HomeBanner/image4.webp";
import image5 from "../../../assets/HomeBanner/image5.webp";
import image6 from "../../../assets/HomeBanner/image6.webp";
const Banner = () => {
  return (
 
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={image2} />
      </div>
      <div>
        <img src={image3} />
      </div>
      <div>
        <img src={image4} />
      </div>
      <div>
        <img src={image5} />
      </div>
      <div>
        <img src={image6} />
      </div>
    </Carousel>
  );
};

export default Banner;
