import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="mx-auto max-w-7xl bg-indigo-200">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;