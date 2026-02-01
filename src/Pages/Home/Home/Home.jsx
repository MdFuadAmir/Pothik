import Banner from "../../../Components/Banner/Banner";
import BestDeals from "../../BestDeals/BestDeals";
import Category from "../../Category/Category";

const Home = () => {
  return (
    <div className="space-y-32">
      <Banner />
      <Category />
      <BestDeals/>
    </div>
  );
};

export default Home;
