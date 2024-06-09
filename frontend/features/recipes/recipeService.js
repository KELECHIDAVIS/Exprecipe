// handles http requests 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'
const apiURL = REACT_APP_BACKEND_SERVER_API+'recipes/'
// get saved recipes  
const getSavedRecipes = async ( token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(apiURL, config)
    return response.data // list of user recipes  
}

const saveRecipe = async ( recipeData, token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    
    // change the recipe data into the correct format 
    const formattedData = {
        name:recipeData.title,
        cookTime:recipeData.readyInMinutes,
        ingredients: recipeData.extendedIngredients ,
        apiID:recipeData.id,
        instructions:recipeData.instructions,
        sourceUrl:recipeData.sourceUrl,
        image:recipeData.image,
    }

    const response = await axios.post(apiURL,formattedData,  config)
    return response.data 
}
const deleteRecipe = async ( id, token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(apiURL+id,  config)
    return response.data 
}

 const recipeService = {
    getSavedRecipes, 
    saveRecipe,
    deleteRecipe,
}

export default recipeService; 