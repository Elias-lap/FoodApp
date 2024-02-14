import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (

    <div className="Auth-container vh-100  ">
    <div className="overlay  vh-100  container-fluid">
    <Outlet/>
    </div>
  </div>
  
      
  
  )
}

export default AuthLayout
