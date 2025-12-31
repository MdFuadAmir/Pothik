import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();

  const haldleGoogleSignIn = () => {
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log("current-user:",user);
        // update user profile info in database
        const userInfo = {
          email: user?.email,
          role: "user",
          status:"verified",
        };
        await axiosInstance.post("/users", userInfo);
        toast.success("Login Success !!");
        console.log("Current_user",userInfo);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div>
      <button
        onClick={haldleGoogleSignIn}
        className="flex items-center gap-4 btn btn-outline rounded w-full dark:text-white"
      >
        <FaGoogle size={20} /> Login With Google
      </button>
    </div>
  );
};

export default SocialLogin;
