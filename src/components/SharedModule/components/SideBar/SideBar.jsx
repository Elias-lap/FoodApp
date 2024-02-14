import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function SideBar() {
  const navigate = useNavigate()
  return (
    <div>
      <button className="btn btn-danger" onClick={()=>{
        localStorage.removeItem("adminToken") ,
        navigate("/login"),
        toast.success('log out Done🙁')
        
      }}>Log Out </button>
    </div>
  )
}

export default SideBar
