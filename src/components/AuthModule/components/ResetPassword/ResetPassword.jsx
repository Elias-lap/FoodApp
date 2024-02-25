import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../../../assets/4 4.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function ResetPassword() {
  const [spinner, setSpinner] = useState(false);
  // for password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };
  // //////////
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,

    formState: { errors },
  } = useForm();
  // Custom validation function to check if passwords match
  const validatePasswordMatch = (value) => {
    const password = watch("password"); // Get the value of the "password" field
    return value === password || "Passwords do not match"; // Return error message if passwords don't match
  };

  const onSubmit = async (
    data // Making a POST request using axios
  ) =>
    // Set spinner to true before making the API call
    {
      setSpinner(true);
      try {
        const response = await axios.post(
          "https://upskilling-egypt.com:443/api/v1/Users/Reset",
          data
        );
        // Handle success response
        toast(response.data.message);
        navigate("/");
      } catch (error) {
        // Handle error
        toast.error(error.response.data.message);
      } finally {
        setSpinner(false);
      }
    };
  return (
    <div className="row  vh-100  justify-content-center  align-items-center">
      <div className=" col-md-5  h-75 overflow-auto    bg-white">
        <div className="   px-5 py-4 rounded-3 ">
          <div className="logo-cont  text-center    ">
            <img src={logo} alt={logo} className="w-50   h-25" />
          </div>
          <h3>Reset Password</h3>
          <p className="text-muted">
            {" "}
            Please Enter Your Otp Or Check Your Inbox
          </p>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2 ">
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
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="OTP"
                  {...register("seed", {
                    required: "OTP is required ",
                  })}
                />
              </div>
              {errors.seed && (
                <div className="alert alert-danger ">{errors.seed.message}</div>
              )}
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock" />
                </span>
                <input
                   type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Password"
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
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock" />
                </span>
                <input
                   type={showPassword2 ? "text" : "password"}
                  className="form-control"
                  placeholder="New password"
                  {...register("confirmPassword", {
                    required: "password is required ",
                    validate: validatePasswordMatch,
                  })}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility2}
                >
                  <i className="fa-solid fa-eye"></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="alert alert-danger ">
                  {errors.password.message}
                </div>
              )}
              <button type="submit" className=" btn btn-success w-100">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
