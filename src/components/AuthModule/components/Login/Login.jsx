import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/4 4.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Login({saveAdminData} ) {
  // for password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  // //////////
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    setSpinner(true); // Set spinner to true before making the API call

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Login",
        data
      );
      // Handle success response
      localStorage.setItem("adminToken", response?.data?.token);
      toast.success("Login successfully");
      // Navigate to dashboard only after setting the token
      navigate("/dashboard");
      saveAdminData()
    } catch (error) {
      // Handle error
      toast.error(error.response.data.message);
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
    }
  };

  return (
    <div className="row vh-100    justify-content-center  align-items-center">
      <div className=" col-md-5    ">
        <div className="login  px-5 py-4 rounded-3 bg-white">
          <div className="logo-cont  text-center    ">
            <img src={logo} alt={logo} className="w-50   h-25" />
          </div>
          <h3>Log in</h3>
          <p className="text-muted"> welcome Back !Please enter your details</p>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-4 ">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-envelope" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your E-mail"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "email is not valid ",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="alert alert-danger ">
                  {errors.email.message}
                </div>
              )}
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="password"
                  {...register("password", {
                    required: "password is required ",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                    },
                  })}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
              </div>
              {errors.password && (
                <div className="alert alert-danger ">
                  {errors.password.message}
                </div>
              )}
              <div className=" d-flex w-100 justify-content-between mb-3 flex-wrap">
                <span>
                <Link to={"/Register"}>Register Now ?</Link>
                  </span>
                <span>
                  <Link to={"/ForgetPasword"}>Forgot Password</Link>
                </span>
              </div>
              <button type="submit" className=" btn btn-success w-100">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
