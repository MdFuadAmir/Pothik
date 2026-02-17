import { NavLink } from "react-router";

const DashboardMenu = ({ to, labal, icon: Icon, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={onClick}
        className={({ isActive }) =>
          `flex items-center gap-2 px-3 py-2 rounded transition-colors
          ${
            isActive
              ? "bg-emerald-600 text-gray-200 font-semibold"
              : "text-gray-200 hover:bg-emerald-700 hover:text-gray-200"
          }`
        }
      >
        {Icon && <Icon className="text-lg" />}
        {labal}
      </NavLink>
    </li>
  );
};

export default DashboardMenu;
