
import image from "../../../../assets/recipes.png"
import Header from "../../../SharedModule/components/Header/Header"
function UserList() {
  const RecipesItem= 'Users  List';
  const paragraph  = 'You can now add your items that any user can order it from the Application and you can edit'
  return (
    <div>
      <Header pathimage={image}  title={RecipesItem}  discrirtion={paragraph}/>
    </div>
  )
}

export default UserList
