import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});
const useAxiosSecure = () => {
  const {user,logOut} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    // ✅ Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async(config)=>{
        if(user){
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`
        };
        return config;
      },
      (error) => Promise.reject(error)
    );
    // ✅ Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res)=> res,
      (error)=>{
        const status = error?.response?.status;
        if(status === 401){
          logOut().then(() => navigate("/login"));
        }else if(status === 403){
          navigate("/forbidden");
        }
        return Promise.reject(error);
      }
    );
    // ✅ Cleanup (prevent memory leaks)
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  },[user, logOut,navigate])
    return axiosSecure;
};

export default useAxiosSecure;