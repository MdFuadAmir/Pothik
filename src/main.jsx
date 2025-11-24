import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import router from "./Router/Router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Context/AuthProvider/AuthProvider.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="arvo-regular">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster/>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
