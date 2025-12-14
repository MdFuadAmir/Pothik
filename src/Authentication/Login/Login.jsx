import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const location = useLocation();
  const from = location?.state?.from || "/";
  const navigate = useNavigate();
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
    <div className="max-w-sm mx-auto p-4 border rounded">
      <h1 className="text-center text-xl font-bold mb-6">LOGIN !</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* email */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="your email ...."
            className="input w-full"
          />
          {errors?.email?.type === "required" && (
            <span className="text-red-500 text-sm">Email is Required</span>
          )}
        </div>
        {/* password */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Password</label>
          <input
            {...register("password", { required: true, minLength: 6 })}
            type="password"
            placeholder="your email ...."
            className="input w-full"
          />
          {errors?.password?.type === "required" && (
            <span className="text-red-500 text-sm">Password is Required</span>
          )}
          {errors?.password?.type === "minLength" && (
            <span className="text-red-500 text-sm">
              Password must be 6 charecters
            </span>
          )}
        </div>
        <div className="">
          <Link to={"/login"} className="text-sm">
            Forgot password?
          </Link>
        </div>
        <button className="btn btn-outline border-2 w-full border-green-500">
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <Link to={"/signUp"} className="text-blue-500 text-md">
          SignUp
        </Link>
      </p>

      <div className="flex justify-center items-center gap-4 mt-6 mb-4">
        <div className="border w-full"></div>
        <div>Or</div>
        <div className="border w-full"></div>
      </div>
      <SocialLogin />
    </div>
  );
};

export default Login;
