import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/AuthModule/components/Login/Login";
import ForgetPasword from "./components/AuthModule/components/forgetPassword/ForgetPasword";
import Home from "./components/HomeModule/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/SharedModule/components/AuthLayout/AuthLayout";
import MasterLayout from "./components/SharedModule/components/MasterLayout/MasterLayout";
import RecipesList from "./components/RecipesModule/components/RecipesList/RecipeList";
import UserList from "./components/UserModule/components/UserList/UserList";
import CategoriestList from "./components/categoriesModule/components/CategoriestList/CategoriestList";
import NotFound from "./components/SharedModule/components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRout from "./components/SharedModule/components/ProtectedRout/ProtectedRout";
import ResetPassword from "./components/AuthModule/components/ResetPassword/ResetPassword";
import CreatRecipes from "./components/SharedModule/components/CreatReacipes/CreatRecipes";
import Register from "./components/AuthModule/components/Register/Register";
import VerifyEmail from "./components/AuthModule/components/verfyEmail/VerifyEmail";
import Favorites from "./components/UserModule/components/favourie/Favorites";
function App() {
  const [adminData, setAdminData] = useState(null);
  const saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    let decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
    
  };
 
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        
          <AuthLayout />
        
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login saveAdminData={saveAdminData}  />,
        },
        {
          path: "login",
          element: <Login saveAdminData={saveAdminData}  />,
        },
        {
          path: "Register",
          element: <Register  saveAdminData={saveAdminData}/>,
        },
        {
          path: "ForgetPasword",
          element: <ForgetPasword saveAdminData={saveAdminData} />,
        },
        {
          path: "ResetPasword",
          element: <ResetPassword />,
        },
        {
          path: "VerifyEmail",
          element: <VerifyEmail/>,
        },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRout adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRout>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home  adminData={adminData} />,
        },
        {
          path: "RecipesList",
          element: <RecipesList adminData={adminData}  />,
        },
        {
          path: "Favorites",
          element: <Favorites adminData={adminData} />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "categoriesList",
          element: <CategoriestList/>,
        },
        {
          path: "CreatRecipes/:id?",
          element: <CreatRecipes />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
