/* eslint-disable react/prop-types */
import Header from "../../../SharedModule/components/Header/Header";
import image from "../../../../assets/recipes.png";
import imageNoData from "../../../../assets/Nodata (2).png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
import { toast } from "react-toastify";
import DeleteComponent from "../../../SharedModule/components/DeleteComponent/DeleteComponent";
function RecipeList({ adminData }) {
  const RecipesItem = "Recipes Items";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  // Get All Recipes ?/////////////////////////////////////////////////////
  const token = localStorage.getItem("adminToken");
  const [RecipeList, setRecipeList] = useState([]);
  const [SearchName, setSearchName] = useState(" ");
  const [SearchByTag, setSearchByTag] = useState(" ");
  const [SearchByCat, setSearchByCat] = useState(" ");
  const [Pagination, setPagination] = useState([]);
  const getData = async (pageNumber, pagesize, Name, ByTag, ByCat) => {
    try {
      let RecipList = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pageNumber: pageNumber,
            pageSize: pagesize,
            name: Name,
            tagId: ByTag,
            categoryId: ByCat,
          },
        }
      );
      setRecipeList(RecipList?.data?.data);
      setPagination(
        Array(RecipList?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // 1 - get categories for serach
  const [categoriesList, setcategoriesList] = useState([]);
  const getDataCategories = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com/api/v1/Category/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcategoriesList(categoriesList?.data?.data);
    } catch (error) {
      // toast.error(
      //   "An error occurred while fetching the category. Please try again later."
      // );
    }
  };
  // 2 Get All tags from Api
  const [tagIdList, settagIdList] = useState([]);
  const getDatatagIdList = async () => {
    try {
      let Tags = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/tag/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      settagIdList(Tags?.data);
    } catch (error) {
      toast.error(
        "An error occurred while fetching the tags. Please try again later."
      );
    }
  };
  //   //  Delete data  from  all Recipe
  const [spinner, setSpinner] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = () => setShowModalDelete(true);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to hold the id of the item to be deleted
  const deleteItemRecip = async (deleteItemId) => {
    setSpinner(true);
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
      toast.success("The selected item has been successfully deleted.");
      handleCloseDelete();
      getData();
    } catch (error) {
      // Handle error
      toast.error("Failed to delete data. Please try again later.");
    } finally {
      setSpinner(false);
    }
  };

  // functions for search and Filters
  const SearchByName = (e) => {
    setSearchName(e.target.value);
    getData(1, 10, e.target.value, SearchByTag, SearchByCat);
  };
  const SearchByCatFun = (e) => {
    setSearchByCat(e.target.value);
    getData(1, 10, SearchName, SearchByTag, e.target.value);
  };
  const SearchByTagFun = (e) => {
    setSearchByTag(e.target.value);
    getData(1, 10, SearchName, e.target.value, SearchByCat);
  };

  // Add to favorite from user
  const onSubmitTofavorites = async (id) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        { recipeId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type of the request body
          },
        }
      );
      // Handle success response
      console.log(response);
      toast.success("Item added to favorites!");
    } catch (error) {
      // Handle error
      toast.error(error.response.data.message);
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
    }
  };

  //  ///////////call Api
  useEffect(() => {
    getData(1, 10);
    getDatatagIdList();
    getDataCategories();
  }, []);

  return (
    <>
      <DeleteComponent
        showModalDelete={showModalDelete}
        handleCloseDelete={handleCloseDelete}
        deleteItemId={deleteItemId}
        functionDelete={deleteItemRecip}
        spinner={spinner}
      />
      {/* End Modal Delete  */}
      <Header pathimage={image} title={RecipesItem} description={paragraph} />
      <div className="container-fluid w-100">
        <div className="row  mx-auto rounded-3 mt-3  justify-content-between ">
          <div className="col-md-6">
            <h3>Recipe Table Details</h3>
            <h5>You can check all details</h5>
          </div>
          {adminData?.userGroup == "SuperAdmin" ? (
            <div className="col-md-4  ">
              <Link className="btn btn-success " to={"/dashboard/CreatRecipes"}>
                Add New Item <i className="fa-solid fa-arrow-right"></i>
              </Link>
              {/* filter  */}
            </div>
          ) : (
            ""
          )}

          <div className="row  my-3 ">
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
            <div className=" col-md-3 mb-2">
              <div className="input-group  ">
                <select
                  className="form-control "
                  onChange={(e) => {
                    SearchByTagFun(e);
                  }}
                >
                  <option selected>
                    Search By tag
                    <i className="fa-solid fa-caret-down  "></i>
                  </option>{" "}
                  {/* Placeholder */}
                  {tagIdList?.map((tagId) => (
                    <option key={tagId.id} value={tagId.id}>
                      {tagId.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className=" col-md-3 ">
              <div className="input-group ">
                <select
                  onChange={(e) => {
                    SearchByCatFun(e);
                  }}
                  className="form-control bg-body "
                >
                  <option selected value>
                    category
                  </option>{" "}
                  {/* Placeholder */}
                  {categoriesList.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {RecipeList.length == 0 ? (
            <div className="  w-100  text-center">
              <img className=" w-75 " src={imageNoData} alt="image" />
            </div>
          ) : (
            
              
            
                <div className="container">
                    <div className="table-responsive">
                      <table className=" table   ">
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
                          {RecipeList.map((recip) => {
                            return (
                              <tr key={recip.id}>
                                <th scope="row">{recip.id}</th>
                                <td>
                                  {recip?.name == "undefined"
                                    ? "Recipe"
                                    : recip?.name}
                                </td>
                                <td className="w-10 text-center">
                                  {recip.imagePath[0] ? (
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
                                <td>{recip?.price} $</td>
                                <td> {recip.description}</td>
                                <td> {recip.tag.name}</td>
                                <td>{recip?.category[0]?.name}</td>
                                <td>
                                  {adminData?.userGroup == "SystemUser" ? (
                                    <button
                                      className=" btn "
                                      onClick={() => onSubmitTofavorites(recip.id)}
                                    >
                                      {" "}
                                      <i className="fa-solid fa-heart text-danger"></i>
                                    </button>
                                  ) : (
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
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                </div>
            
            
            
          )}
        </div>
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
                  onClick={() => {
                    getData(pag, 20);
                  }}
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

export default RecipeList;
