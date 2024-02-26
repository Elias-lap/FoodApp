/* eslint-disable react/prop-types */


function Header( {title , description ,pathimage }) {
  return (
    <div className="  container-fluid  container-header p-5 rounded-3 ">
      <div className="row   justify-content-between  ">
        <div className=" col-md-5  d-flex align-items-center  justify-content-center ">
          <div className="body-content">
                 <h3 className="color1">{title}</h3>
               <p className="color1"> {description} </p>
          </div>
        </div>

     <div className="col-md-3">
        <div className="home-image text-center ">
          <img src={pathimage} className='w-75' alt="image" />
        </div>

     </div>
      </div>
      
    </div>
  )
}

export default Header
