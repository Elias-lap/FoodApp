import { useEffect, useState } from "react";
import image from "../../../../assets/recipes.png";
import imageNoData from "../../../../assets/Nodata (2).png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
function UserList() {
  const RecipesItem = "Users  List";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  const token = localStorage.getItem("adminToken");
  const [userList, setUserList] = useState([]);

  const getData = async () => {
    try {
      let UserList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserList(UserList?.data?.data);
      console.log(UserList);
    } catch (error) {
      console.log(error);
    }
  };
  //  ///////////call Api

  //  call data
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header pathimage={image} title={RecipesItem} discrirtion={paragraph} />
      <div className="container-fluid ">
        <div className="row  mx-auto rounded-3 mt-3  justify-content-between ">
          <div className="col-md-6">
            <h3>Recipe Table Details</h3>
            <h5>You can check all details</h5>
          </div>

        <div className=" p-4 table-responsive text-center ">
            <table className="table text-center table-striped">
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
                {userList.length == 0 ? (
                  
                
                <div className=" w-100 text-center">
                    <img className=" w-100 h-100"  src={imageNoData} alt="image" />
                        
                </div>
                
                ) : (
                  userList.map((user) => {
                    return (
                      <>
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td className="w-10 text-center">
                            {user.imagePath ? (
                              <img className="w-100 h-100" src={`https://upskilling-egypt.com/${user.imagePath}`}></img>
                            ) : (
                              // <i className="fa-solid fa-user-secret"></i>
                          <div className="w-100 h-100">
                                <NoDataImage/>
                          </div>
                            )}
                          </td>
                          <td></td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.country}</td>
                        </tr>
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;
