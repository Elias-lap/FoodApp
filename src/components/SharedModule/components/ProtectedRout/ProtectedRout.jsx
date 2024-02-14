/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"

function ProtectedRout({adminData  , children}) {

   
  if(adminData == null && localStorage.getItem("adminToken") == null ){
    return <Navigate to="/login" />
  }else{
    return children
  }

}

export default ProtectedRout
