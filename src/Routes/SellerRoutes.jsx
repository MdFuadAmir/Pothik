import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../Shared/Loading/Loading";

const SellerRoutes = ({children}) => {
    const {user,loading} = useAuth();
    const {role,roleLoading} = useUserRole();
    const location = useLocation();
    if(loading || roleLoading){
        return <Loading/>;
    }
    if(!user || role !== 'seller'){
        return <Navigate state={{from: location?.pathname}} to='/forbidden'></Navigate>
    }
    return children
};

export default SellerRoutes;