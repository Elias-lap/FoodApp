import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/SideBar"

// eslint-disable-next-line react/prop-types
function MasterLayout({adminData}) {

  return (
    <div className="container-fluid ">
      <div className="row">

        <div className="col-md-3">
          <SideBar/>
        </div>
    <div className="col-md-9">
          <Navbar adminData={adminData}/>
        <Outlet/>
    </div>
      </div>
      
    </div>
  )
}

export default MasterLayout
