import {createSlice, createAsyncThunk}   from '@reduxjs/toolkit'
import ingredientService from './ingredientService'

// for every redux resource we have they are all going to have the bottom four
const initialState ={
    ingredients:[],
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
            state.ingredients.push (action.payload)// push ingredient to list 
            
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
        
    }
})




export const {resetIngredientSlice}  = ingredientSlice.actions

export default ingredientSlice.reducer 