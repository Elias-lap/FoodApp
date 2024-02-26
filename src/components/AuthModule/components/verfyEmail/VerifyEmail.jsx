import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logo from "../../../../assets/4 4.png";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
function VerifyEmail() {

  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (
    data // Making a POST request using axios
  ) =>
    // Set spinner to true before making the API call
    {
      setSpinner(true);
      try {
        const response = await axios.put(
          "https://upskilling-egypt.com:443/api/v1/Users/verify",
          data
        );
        // Handle success response
        toast(response.data.message);
        navigate("/");
      } catch (error) {
        // Handle error
        toast.error("something wrong with your code ...");
      } finally {
        setSpinner(false);
      }
    };

  return (
    <div className="row  vh-100  justify-content-center  align-items-center">
      <div className=" col-md-5  overflow-auto    bg-white">
        <div className="   px-5 py-4 rounded-3 ">
          <div className="logo-cont  text-center    ">
            <img src={logo} alt={logo} className="w-50   h-25" />
          </div>
          <h3>verify account</h3>
          <p className="text-muted">
            {" "}
            Please Enter Your code Or Check Your Inbox
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
                  placeholder="code"
                  {...register("code", {
                    required: "code is required ",
                  })}
                />
              </div>
              {errors.code && (
                <div className="alert alert-danger ">{errors.code.message}</div>
              )}
            
      
              <button type="submit" className=" btn btn-success w-100 my-3">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "verify account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
