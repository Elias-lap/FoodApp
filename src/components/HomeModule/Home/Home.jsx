/* eslint-disable react/prop-types */
import pathimage from '../../../assets/vegan.png'
import Header from '../../SharedModule/components/Header/Header'
import Recipesheader from "../../SharedModule/components/Recipesheader/Recipesheader"



function Home(  {adminData } ) {
  const discrirtion = 'This is a Welcoming screen for the entry of the applications , you can now see the options'
  const titlehome = `Welcome :${adminData?.userName}`
  return (
  <>
    <Header pathimage= {pathimage} title ={titlehome}  discrirtion ={discrirtion}  />
    <Recipesheader bodyButton={'Fill Recipes'} LinkTo ={"CreatRecipes"} />
  </>
  )
}

export default Home
