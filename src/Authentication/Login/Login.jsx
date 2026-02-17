import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { FaHandHoldingHeart } from "react-icons/fa";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(async () => {
        await axiosInstance.patch("/users/last-login", {
          email: data.email,
        });
        toast.success("Login Successfully");
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="
        w-full md:max-w-sm p-4
        bg-gray-900/80 
        rounded-xl shadow-sm
        "
      >
        <h1 className="text-2xl font-semibold mb-6  text-emerald-400 flex items-center gap-2 justify-center">
          Welcome Back <FaHandHoldingHeart className="text-emerald-400" />
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* email */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-200">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="your email..."
              className="
              w-full px-3 py-2 rounded-lg bg-gray-900/60 placeholder:text-gray-300 text-gray-300              
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
            />
            {errors?.email?.type === "required" && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-200">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="your password..."
              className="
              w-full px-3 py-2 rounded-lg bg-gray-900/60 placeholder:text-gray-300 text-gray-300              
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
            />
            {errors?.password?.type === "required" && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
            {errors?.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <div>
            <Link
              to={"/login"}
              className="text-sm text-emerald-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="
            w-full py-2 rounded-lg font-medium
            bg-emerald-600 hover:bg-emerald-800
            text-white transition
            "
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to={"/signUp"}
            className="text-emerald-400 hover:text-emerald-500 font-medium"
          >
            Sign Up
          </Link>
        </p>

        <div className="flex items-center gap-3 mt-6 mb-4">
          <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <div className="h-px w-full bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
