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
          element: <Login saveAdminData={saveAdminData} />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "ForgetPasword",
          element: <ForgetPasword saveAdminData={saveAdminData} />,
        },
        {
          path: "ResetPasword",
          element: <ResetPassword />,
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
          path: "Recipes",
          element: <RecipesList />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "categories",
          element: <CategoriestList />,
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
