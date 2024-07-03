// handles http requests 
import axios from 'axios' 
import {REACT_APP_BACKEND_SERVER_API} from '@env'
const apiURL = REACT_APP_BACKEND_SERVER_API+'recipes/'
// get saved recipes  
export const getSavedRecipes = async ( uuid )=>{

    
    // for protected routes 
    const config ={
        params:{
            uuid: uuid
        }
    }
    const response = await axios.get(apiURL, config)
    return response.data // list of user recipes  
}

export const saveRecipe = async ( recipeData , uuid)=>{


    // for protected routes 

    // change the recipe data into the correct format 
    const formattedData = {
        
    }

    const response = await axios({
        method: "POST",
        url: apiURL,
        headers:{},
        data:{
            name:recipeData.title,
            cookTime:recipeData.readyInMinutes,
            ingredients: recipeData.extendedIngredients ,
            apiID:recipeData.id,
            instructions:recipeData.instructions,
            sourceUrl:recipeData.sourceUrl,
            image:recipeData.image,
            uuid:uuid
        }
    })

    return response.data 
}
export const deleteRecipe = async ( id ,uuid)=>{


    // for protected routes 
    const config ={
        data:{
            uuid:uuid
        }
    }
    const recipeData ={
        
    }
    const response = await axios.delete(apiURL+id,  config)

    return response.data.id
}

