import { Link } from "react-router";
import pothik from "../../assets/pothik.png";
const Pothik = () => {
  return (
    <Link to={"/"}>
      <img src={pothik} alt="/pothik" className="w-36" />
    </Link>
  );
};

export default Pothik;
