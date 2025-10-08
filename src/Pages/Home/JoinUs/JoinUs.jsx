import { Navigate, NavLink } from "react-router";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";

const JoinUs = () => {
  const {user} = useAuth();
  return (
    <div className="p-8 bg-blue-50 text-center">
      <SectionTitle
        sectionTitle={"Join Us Today!"}
        sectionSubTitle={
          "Whether you re a buyer, seller, or rider — we have a place for you"
        }
      ></SectionTitle>
      <div className="flex flex-col md:flex-row justify-center gap-6">
    
        {/* Seller */}
       {user ? <NavLink to={'/sellerApplication'}>
        <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">
          Apply to Selling Account
        </button>
        </NavLink> : <NavLink to={'/login'}>
        <button className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">
          Apply to Selling Account
        </button>
        </NavLink>}
        {/* Rider */}
        {user ? <NavLink to={'/riderApplication'}>
        <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
          Apply to Rider Account
        </button>
        </NavLink>:<NavLink to={'/login'}>
        <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
          Apply to Rider Account
        </button>
        </NavLink>}
      </div>
    </div>
  );
};

export default JoinUs;

// 7. Call to Action / Join Us

// সবার জন্য আলাদা বোতাম:

// Shop Now (User)

// Start Selling (Seller)

// Join as Rider
