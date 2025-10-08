import Banner from "../Banner/Banner";
import BestDeals from "../BestDeals/BestDeals";
import Categories from "../Categories/Categories";
import HowItWork from "../HowItWork/HowItWork";
import JoinUs from "../JoinUs/JoinUs";
import Testimonials from "../Testimonials/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";



const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <Categories></Categories>
             <WhyChooseUs></WhyChooseUs>
             <BestDeals></BestDeals>
             <HowItWork></HowItWork>
             <Testimonials></Testimonials>
             <JoinUs></JoinUs>
             
            
        </div>
    );
};

export default Home;