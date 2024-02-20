/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Navbar({ adminData }) {
  
  return (
    <div className="m-3">
      <nav className="navbar ms navbar-expand-lg bg-dark-subtle rounded-3 justify-content-between">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <form className="d-flex  flex-grow-1 " role="search">
              <input
                className="form-control me-2 w-60  mb-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            
            <ul className="navbar-nav  d-flex align-items-center g-3 mb-lg-0">
              
              <li className="d-flex g-2  ">
              <span className="me-2"><i className="fa-regular fa-circle-user"></i></span>
                <h6 className="  text-dark">{adminData?.userName}</h6>
              </li>
              <li className="mx-3 mb-1">
              <i className="fa-solid fa-bell "></i>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
