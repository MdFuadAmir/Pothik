import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocilaLogin from "../SocilaLogin/SocilaLogin";
import { IoIosCloudUpload } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { creatUser, updateUserProfile } = useAuth();
  const [profileImage, setProfileImage] = useState("");

  const handleImageUploade = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadeUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadeUrl, formData);
    setProfileImage(res.data.data.url);
  };

  const onSubmit = (data) => {
    console.log(data);
    creatUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // update user info in database

        // update user profile in firebase
        const userProfile ={
          displayName: data.name,
          photoUrl: profileImage
        }
        updateUserProfile(userProfile)
        .then(()=>{
          console.log('Profile name and image updated');
        })
        .catch(error=>{
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full my-12">
      <div className="max-w-lg mx-auto shadow-lg shadow-black p-4 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className="text-white text-center font-bold font-serif mb-6 text-2xl">
              SignUp !
            </h1>
            {/* photo */}
            <div className="fieldset flex">
              <div className="flex">
                <div className="w-24 h-24 bg-cyan-950 rounded-lg flex justify-center items-center flex-col text-center text-white">
                  <IoIosCloudUpload size={50} />
                  Choose Your Photo
                </div>
                <input
                  onChange={handleImageUploade}
                  type="file"
                  className="w-24 h-24 text-transparent absolute"
                  placeholder="photo"
                />
              </div>
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
                <span className="text-red-500">This field is required</span>
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
                <span className="text-red-500">This field is required</span>
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
                <span className="text-red-500">This field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-500">
                  Password must be 6 charecters
                </span>
              )}
            </div>

            {/* submit button */}
            <button className="border-none btn bg-indigo-900 text-white mt-4">
              Sign Up
            </button>
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
