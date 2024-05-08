import {createSlice, createAsyncThunk}   from '@reduxjs/toolkit'
import ingredientService from './ingredientService'

// for every redux resource we have they are all going to have the bottom four
const initialState ={
    ingredients:[],
    recipes:[],
    currentRecipe: null, 
    isError: false, 
    isSuccess: false,
    isLoading:false, 
    message:''
}

// Create New ingredient 
export const createIngr = createAsyncThunk('ingredients/createIngr', async(ingrData, thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await ingredientService.createIngr(ingrData, token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Setting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})
// Delete ingredient 
export const deleteIngr = createAsyncThunk('ingredients/deleteIngr', async(id, thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        
        return await ingredientService.deleteIngr(id, token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Setting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})

// get all user's ingredients 
export const getIngrs = createAsyncThunk('ingredients/getAll', async(_, thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await ingredientService.getIngrs( token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})
// get all user's ingredients 
export const getRecipes = createAsyncThunk('ingredients/getRecipes', async(_, thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        const token = thunkAPI.getState().auth.userToken;  
        return await ingredientService.getPossibleRecipes( token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})

// get currect recipe information  
export const getRecipeInfo = createAsyncThunk('ingredients/getRecipeInfo', async( id , thunkAPI)=>{
    try {
        // have to send token since this is a protected route; 
        // usertoken is in auth state 
        // use thunkapi to get auth state
        
        const token = thunkAPI.getState().auth.userToken;  
        return await ingredientService.getRecipeInfo( id, token) 
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        //console.log(`Error In Getting Ingredient: ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})


export const ingredientSlice = createSlice({
    name:'ingredient',
    initialState, 
    reducers:{
        resetIngredientSlice: (state) =>
        {
            state.isLoading = false
            state.isSuccess = false; 
            state.isError = false; 
            state.message= ''; 
            //state.recipes = [];  // might not need to be reset each reset slice 
        }  // reset everything but ingredients 
    },
    extraReducers:(builder) =>{
        builder
        .addCase(createIngr.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(createIngr.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            state.ingredients.unshift (action.payload)// push ingredient to list 
            
        })
        .addCase(createIngr.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(getIngrs.pending, (state) =>{
            state.isLoading = true
            
        })
        .addCase(getIngrs.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            state.ingredients=action.payload// set ingrs  
            //console.log(`User ingredients list: ${JSON.stringify(action.payload)}`)
        })
        .addCase(getIngrs.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(getRecipes.pending, (state) =>{
            state.isLoading = true
            
        })
        .addCase(getRecipes.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            state.recipes=action.payload// set recipes   
            //console.log(`User ingredients list: ${JSON.stringify(action.payload)}`)
        })
        .addCase(getRecipes.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(getRecipeInfo.pending, (state) =>{
            state.isLoading = true
            
        })
        .addCase(getRecipeInfo.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 
            state.currentRecipe=action.payload // set current recipe 
            
        })
        .addCase(getRecipeInfo.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
        .addCase(deleteIngr.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(deleteIngr.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true; 

            // now add every ingr except the one where the ids are equal // May need to be changed later 
            let result =[]; 
            for (let i= 0; i< state.ingredients.length; i++)
            {
                if(state.ingredients[i]._id == action.payload.id)
                {
                    continue; 
                }
                //otherwise push the ingredients 
                result.push(state.ingredients[i]);
            }
            state.ingredients = result// remove the deleted ingredients 

            
        })
        .addCase(deleteIngr.rejected, (state, action )=>{
            state.isLoading = false
            state.isError = true; 
            state.message = action.payload; 
        })
    }
})




export const {resetIngredientSlice}  = ingredientSlice.actions

export default ingredientSlice.reducer 