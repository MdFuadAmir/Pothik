import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import {  useNavigate } from "react-router";


const SocilaLogin = () => {
    const {loginWithGoogle} = useAuth();
    const navigate = useNavigate();
    const from = location?.state?.from || '/';
    const haldleGoogleSignIn = () =>{
        loginWithGoogle()
        .then((result) => {
          navigate(from);
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return (
        <div className=" space-y-3">
            <button onClick={haldleGoogleSignIn} className="btn rounded-full w-full flex justify-center"><FaGoogle size={20}/> Login With Google</button>
            <button className="btn rounded-full w-full flex justify-center"><FaGithub size={20}/> Login With Github</button>
            <button className="btn rounded-full w-full flex justify-center"><FaFacebook size={20}/> Login With Facebook</button>
        </div>
    );
};

export default SocilaLogin;