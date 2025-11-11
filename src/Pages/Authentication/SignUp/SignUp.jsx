import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocilaLogin from "../SocilaLogin/SocilaLogin";
import { IoIosCloudUpload } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { creatUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from || "/";
  const axiosInstance = useAxios();
  const [profileImage, setProfileImage] = useState();
  const [upLoading, setUploading] = useState(false);

  const handleImageUploade = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadeUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadeUrl, formData);
    setProfileImage(res.data.data.display_url);
    setUploading(false);
  };

  const onSubmit = (data) => {
    creatUser(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        // update user info in database
        const userInfo = {
          email: user.email,
          role: "user", //default role
          status: "verified",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosInstance.post("/users", userInfo);
        if (userRes.data.success && userRes.data.insertedId) {
          toast.success('Your Account has been created')
        } else {
          toast.success('User already exists')
        }
        // update user profile in firebase
        const userProfile = {
          displayName: data?.name,
          photoURL: profileImage,
        };
        updateUserProfile(userProfile)
          .then(() => {
            navigate(from);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full my-12">
      <div className="max-w-lg mx-auto shadow-lg shadow-black px-8 py-12 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className="text-white text-center font-bold font-serif mb-6 text-2xl">
              SignUp !
            </h1>
            {/* photo */}
            <div className="fieldset flex">
              <div className="flex">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-24 h-24 object-center rounded-lg mt-3 border"
                  />
                ) : (
                  <div className="w-24 h-24 bg-cyan-950 rounded-lg flex justify-center items-center flex-col text-center text-white">
                    <IoIosCloudUpload size={50} />
                    Choose Your Photo
                  </div>
                )}
                <input
                  onChange={handleImageUploade}
                  type="file"
                  className="w-24 h-24 text-transparent absolute"
                  placeholder="photo"
                />
              </div>
              {upLoading && (
                <p className="text-blue-600 mt-1 animate-pulse">
                  Uploading ......
                </p>
              )}
            </div>
            {/* name */}
            <div className="fieldset">
              <label className="label text-white">Full Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500">This Field is Required</span>
              )}
            </div>
            {/* email */}
            <div className="fieldset">
              <label className="label text-white">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500">This Field is Required</span>
              )}
            </div>
            {/* password */}
            <div className="fieldset">
              <label className="label text-white">Password</label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                className="input w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">This Field is Required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  {errors.message}
                </span>
              )}
            </div>

            {/* submit button */}
            {upLoading ? (
              <button
                disabled
                className="border-none btn bg-indigo-900 text-white mt-4"
              >
                Sign Up
              </button>
            ) : (
              <button className="border-none btn bg-violet-600 text-white mt-4">
                Sign Up
              </button>
            )}
            {/* troggl to sign up page */}
            <p className="text-amber-400 mt-4 text-center">
              Already Have an account ?{" "}
              <Link to="/login" className="font-bold text-amber-600">
                Login
              </Link>
            </p>
          </fieldset>
          <div className=" divider divider-primary text-white my-4 max-w-sm mx-auto">
            OR
          </div>
        </form>
        <SocilaLogin></SocilaLogin>
      </div>
    </div>
  );
};

export default SignUp;
