/* eslint-disable react/prop-types */
import imageNoData from "../../../../assets/Nodata (2).png";
import Header from "../../../SharedModule/components/Header/Header";
import image from "../../../../assets/recipes.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DeleteComponent from "../../../SharedModule/components/DeleteComponent/DeleteComponent";

function CategoriestList() {
  // variables
  const RecipesItem = "Categories List";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  const [categoriesList, setcategoriesList] = useState([]);
  const token = localStorage.getItem("adminToken");
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to hold the id of the item to be deleted
  const [nameItem, setNameItem] = useState(""); // Update the nameItem state with the current item name;
  // eslint-disable-next-line no-unused-vars
  const [SearchName, setSearchName] = useState("");
  const [Pagination, setPagination] = useState([]);

  // 1_ calling api  Get All categories Data ?
  const getData = async (pageNumber, pagesize, Name) => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com/api/v1/Category/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            pageNumber: pageNumber,
            pageSize: pagesize,
            name: Name,
          },
        }
      );
      setcategoriesList(categoriesList?.data?.data);
      setPagination(
        Array(categoriesList?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      toast.error(
        "An error occurred while fetching data. Please try again later."
      );
    }
  };
  //2_ Modal  of add new category//  functions
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setNameItem(""); // Update the nameItem state with the current item name
    setValue("name", ""); // Set the value of the "name" input field to the current item name
  };
  // handel form in Modal add new category
  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setSpinner(true); // Set spinner to true before making the API call
    try {
      if (!data.name || !/^[a-zA-Z0-9\s]+$/.test(data.name)) {
        toast.error("Invalid category name.");
        return;
      }
      const response = await axios.post(
        "https://upskilling-egypt.com/api/v1/Category/",
        data, // The data to be sent in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type of the request body
          },
        }
      );
      console.log(response.data);
      // Handle success response
      toast.success("Add is successfully");
    } catch (error) {
      // Handle error
      console.log(error);
      toast.error(
        "An error occurred while adding the category. Please try again later."
      );
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
      handleClose();
      getData();
      reset();
    }
  };
  // 3_ Delete data  from  all category
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = () => setShowModalDelete(true);
  const DeleteItem = async (deleteItemId) => {
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:443/api/v1/Category/${deleteItemId}
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
      setSpinner(false); // Set spinner back to false after the API call completes
      handleCloseDelete();
      getData();
    }
  };
  // End Delete Functions

  // 4 - update Data Modal category
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseshowModalUpdate = () => {
    setShowModalUpdate(false);
  };
  const handleShowshowModalUpdate = (name) => {
    setShowModalUpdate(true);
    setNameItem(name); // Update the nameItem state with the current item name
    setValue("name", name); // Set the value of the "name" input field to the current item name
  };

  const Updateitem = async (data) => {
    try {
      if (!data.name || !/^[a-zA-Z0-9\s]+$/.test(data.name)) {
        toast.error("Invalid category name.");
        return;
      }
      const response = await axios.put(
        `https://upskilling-egypt.com:443/api/v1/Category/${deleteItemId}`,
        data,
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
      toast.success("update is successfully");
    } catch (error) {
      // Handle error
      toast.error(
        "An error occurred while updating the category. Please try again later."
      );
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
      handleCloseshowModalUpdate();
      getData();
      reset();
    }
  };
  // functions for search and Filters
  const SearchByName = (e) => {
    setSearchName(e.target.value);
    getData(1, 10, e.target.value);
  };

  //  call data
  useEffect(() => {
    getData(1, 5);
  }, []);

  return (
    <>
      {/*  start Modal of add new category */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group my-5 w-75  ">
              <input
                type="text"
                className="form-control bg-body"
                placeholder="Category Name"
                {...register("name", {
                  required: "name is required",
                })}
              />
            </div>
            {errors.name && (
              <div className="alert alert-danger w-auto ">
                {errors.name.message}
              </div>
            )}

            <div className=" d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* end Modal of add new category  */}
      {/*  start Modal of update new category */}
      <Modal show={showModalUpdate} onHide={handleCloseshowModalUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(Updateitem)}>
            <div className="input-group my-5 w-75  ">
              <input
                type="text"
                // value={nameItem}
                defaultValue={nameItem}
                className="form-control bg-body"
                placeholder="Category Name"
                {...register("name", {
                  required: "name is required",
                })}
              />
            </div>
            {errors.name && (
              <div className="alert alert-danger w-auto ">
                {errors.name.message}
              </div>
            )}

            <div className=" d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                {spinner ? (
                  <div className="spinner-border" role="status"></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* end Modal of update new category  */}
      {/* Modal Delete start   */}
      <DeleteComponent
        showModalDelete={showModalDelete}
        handleCloseDelete={handleCloseDelete}
        deleteItemId={deleteItemId}
        functionDelete={DeleteItem}
      />
      {/* end Modal Delete */}
      <div>
        <Header pathimage={image} title={RecipesItem} discrirtion={paragraph} />
      </div>
      <div className=" p-5 categories-container">
        <div className="title-info d-flex justify-content-between">
          <div className="info ">
            <h5 className="text-dark">Categories Table Details</h5>
            <h6 className="text-body-secondary">You can check all details</h6>
          </div>

          <div className="button">
            <button className="btn btn-success" onClick={handleShow}>
              Add New Category
            </button>
          </div>
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
        </div>

        <table className="table table-responsive  text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length == 0 ? (
              <img src={imageNoData} alt="" />
            ) : (
              categoriesList.map((item) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleShowshowModalUpdate(item.name),
                            setDeleteItemId(item.id);
                          setNameItem(item.name);
                        }}
                        className="btn btn-success me-1 mb-1"
                      >
                        update
                        <i className=" ms-1 fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleShowDelete(), setDeleteItemId(item.id);
                        }}
                      >
                        Delete
                        <i className=" ms-1 fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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
                  onClick={() => getData(pag, 5)}
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

export default CategoriestList;
