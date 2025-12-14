import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signUp, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUploadeImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res?.data?.data?.display_url);
    setIsUploading(false);
  };
  const onSubmit = (data) => {
    signUp(data?.email, data?.password)
      .then(async (result) => {
        const user = result.user;
        console.log("Current-user:", user);
        const userInfo = {
          email: user?.email,
          role: "user",
          status: "verified",
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.success && userRes.data.insertedId) {
          toast.success("Your Account has been created");
        } else {
          toast.success("User already exists");
        }
        // update user
        const updateProfile = {
          displayName: data?.name,
          photoURL: profilePic,
        };
        updateUserProfile(updateProfile)
          .then(() => {
            toast.success("update user info");
            navigate(from);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-sm mx-auto p-4 border rounded mb-12">
      <h1 className="text-center text-xl font-bold mb-6">SIGN UP !</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* photo */}
        <div className=" items-center flex flex-col  gap-2 px-4">
          {profilePic ? (
            <img
              src={profilePic}
              alt="profile"
              className="rounded-full w-16 h-16 object-cover border p-1"
            />
          ) : (
            <FaRegUser className="rounded-full w-16 h-16 border p-1" />
          )}
          <input
            onChange={handleUploadeImage}
            type="file"
            className="rounded-full w-12 h-12 text-transparent absolute border-red-600 cursor-pointer"
            placeholder="photo"
          />
          <p className="text-xs">Sellect Photo</p>
        </div>

        {/* name */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="your name ...."
            className="input w-full"
          />
          {errors?.name?.type === "required" && (
            <span className="text-red-500 text-sm">Name is Required</span>
          )}
        </div>
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
            placeholder="your password ...."
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
          <Link to={"/signUp"} className="text-sm">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="btn btn-outline border-2 w-full border-green-500"
        >
          {isUploading ? "Uploading Image..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to={"/login"} className="text-green-500 text-md">
          Login
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

export default SignUp;

// phoneNumber
