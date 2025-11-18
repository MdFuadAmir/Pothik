import Banner from "../../../Components/Banner/Banner";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import BestDeals from "../../BestDeals/BestDeals";
import Category from "../../Category/Category";
import Products from "../../Products/Products";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <Banner />
      <Category />
      <BestDeals/>
      <Products/>
    </div>
  );
};

export default Home;
