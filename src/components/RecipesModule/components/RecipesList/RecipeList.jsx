import Header from "../../../SharedModule/components/Header/Header";
import image from "../../../../assets/recipes.png";
import imageNoData from "../../../../assets/Nodata (2).png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
import { toast } from "react-toastify";
import DeleteComponent from "../../../SharedModule/components/DeleteComponent/DeleteComponent";
function RecipeList() {
  const RecipesItem = "Recipes Items";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  let navigate = useNavigate();
  // Get All Recipes ?/////////////////////////////////////////////////////
  const token = localStorage.getItem("adminToken");
  const [RecipList, setRecipList] = useState([]);

  const getData = async () => {
    try {
      let RecipList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipList(RecipList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   //  Delete data  from  all Recipe
  // const [spinner, setSpinner] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = () => setShowModalDelete(true);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to hold the id of the item to be deleted
  const DeleteItemRecip = async (deleteItemId) => {
    // setSpinner(true)
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${deleteItemId}
        `,
        // The data to be sent in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type of the request body
          },
        }
      );
      console.log(response.data);
      // Handle success response
      toast.success("Delete is successfully");
    } catch (error) {
      // Handle error
      console.log(error);
    } finally {
      // setSpinner(false); // Set spinner back to false after the API call completes
      handleCloseDelete();
      getData();
    }
  };

  //  ///////////call Api

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Modal Delete  */}
      {/* <Modal show={showModalDelete} onHide={handleCloseDelete}>
        <div className="w-80 d-flex justify-content-end mt-4 ">
          <span
            role="button"
            onClick={() => handleCloseDelete()}
            className=" iconClose  d-flex fa fa-close   text-danger "
          ></span>
        </div>
        <Modal.Body>
          <div className="text-center">
            <img src={imageDelete} alt="" />
            <h5>Delete This Category ?</h5>
            <p className="text-secondary">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>

          <div className="text-end w-100">
            <button
              onClick={() => {
                DeleteItem(deleteItemId);
              }}
              className=" btn btn-outline-danger "
            >
              Delete This item
            </button>
          </div>
        </Modal.Body>
      </Modal> */}
      <DeleteComponent
        showModalDelete={showModalDelete}
        handleCloseDelete={handleCloseDelete}
        deleteItemId={deleteItemId}
        functionDelete={DeleteItemRecip}
      />
      {/* End Modal Delete  */}
      <Header pathimage={image} title={RecipesItem} discrirtion={paragraph} />
      <div className="container-fluid w-100">
        <div className="row  mx-auto rounded-3 mt-3  justify-content-between ">
          <div className="col-md-6">
            <h3>Recipe Table Details</h3>
            <h5>You can check all details</h5>
          </div>

          <div className="col-md-4  d-flex justify-content-end align-items-sm-start ">
            <button
              onClick={() => navigate("/dashboard/CreatRecipes")}
              className="btn btn-success"
            >
              Add New Item <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {RecipList.length == 0 ? (
            <div className="  w-100  text-center">
              <img className=" w-75 " src={imageNoData} alt="image" />
            </div>
          ) : (
            <table className="table-responsive text-center ">
              <thead className="bg-info-subtle">
                <tr className="bg-gray">
                  <th scope="col">#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Descriptiopn</th>
                  <th scope="col">tag</th>
                  <th scope="col">Category</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className=" text-center w-100 mx-auto">
                {RecipList.map((recip) => {
                  return (
                
                      <tr key={recip.id}>
                        <th scope="row">{recip.id}</th>
                        <td>
                          {recip?.name == "undefined" ? "Recipe" : recip?.name}
                        </td>
                        <td className="w-10 text-center">
                          {recip.imagePath[0]? (
                            <img
                              className="w-100 h-100"
                              src={`https://upskilling-egypt.com/${recip.imagePath}`}
                            ></img>
                          ) : (
                            // <i className="fa-solid fa-user-secret"></i>
                            <div className="w-100 h-100">
                              <NoDataImage />
                            </div>
                          )}
                        </td>
                        <td>{recip?.price}  $</td>
                        <td> {recip.description}</td>
                        <td> {recip.tag.name}</td>
                        <td>{recip?.category[0]?.name}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-secondary  dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></button>
                            <ul className="dropdown-menu ">
                              <div className="d-flex flex-column ">
                                <button
                                  onClick={() => {
                                    handleShowDelete();
                                    setDeleteItemId(recip.id);
                                  }}
                                  className="fa fa-trash btn  "
                                ></button>
                                <Link
                                  to={`/dashboard/CreatRecipes/${recip.id}`}
                                  className="fa fa-pen-to-square btn"
                                ></Link>
                              </div>
                            </ul>
                          </div>
                        </td>
                      </tr>
                
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default RecipeList;
