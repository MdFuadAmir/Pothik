import founder from "../../assets/fuad.jpg";
import logo from "../../assets/pothik.png";

const DashboardFooter = () => {
  return (
    <footer className="bg-gray-500/20 dark:bg-gray-500/10 backdrop-blur text-gray-300 md:px-6 py-4 flex flex-col gap-2 justify-center items-center">
      <div className="flex">
        <img
          src={founder}
          alt="Payment Methods"
          className="h-10 rounded-full object-contain"
        />
        <img
          src={logo}
          alt="Payment Methods"
          className="h-10 rounded-full object-contain"
        />
      </div>
      <div className="text-center text-gray-400">
        © {new Date().getFullYear()} Pothik. Md Fuad All Right Reserved.
      </div>
    </footer>
  );
};

export default DashboardFooter;

