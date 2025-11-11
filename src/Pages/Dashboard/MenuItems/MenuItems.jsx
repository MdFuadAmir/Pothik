import { NavLink } from "react-router";

const MenuItems = ({ labal, to, onClick, icon: Icon }) => {
  return (
    <li>
      <NavLink to={to} onClick={onClick} className={({isActive}) =>isActive ? " text-amber-500 bg-violet-900 rounded font-semibold" : "text-white"}>
        {Icon && <Icon className="text-lg"/>} {labal}
      </NavLink>
    </li>
  );
};

export default MenuItems;
