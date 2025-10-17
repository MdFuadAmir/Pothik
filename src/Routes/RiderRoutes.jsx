import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../Shared/Loading/Loading";


const RiderRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const {role,roleLoading} = useUserRole();
    const location = useLocation();
    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(!user || role !== 'rider'){
        return <Navigate state={{from: location?.pathname}} to='/forbidden'></Navigate>
    }
    return children
};

export default RiderRoutes;