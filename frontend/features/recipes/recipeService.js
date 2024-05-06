// handles http requests 
import axios from 'axios' 

// get saved recipes  
const getSavedRecipes = async ( token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://192.168.1.35:5000/api/recipes/", config)
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
    const response = await axios.post("http://192.168.1.35:5000/api/recipes/",formattedData,  config)
    return response.data 
}
const deleteRecipe = async ( id, token )=>{
    // for protected routes 
    const config ={
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete("http://192.168.1.35:5000/api/recipes/"+id,  config)
    return response.data 
}

 const recipeService = {
    getSavedRecipes, 
    saveRecipe,
    deleteRecipe
}

export default recipeService; 