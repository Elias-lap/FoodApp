/* eslint-disable react/prop-types */
import Header from "../../../SharedModule/components/Header/Header";
import image from "../../../../assets/recipes.png";
import imageDelete from "../../../../assets/Group 48102290.png";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NoDataImage from "../../../SharedModule/components/NoDataImage/NoDataImage";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CategoriestList() {
  const RecipesItem = "Categories List";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  // 1_ calling api  Get All categories Data ?
  const token = localStorage.getItem("adminToken");
  const [categoriesList, setcategoriesList] = useState([]);
  const getData = async () => {
    try {
      let categoriesList = await axios.get(
        "https://upskilling-egypt.com/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setcategoriesList(categoriesList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  //2_ Modal  of add new category//  functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setNameItem(''); // Update the nameItem state with the current item name
    setValue("name", ''); // Set the value of the "name" input field to the current item name
  };
  // handel form in Modal add new category
  const [spinner, setSpinner] = useState(false);
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
      console.log(response.data)
      // Handle success response
      toast.success("Add is successfully");
    } catch (error) {
      // Handle error
      console.log(error);
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
      handleClose();
      getData();
      reset();
    }
  };
  // 3_ Delete data  from  all category
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleCloseDelete = () => setShowModalDelete(false);
  const handleShowDelete = () => setShowModalDelete(true);
  const [deleteItemId, setDeleteItemId] = useState(null); // State to hold the id of the item to be deleted
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
  const [nameItem, setNameItem] = useState("");
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const handleCloseshowModalUpdate = () => {
    setShowModalUpdate(false)};
  const handleShowshowModalUpdate = (name) => {
    setShowModalUpdate(true)
    setNameItem(name); // Update the nameItem state with the current item name
    setValue("name", name); // Set the value of the "name" input field to the current item name
  }

  const Updateitem = async (data) => {
    try {
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
      console.log(error);
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
      handleCloseshowModalUpdate();
      getData();
      reset();
    }
  };

  //  call data
  useEffect(() => {
    getData();
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
                // onChange={(e) => setNameItem(e.target.value)}
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
      <Modal show={showModalDelete} onHide={handleCloseDelete}>
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
      </Modal>
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

        <table className="table  ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.length == 0 ? (
              <NoDataImage />
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
                           setNameItem(item.name)
                        }}
                        className="btn btn-success me-1 mb-1"
                      >
                        update
                        
                        <i className=" ms-1 fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          handleShowDelete(),
                           setDeleteItemId(item.id);
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
      </div>
    </>
  );
}

export default CategoriestList;
