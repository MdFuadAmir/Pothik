import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";


const AuthProvider = ({children}) => {
    // states 
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // creat user
    const creatUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    //  login User 
    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    // update user profile
    const updateUserProfile = (profileInfo) =>{
        return updateProfile(auth.currentUser,profileInfo);
    }
    // google login
    const loginWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    // logout
    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }
    // finaly set user
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return () =>{
            unSubscribe();
        }

    },[])
    const authInfo ={
        user,
        loading,
        creatUser,
        signIn,
        updateUserProfile,
        loginWithGoogle,
        logOut,
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;