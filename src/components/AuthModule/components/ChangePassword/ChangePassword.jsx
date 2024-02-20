/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import logo from "../../../../assets/4 4.png";
function ChangePassword({ handleClose }) {
  const token = localStorage.getItem("adminToken");
  const [spinner, setSpinner] = useState(false);
  // for password
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1((prevState) => !prevState);
  };
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };
  // //////////
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();
  // Custom validation function to check if passwords match
  const validatePasswordMatch = (value) => {
    const password = watch("newPassword"); // Get the value of the "newPassword" field
    return value === password || "Passwords do not match"; // Return error message if passwords don't match
  };
  const onSubmit = async (
    data // Making a POST request using axios
  ) =>
    // Set spinner to true before making the API call
    {
      setSpinner(true);
      try {
        const response = await axios.put(
          "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Handle success response
        toast(response.data.message);
        handleClose();
        reset();
      } catch (error) {
        // Handle error
        toast.error(error.response.data.message);
      } finally {
        setSpinner(false);
      }
    };
  return (
    <>
      <div className="logo-cont  text-center    ">
        <img src={logo} alt={logo} className="w-50   h-25" />
      </div>
      <h3>Reset Password</h3>
      <p className="text-muted"> Please Enter Your New Password</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="oldPassword"
            {...register("oldPassword", {
              required: "password is required ",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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
        {errors.oldPassword && (
          <div className="alert alert-danger ">
            {errors.oldPassword.message}
          </div>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock" />
          </span>
          <input
            type={showPassword1 ? "text" : "password"}
            className="form-control"
            placeholder="New password"
            {...register("newPassword", {
              required: "password is required ",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
              },
            })}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePasswordVisibility1}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
        {errors.newPassword && (
          <div className="alert alert-danger ">
            {errors.newPassword.message}
          </div>
        )}
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-lock" />
          </span>
          <input
            type={showPassword2 ? "text" : "password"}
            className="form-control"
            placeholder="confirmNewPassword"
            {...register("confirmNewPassword", {
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
        {errors.confirmNewPassword && (
          <div className="alert alert-danger ">
            {errors.confirmNewPassword.message}
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
    </>
  );
}

export default ChangePassword;
