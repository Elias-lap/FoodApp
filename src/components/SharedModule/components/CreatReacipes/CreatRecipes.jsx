import { useForm } from "react-hook-form";
import Recipesheader from "../Recipesheader/Recipesheader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function CreatRecipes() {
  // 1 - get categories for add new Recipes
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
      toast.error("An error occurred while fetching the category. Please try again later.");
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
      toast.error("An error occurred while fetching the tags. Please try again later.");
    }
  };
  // 3  // 1-Append Data To Form Data
  //    2- send Form Data To Api
  //   
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false);
  const token = localStorage.getItem("adminToken");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const appendToFormData = (data) => {
    const recipeImageFile = data.recipeImage[0];
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", recipeImageFile);
    return formData ;
  };

  const onSubmit = async (data) => {
    console.log(data)
    setSpinner(true); // Set spinner to true before making the API call
    let recipeData =  appendToFormData(data)
    
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:443/api/v1/Recipe/",
        recipeData, // The data to be sent in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multiple/form-data", // Specify the content type of the request body
          },
        }
      );
    console.log(response)
      // Handle success response
      toast.success("Add is successfully");
    } catch (error) {
      // Handle error
      toast.error("An error occurred while fetching the adding the Recipe. Please try again later.");
    } finally {
      setSpinner(false); // Set spinner back to false after the API call completes
      // setValue();
      reset();
      navigate("/dashboard/RecipesList")
    }
  };

  // 3 -"Get specific recipe for update"
  let param = useParams()
  const getSpecificData = async () => {
    try {
      let RecipList = await axios.get(
        `https://upskilling-egypt.com:443/api/v1/Recipe/${param.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    console.log(RecipList)
         // Set default values using setValue
         setValue("name", RecipList.data.name);
         setValue("price", RecipList.data.price);
         setValue("description", RecipList.data.description);
         setValue("tagId", RecipList.data.tag.id);
         setValue("categoriesIds", RecipList.data.category[0].id);
         setValue("recipeImage", RecipList.imagePath);
      
    } catch (error) {
      console.log(error);
    }
  };
//  4 - update specific recipe 
const onSubmitUpdate = async (data) => {
  setSpinner(true); // Set spinner to true before making the API call
  let recipeData =  appendToFormData(data)
  try {
    const response = await axios.put(
      `https://upskilling-egypt.com:443/api/v1/Recipe/${param.id}`,
      recipeData, // The data to be sent in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multiple/form-data",  // Specify the content type of the request body
        },
      }
    );
    console.log(response.data)
    // Handle success response
    toast.success("Add is successfully");
  } catch (error) {
    // Handle error
    console.log(error);
    toast.error("Failed to update recipe");
    
    
  }finally{
    navigate("/dashboard/RecipesList")
    setSpinner(false);
  }
};
  //  call data
  useEffect(() => {
  
    getData();
    getDatatagIdList();
    getSpecificData();
  }, []);

  //
  return (
    <div className=" container-fluid ">
      <Recipesheader bodyButton={"All Recipes"} LinkTo={"/dashboard/RecipesList"} />

      
      
          <div className=" d-flex justify-content-center mt-4 ">
               <form  className=" w-75"  onSubmit={handleSubmit(param.id ? onSubmitUpdate : onSubmit)}>
              <div className="input-group my-1 w-100  ">
                <input
                  type="text"
                  className="form-control bg-body "
                  placeholder="Enter recipe Name"
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
              <div className="input-group w-100  d-flex justify-content-between ">
                <select
                  className="form-control "
                  {...register("tagId", {
                    required: "category is required",
                  })}
                >
                  <option selected value>
                    tag
                    <i className="fa-solid fa-caret-down  "></i>
                  </option>{" "}
                  {/* Placeholder */}
                  {tagIdList.map((tagId) => (
                    <option key={tagId.id} value={tagId.id}>
                      {tagId.name}
                    </option>
                  ))}
                </select>
              </div>
            
              {errors.tagId && (
                <div className="alert alert-danger w-auto ">
                  {errors.tagId.message}
                </div>
              )}
            
              <div className="input-group my-1 w-100 ">
                <input
                  type="number"
                  className="form-control bg-body"
                  placeholder="price"
                  {...register("price", {
                    required: "price  is required",
                  })}
                />
              </div>
            
              {errors.price && (
                <div className="alert alert-danger w-auto ">
                  {errors.price.message}
                </div>
              )}
            
              <div className="input-group my-1 w-100  ">
                <select
                  className="form-control bg-body "
                  {...register("categoriesIds", {
                    required: "category is required",
                  })}
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
            
              {errors.categoriesIds && (
                <div className="alert alert-danger w-auto ">
                  {errors.categoriesIds.message}
                </div>
              )}
              <div className="input-group my-1 w-100  ">
                <input
                
                  type="file"
                  className="form-control bg-body"
                  {...register("recipeImage", {
                    required: "Image is required",
                  })}
                />
              </div>
            
              {errors.recipeImage && (
                <div className="alert alert-danger w-auto ">
                  {errors.recipeImage.message}
                </div>
              )}
            
              <div className="input-group my-1 w-100 ">
                <textarea
                  type="text"
                  className="form-control bg-body"
                  placeholder="description "
                  {...register("description", {
                    required: "description  is required",
                  })}
                />
              </div>
            
              {errors.description && (
                <div className="alert alert-danger w-auto ">
                  {errors.description.message}
                </div>
              )}
            
              <div className=" ">
                <button type="submit" className="btn btn-success">
                  {spinner ? (
                    <div className="spinner-border" role="status"></div>
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </form>
          </div>
          
      
    </div>
  );
}

export default CreatRecipes;
