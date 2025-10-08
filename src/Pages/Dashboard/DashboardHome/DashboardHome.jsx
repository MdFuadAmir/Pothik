// import Forbidden from "../../../Shared/Forbidden/Forbidden";
// import Loading from "../../../Shared/Loading/Loading";
// import AdminDashboard from "./AdminDashboard";
// import RiderDashboard from "./RiderDashboard";
// import SallersDashboard from "./SallersDashboard";
// import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
    // if(roleLoading){
    //     return <Loading></Loading>
    // }
    // if(roll === 'user'){
    //     return <UserDashboard></UserDashboard>
    // }else if(roll === 'rider'){
    //     return <RiderDashboard></RiderDashboard>
    // }else if(roll === 'admin'){
    //     return <AdminDashboard></AdminDashboard>
    // }else if(roll === 'seller'){
    //     return <SallersDashboard></SallersDashboard>
    // }else{
    //     return <Forbidden></Forbidden>
    // }
    const product = {
  name: "T-Shirt",
  colors: "Red, Blue, Black"
};

const colors = product.colors.split(","); // ["Red", " Blue", " Black"]
    return (
        
        <div className="flex gap-2 flex-wrap">
      {colors.map((color, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
        >
          {color.trim()}
        </span>
      ))}
    </div>

    );

};

export default DashboardHome;