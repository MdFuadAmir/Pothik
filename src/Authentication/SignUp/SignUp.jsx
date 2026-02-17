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
    signUp(data.email, data.password)
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          email: user?.email,
          role: "user",
          status: "verified",
        };

        await axiosInstance.post("/users", userInfo);

        const updateProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };

        await updateUserProfile(updateProfile);
        toast.success("Account created successfully");
        navigate(from);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="
        max-w-sm w-full p-4
        bg-gray-900/80
        rounded-xl shadow-sm
        "
      >
        <h1 className="text-center text-xl font-semibold mb-6 text-emerald-400">
          Sign Up !
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* profile photo */}
          <div className="items-center flex flex-col  gap-2 px-4">
            {profilePic ? (
              <img
                src={profilePic}
                alt="profile"
                className="rounded-full w-16 h-16 object-cover border border-emerald-400 p-1"
              />
            ) : (
              <FaRegUser className="rounded-full w-16 h-16 border border-emerald-400 p-1 text-emerald-400" />
            )}
            <input
              onChange={handleUploadeImage}
              type="file"
              className="rounded-full w-12 h-12 text-transparent absolute border-red-600 cursor-pointer"
              placeholder="photo"
            />
            <p className="text-xs text-emerald-400">Sellect Photo</p>
          </div>

          {/* name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="your name..."
              className="
              w-full px-3 py-2 rounded-lg bg-gray-900/60 placeholder:text-gray-300 text-gray-300              
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
            />
            {errors?.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          {/* email */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="your email..."
              className="
             w-full px-3 py-2 rounded-lg bg-gray-900/60 placeholder:text-gray-300 text-gray-300              
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          {/* password */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="your password..."
              className="
      w-full px-3 py-2 rounded-lg bg-gray-900/60 placeholder:text-gray-300 text-gray-300              
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              "
            />
            {errors?.password && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="
            mt-6
            w-full py-2 rounded-lg font-medium
            bg-emerald-600 hover:bg-emerald-800
            text-white transition disabled:bg-emerald-900/50
            "
          >
            {isUploading ? "Uploading..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-400 font-medium"
          >
            Login
          </Link>
        </p>

        <div className="flex items-center gap-3 mt-6 mb-4">
          <div className="h-px w-full bg-emerald-400 "></div>
          <span className="text-sm text-emerald-400">OR</span>
          <div className="h-px w-full bg-emerald-400"></div>
        </div>

        <SocialLogin />
      </div>
    </div>
  );
};

export default SignUp;
