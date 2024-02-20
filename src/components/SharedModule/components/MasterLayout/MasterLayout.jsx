import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";


// eslint-disable-next-line react/prop-types
function MasterLayout({ adminData }) {
  return (
    <div className="d-flex  ">
      <div className="home-sideBar"> 
        <SideBar />
      </div>
      <div className="w-100">
        <Navbar adminData={adminData} /> 
        <Outlet />
      </div>
    </div>
  );
}

export default MasterLayout;
