import {createSlice, createAsyncThunk}   from '@reduxjs/toolkit'
import recipeService from './recipeService'

// for every redux resource we have they are all going to have the bottom four
const initialState ={
    savedRecipes:[],
    isError: false, 
    isSuccess: false,
    isLoading:false, 
    message:'',

}

// get user's saved recipes 
export const getSavedRecipes = createAsyncThunk('recipes/getSavedRecipes', async( _ , thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await recipeService.getSavedRecipes( token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})

// save a recipe 
export const saveRecipe = createAsyncThunk('recipes/saveRecipe', async( recipeData , thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await recipeService.saveRecipe( recipeData,  token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})

// delete a recipe 
export const deleteRecipe = createAsyncThunk('recipes/deleteRecipe', async( id , thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await recipeService.deleteRecipe( id,  token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})
export const recipeSlice = createSlice({
    name:'ingredient',
    initialState, 
    reducers:{
        resetIngredientSlice: (state) =>
        {
            state.isLoading = false
            state.isSuccess = false; 
            state.isError = false; 
            state.message= ''; 
            state.savedRecipes= []; 

        },
        setCurrentSavedRecipe:(state)=>{

        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(getSavedRecipes.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getSavedRecipes.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            state.savedRecipes = action.payload; 
            
        })
        .addCase(getSavedRecipes.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(saveRecipe.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(saveRecipe.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            // since you can only update when you're not on the page you don't need to update something here 
        })
        .addCase(saveRecipe.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(deleteRecipe.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(deleteRecipe.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            // now add every recipe except the one where the ids are equal // May need to be changed later 
            let result =[]; 
            for (let i= 0; i< state.savedRecipes.length; i++)
            {
                if(state.savedRecipes[i]._id == action.payload.id)
                {
                    continue; 
                }
                //otherwise push the ingredients 
                result.push(state.savedRecipes[i]);
            }
            state.savedRecipes = result// remove the deleted recipes 
        })
        .addCase(deleteRecipe.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
    }
})




export const {resetRecipeSlice, setCurrentSavedRecipe}  = recipeSlice.actions

export default recipeSlice.reducer 