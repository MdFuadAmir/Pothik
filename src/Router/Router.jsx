import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home/Home";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
        {
            path:"/",
            Component: Home
        },
        {
            path:"/about",
            Component: About
        },
        {
            path:"/contact",
            Component: Contact
        },
        
    ]

  },
]);

export default router;
