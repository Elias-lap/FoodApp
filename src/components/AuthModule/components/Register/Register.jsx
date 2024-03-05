/* eslint-disable react/prop-types */
import { Link, useNavigate,} from "react-router-dom";
import logo from "../../../../assets/4 4.png";
import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  //  variebels
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };
  // //////////

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
  const validateUserName = (value) => {
    // Regular expression to match characters followed by numbers without spaces
    const regex = /^[a-zA-Z]+[0-9]+$/;
    // Test the value against the regular expression
    const isValid = regex.test(value);
    // Return true if the value matches the pattern, otherwise return false
    return isValid || "Username must contain characters and end with numbers without spaces";
  };
  //  send Data to api
  const appendToFormData = (data) => {
    const recipeImageFile = data.profileImage[0];
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("recipeImage", recipeImageFile);
    return formData ;
  };

  const onSubmit = async (data) => {
    setSpinner(true); // Set spinner to true before making the API call
    console.log(data)
    let formData=appendToFormData(data)
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Users/Register",
        formData,
      );
      // Handle success response
      console.log(response)
      localStorage.setItem("adminToken", response?.data?.token);
    
      toast.success(response.message);
      navigate('/VerifyEmail')
    } catch (error) {
      // Handle error
      toast.error("The username or email already exists in the database.");
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
    }
  };

  return (
    <div className="row vh-100    justify-content-center  align-items-center">
      <div className=" col-md-9    ">
        <div className="login  px-5 py-4 rounded-3 bg-white">
          <div className="logo-cont  text-center    ">
            <img src={logo} alt={logo} className="w-50   h-25" />
          </div>
          <h3>Register</h3>
          <p className="text-muted"> welcome Back !Please enter your details</p>
          <div>
             <form onSubmit={handleSubmit(onSubmit)}>

              <div className="row d-flex justify-content-between">
                <div className="col-md-6">
                  <div className="input-group mb-4 w-100 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name "
                      {...register("userName", {
                        required: "Name  is required",
                        validate :validateUserName 
                      })}
                    />
                  </div>
                  {errors.userName && (
                    <div className="alert alert-danger ">
                      {errors.userName?.message}
                    </div>
                  )}
                  <div className="input-group mb-4 w-100 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your country  "
                      {...register("country", {
                        required: "country  is required",
                      })}
                    />
                  </div>
                  {errors.country && (
                    <div className="alert alert-danger ">
                      {errors.country?.message}
                    </div>
                  )}
                  <div className="input-group mb-4 w-100">
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
                      {errors.password?.message}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="input-group mb-4 w-100 ">
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "email is not valid ",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <div className="alert alert-danger ">
                      {errors.email?.message}
                    </div>
                  )}
                  <div className="input-group mb-4 w-100">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type={"tel"}
                      className="form-control"
                      placeholder="phoneNumber"
                      {...register("phoneNumber", {
                        required: "phoneNumber  is required ",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Phone number must be 10 digits",
                        },
                      })}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <div className="alert alert-danger ">
                      {errors.phoneNumber?.message}
                    </div>
                  )}
                  <div className="input-group mb-2 w-100">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock" />
                    </span>
                    <input
                      type={showPassword2 ? "text" : "password"}
                      className="form-control"
                      placeholder="confirm password"
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
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                <div className="input-group mb-4 w-100 ">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope" />
                    </span>
                    <label htmlFor="profileImage" className=" mt-2 mx-1">Profile Image:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profileImage"
                      placeholder="Enter your profileImage"
                      {...register("profileImage", {
                      })}
                    />
                  </div>
                  

                </div>
              </div>

              <div className=" d-flex w-100 justify-content-end mb-3 flex-wrap">
                <span>
                  <Link className=" text-success" to={"/"}>
                    Log Now ?
                  </Link>
                </span>
              </div>
              <button type="submit" className=" btn btn-success w-100">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
