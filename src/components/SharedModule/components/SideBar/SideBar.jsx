import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
// import toggler from "../../../../assets/4 4.png";
import toggler from '../../../../assets/side.png'
import { useState } from "react";
import { Modal } from "react-bootstrap";
import ChangePassword from "../../../AuthModule/components/ChangePassword/ChangePassword";
function SideBar() {
  const [iscollapsed, setIscollapsed] = useState(false);
  const navigate = useNavigate();
  // handel Modal for Change Password
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body closeButton>
      <ChangePassword handleClose={handleClose} />
        </Modal.Body>
      </Modal>
      <div className="container-sidebar ">
        <Sidebar className="border border-top 50%" collapsed={iscollapsed}>
          <Menu>
            <MenuItem
            className="first-item"
            onClick={()=>{
              setIscollapsed(!iscollapsed)
            }} >
            
           <img className="w-100 " src={toggler}  alt="sideBarpPicture" />
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-house"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-user" />}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fas fa-utensils" />
}
              component={<Link to="/dashboard/RecipesList" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem 
            icon={<i className="fas fa-th-large"></i>
          }
            component={<Link to="/dashboard/categories" />}>
              {" "}
              categories
            </MenuItem>
            <MenuItem 
            onClick={handleShow}
            icon={<i className="fa-solid fa-unlock"></i>
          }>
              {" "}
              change Password
            </MenuItem>
            <MenuItem
            className="mt-4"
            icon={<i className="fa-solid fa-right-from-bracket"></i>}
              onClick={() => {
                localStorage.removeItem("adminToken"),
                  navigate("/login"),
                  toast.success("log out Done🙁");
              }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}

export default SideBar;
