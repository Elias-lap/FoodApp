import imageNoData from "../../../../assets/Nodata (2).png";
import NoDataImage from "../../../../assets/Nodata (2).png";
import Header from "../../../SharedModule/components/Header/Header";
import image from "../../../../assets/recipes.png";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteComponent from "../../../SharedModule/components/DeleteComponent/DeleteComponent";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
function Favorites() {
  const RecipesItem = "Favorite Recipes";
  const paragraph =
    "You can now add your items that any user can order it from the Application and you can edit";
  const token = localStorage.getItem("adminToken");
  const [favoriteList, setfavoriteList] = useState([]);

  const getDatafavorite = async () => {
    try {
      let FavoriteList = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/userRecipe/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setfavoriteList(FavoriteList?.data?.data);
      console.log(FavoriteList?.data?.data);
    } catch (error) {
      // Handle error if needed
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
        `https://upskilling-egypt.com:443/api/v1/userRecipe/${deleteItemId}
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
      toast.success("The selected item has been removed from favorites.");
      handleCloseDelete();
      getDatafavorite();
    } catch (error) {
      // Handle error
      toast.error("Failed to remove the item from favorites. Please try again later.");
    } finally {
      setSpinner(false);
    }
  };


  //  ///////////call Api
  useEffect(() => {
    getDatafavorite();
  }, []);

  return (
    <>
      <div className=" container ">
        <Header pathimage={image} title={RecipesItem} description={paragraph} />
        <DeleteComponent
        showModalDelete={showModalDelete}
        handleCloseDelete={handleCloseDelete}
        deleteItemId={deleteItemId}
        functionDelete={deleteItemRecip}
        spinner={spinner}
      />
      </div>

      <div className="container">
        {favoriteList.length <= 0 ? (
          <div className="  w-100  text-center">
            <img className=" w-75 " src={imageNoData} alt="image" />
          </div>
        ) : (
          <div className="row text-center p-3 ">
            {favoriteList?.map((fav) => {
              return (
                <>
                    <motion.div
                  key={fav.id}
                  className="col-md-4"
                  whileHover={{ scale: 1.05 }} // Example hover animation
                >
                
                    <div className="card mb-2 shadow-lg position-relative">
                      <button
                        className=" btn  w-100 text-end position-absolute top-0 end-0"
                         onClick={() => {
                          handleShowDelete();
                          setDeleteItemId(fav.id);
                        }}
                      >
                        {" "}
                        <i className="fa-solid fa-heart text-success  fs-3 border border-2 border-black p-2 rounded-3"></i>
                      </button>
                      {fav?.recipe?.imagePath == "" ? (
                        <img
                          className=" card-img-top h-fixed"
                          src={NoDataImage}
                        ></img>
                      ) : (
                        <img
                          className=" card-img-top h-fixed "
                          src={`https://upskilling-egypt.com/${fav.recipe.imagePath}`}
                        ></img>
                      )}
                      <h5 className="card-title">{fav.recipe.name}</h5>
                      <div className="card-body">
                        <p className="card-text">
                          {fav.recipe.description == "undefined" ||
                          fav.recipe.description.length < 10
                            ? " Enjoy the timeless simplicity of our classic vanilla cupcakes. Moist and fluf "
                            : fav.recipe.description}
                        </p>
                      </div>
                    </div>
                
                  </motion.div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
