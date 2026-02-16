// import { Link } from "react-router";
// import pothik from "../../assets/pothik.png";
// const Pothik = () => {
//   return (
//     <Link to={"/"}>
//       <img src={pothik} alt="/pothik" className="w-36" />
//     </Link>
//   );
// };

// export default Pothik;


import { Link, useLocation } from "react-router";
import pothik from "../../assets/pothik.png";

const Pothik = () => {
  const location = useLocation();

  const handleClick = () => {
    // যদি আগেই home page এ থাকে, তাও top এ নিয়ে যাবে
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Link to="/" onClick={handleClick}>
      <img src={pothik} alt="pothik" className="w-36 cursor-pointer" />
    </Link>
  );
};

export default Pothik;
