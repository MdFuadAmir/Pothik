import { useForm } from "react-hook-form";
import SocilaLogin from "../SocilaLogin/SocilaLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";


const Login = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {signIn} = useAuth();
  const location = useLocation();
  const from =  location?.state?.from || "/";
  const navigate = useNavigate();
  
  const onSubmit = (data) =>{
    signIn(data.email,data.password)
    .then(() =>{
      toast.success("Login Successfull")
      navigate(from);
    })
    .catch(error=>{
      toast.error(error.message);
    })

  }
  return (
   <div className="w-full my-12">
     <div className="max-w-lg mx-auto shadow-lg shadow-black px-8 py-12 rounded-xl bg-transparent">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
        <h1 className="text-white text-center font-bold font-serif mb-6 text-2xl">
          Login !
        </h1>
            {/* email */}
          <div className="fieldset">
            <label className="label text-white">Email</label>
            <input
            {...register("email",{required: true})}
             type="email" 
             className="input w-full" 
             placeholder="Email" />
             {errors.email?.type === 'required' && <span className="text-red-500">This field is required</span>}
          </div>
            {/* password */}
          <div className="fieldset">
            <label className="label text-white">Password</label>
            <input
            {...register("password",{required: true,minLength: 6})}
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <span className="text-red-500">{errors.message}</span>}
            {errors.password?.type === 'minLength' && <span className="text-red-500">{errors.message}</span>}
          </div>
          
          {/* submit button */}
          <button className="border-none btn bg-violet-600 text-white mt-4">Login</button>
          {/* troggl to sign up page */}
          <p className="text-amber-400 mt-4 text-center">
            New Hare ?{" "}
            <Link to="/signUp" className="font-bold text-amber-600">
              Creat a Account
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

export default Login;
