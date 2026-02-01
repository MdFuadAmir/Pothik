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
              ? "bg-gray-100 text-gray-800 dark:bg-slate-900 dark:text-gray-200 font-semibold"
              : "text-gray-900 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-slate-900 dark:hover:text-gray-200"
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
