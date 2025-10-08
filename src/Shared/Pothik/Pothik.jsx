import { NavLink } from "react-router";
import pothik from "../../assets/pothik.png";

const Pothik = () => {
  return (
    <NavLink to='/'>
      <img
        src={pothik}
        alt="Pothik"
        className="w-32 fill-cyan-500 drop-shadow-lg drop-shadow-cyan-500/50"
      />
    </NavLink>
  );
};

export default Pothik;
