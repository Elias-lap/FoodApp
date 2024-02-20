import Header from "../../../SharedModule/components/Header/Header"
import image from "../../../../assets/recipes.png"
function RecipeList() {
  const RecipesItem= 'Recipes Items';
  const paragraph  = 'You can now add your items that any user can order it from the Application and you can edit'
  return (
  <Header pathimage={image}  title={RecipesItem}  discrirtion={paragraph}/>
  )
}

export default RecipeList
