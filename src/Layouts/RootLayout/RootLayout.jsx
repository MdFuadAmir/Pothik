import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";


const RootLayout = () => {
    return (
        <div className="bg-base-300">
            <Navbar/>
            <main className="min-h-[calc(100vh-64px)] max-w-[2520px] mx-auto px-4 md:px-10 lg:px-20">
            <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default RootLayout; 