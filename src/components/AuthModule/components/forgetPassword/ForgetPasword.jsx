
import { useForm } from "react-hook-form";
import logo from "../../../../assets/4 4.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
function ForgetPasword({saveAdminData}) {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async(data) => 
  {
    setSpinner(true)
    try{
    const response = await axios.post("https://upskilling-egypt.com:443/api/v1/Users/Reset/Request", data)
    toast(response.data.message)
    navigate('/ResetPasword')
    saveAdminData()
    }catch (error){
      toast.error(error.response.data.message) 

    }finally{
      setSpinner(false)
    }
  }
  // Making a POST request using axios


  return (
    <div className="row vh-100    justify-content-center  align-items-center">
          <div className=" col-md-6    ">
            <div className="login  px-5 py-4 rounded-3 bg-white">
              <div className="logo-cont  text-center    ">
                <img src={logo} alt={logo} className="w-50   h-25" />
              </div>
              <h3>Forgot Your Password  ?</h3>
              <p className="text-muted fs-6  w-100 ">
                {" "}
                No Worries ! Please enter your email and we will send a password reset link 
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mt-4 mb-5  ">
                    <span className="input-group-text border border-0 bg-body-secondary " id="basic-addon1">
                      <i className="fa-solid fa-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control  border border-0 bg-body-secondary "
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
                        <button type="submit" className=" btn btn-success w-100">
                {spinner ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "submit"
                )}
              </button>
              
                </form>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ForgetPasword
