// state for auth 
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import * as SecureStore from 'expo-secure-store';
//Get user from localStorage (to save jwt)

const getSecureVal = async (key)=>{
    let result = await SecureStore.getItemAsync(key)
    return result
}
//const user = await getSecureVal("user") //await SecureStore.getItemAsync("user") //JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: null, //user? user: null,
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:"",
}

// async thunk function that registers user 
// has a service file for the actual http req
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) =>{
    try {
        return await authService.register(user) // our register service
    } catch (error) {
        const message = (error.response&& error.response.data&&error.response.data.message) || error.message || error.toString()
        console.log(`Error In CreateAsyncThunk : ${message} `)
        
        return thunkAPI.rejectWithValue(message) // rejects and sends error message as payload
    }
})


//actual slice 
// extra reducers takes care of the pending state, sucess and error states
export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading =false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            // what to do with the state when register is pending 
            state.isLoading =true 
        })
        .addCase(register.fulfilled, (state, action) =>{
            // since the register func returns a user there is going to be an action
            state.isLoading = false
            state.isSuccess = true 
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) =>{
            state.isLoading = false
            state.isError = true 
            state.message = action.payload // b/c of the rejectfunction earlier
            state.user = null
        })
    }
})

export const {reset } = authSlice.actions
export default authSlice.reducer