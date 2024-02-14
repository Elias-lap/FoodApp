import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../../../assets/4 4.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function ResetPassword() {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const validatePassword = (value) => {
    // Check if password is at least 6 characters long
    if (value.length < 6) {
      return "The password must be at least 6 characters long.";
    }

    // Check if password contains at least one lowercase letter
    if (!/[a-z]/.test(value)) {
      return "The password must include at least one lowercase letter.";
    }

    // Check if password contains at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      return "The password must include at least one uppercase letter.";
    }

    // Check if password contains at least one digit
    if (!/\d/.test(value)) {
      return "The password must include at least one digit.";
    }

    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(value)) {
      return "The password must include at least one special character.";
    }

    // Password meets all requirements
    return true;
  };

  const onSubmit = async (data) =>// Making a POST request using axios
   // Set spinner to true before making the API call
  {
  setSpinner(true);
   try{
   const response=  await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Reset", data)
        // Handle success response
        toast(response.data.message)
        navigate('/')

   }catch(error) {
      // Handle error
    toast.error(error.response.data.message) 
  }finally{
    setSpinner(false); 
  }
}
  return (
    <div className="row vh-100    justify-content-center  align-items-center">
          <div className=" col-md-5    ">
            <div className="login  px-5 py-4 rounded-3 bg-white">
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                    <i className="fa-solid fa-lock" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=" OTP"
                      {...register("seed", {
                        required: "OTP is required ",
                      })}
                    />
                  </div>
                  {errors.seed && (
                    <div className="alert alert-danger ">
                      {errors.seed.message}
                    </div>
                  )}
                  <div className="input-group mb-4">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" />

                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", {
                        required: "password is required ",
                        validate :validatePassword
                      })}
                    />
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger ">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="input-group mb-4">
                    <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-lock" />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      {...register("confirmPassword", {
                        required: "password is required ",
                        min :{
                          value :6,  
                          message :"must be more than 6"}
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="alert alert-danger ">
                      {errors.password.message}
                    </div>
                  )}
                            <button type="submit" className=" btn btn-success w-100">
                {spinner ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ResetPassword
