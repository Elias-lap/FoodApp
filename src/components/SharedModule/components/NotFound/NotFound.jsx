import "./NotFound.css";
import vectorImage from "../../../../assets/Vector.png";
import image404 from "../../../../assets/404.png";
import image from "../../../../assets/4 4.png";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="w-100 vh-100 NotFound  ">
      <div className="container  vh-100 ">
        <div className="box-image-vector vh-100">
          <img className="h-100" src={vectorImage} alt="vectorImage" />
        </div>
        <div className="box-image-2 ">
          <img src={image404} alt="image404" />
        </div>
        <div className=" home-page row  ">
          <div className=" col-md-6  box-image mt-3">
            <img src={image} alt="image" />

            <h2 className="mt-5  ">Oops.... </h2>
            <h3>Page not found </h3>
            <p>
              This Page doesn’t exist or was removed! We suggest you back to
              home.
            </p>

            <Link to={'/dashboard'} className=" btn btn-success w-100">
            <i className="fa-solid fa-arrow-left p-2"></i>
                    Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
