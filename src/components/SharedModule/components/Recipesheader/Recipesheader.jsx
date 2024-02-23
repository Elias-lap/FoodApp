/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"

function Recipesheader({bodyButton , LinkTo}) {

 let navigate = useNavigate();
 const NavigatTo =()=>{
  navigate(LinkTo)
 }
  return (
    <div className="container-fluid w-100">
      <div className="row  justify-content-between p-4  rounded-3 mx-auto   mt-2 bgGray ">
      <div className="col-md-6">
        <h5 className="fw-bolder">Fill The <span className="text-success">Recipes !</span></h5>
        <p>
        you can now fill the meals easily using the table and form , click here and sill it with the table !
        </p>
      </div>

      <div className="col-md-4 d-flex justify-content-end align-items-sm-start ">
        <button onClick={()=>NavigatTo()} className="btn btn-success">{bodyButton} <i className="fa-solid fa-arrow-right"></i></button>
      </div>
      </div>



      
    </div>
  )
}

export default Recipesheader
