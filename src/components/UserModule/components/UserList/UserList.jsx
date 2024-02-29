/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import image from "../../../../assets/recipes.png";
import imageNoData from "../../../../assets/Nodata (2).png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
import { toast } from "react-toastify";
function UserList() {
  const RecipesItem = "Users  List";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  const token = localStorage.getItem("adminToken");
  const [userList, setUserList] = useState([]);
  const [Pagination, setPagination] = useState([]);

  const [SearchName, setSearchName] = useState("");
  const [SearchCountry, setSearchCountry] = useState("");
  const [SearchGroup, setSearchGroup] = useState();

  const getData = async (pageNumber, pagesize, Name ,country , group)  => {
    try {
      let UserList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pageNumber: pageNumber,
            pageSize: pagesize,
            userName: Name,
            country : country ,
            groups : group
          },
        }
      );
      setUserList(UserList?.data?.data);
      setPagination(
        Array(UserList?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      toast.error(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };
  // functions for search and Filters
  const SearchByName = (e) => {
    setSearchName(e.target.value);
    getData(1, 10, e.target.value , SearchCountry);
  };
  const SearchByCountry = (e) => {
    setSearchCountry(e.target.value);
    getData(1, 10, SearchName ,e.target.value );
  };
  const SearchByGroup = (e) => {
    setSearchGroup(e.target.value);
    getData(1, 10, SearchName ,SearchCountry ,e.target.value  );
  };

  //  call data
  useEffect(() => {
    getData( 1 , 10);
  }, []);

  return (
    <>
      <Header pathimage={image} title={RecipesItem} discrirtion={paragraph} />
      <div className="container ">
        <div className="  mx-auto rounded-3 mt-3  w-100 ">
            <h3>User Table Details</h3>
            <h5>You can check all details</h5>
          </div>
          <div className="row">
          <div className="col-md-6 ">
            <div className="input-group mb-3">
              {/* <i className="fa-solid fa-magnifying-glass "></i> */}
              <input
                type="text"
                className="form-control"
                placeholder="Search By Name "
                aria-label="Username"
                onChange={(e) => {
                  SearchByName(e);
                }}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="input-group mb-3">
              {/* <i className="fa-solid fa-magnifying-glass "></i> */}
              <input
                type="text"
                className="form-control"
                placeholder="Search By Country "
                aria-label="Username"
                onChange={(e) => {
                  SearchByCountry(e);
                }}
              />
            </div>
          </div>
          <div className=" col-md-3">
              <div className="input-group  ">
                <select
                  className="form-control "
                  onChange={(e) => {
                    SearchByGroup(e);
                  }}
                >
                  <option selected value={''}>
                    Search By Group
                    <i className="fa-solid fa-caret-down  "></i>
                  </option>{" "}
                <option value="1">admin</option>
                <option value="2">user</option>
                
                </select>
              </div>
            </div>
        </div>
          {userList.length == 0 ? (
            <div className="  w-100  text-center">
              <img className=" w-75 " src={imageNoData} alt="image" />
            </div>
          ) : (
          <div className="container  mt-3">
            <div className="table-responsive">
                <table className="table  text-center ">
                  <thead className="bg-info-subtle">
                    <tr className="bg-gray">
                      <th scope="col"> #</th>
                      <th scope="col"> Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Image</th>
                      <th scope="col"></th>
                      <th scope="col">Phone</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user) => {
                      return (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td className="w-10 text-center">
                            {user.imagePath ? (
                              <img
                                className="w-100 h-100"
                                src={`https://upskilling-egypt.com/${user.imagePath}`}
                              ></img>
                            ) : (
                              // <i className="fa-solid fa-user-secret"></i>
                              <div className="w-100 h-100">
                                <NoDataImage />
                              </div>
                            )}
                          </td>
                          <td></td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.country}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
            </div>
          </div>
          )}
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {Pagination.map((pag) => {
                return (
                  <li
                    onClick={() => getData(pag, 10)}
                    key={pag}
                    className="page-item"
                  >
                    <a className="page-link">{pag}</a>
                  </li>
                );
              })}

              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        
      </div>
    </>
  );
}

export default UserList;
