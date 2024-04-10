// where the store of states is 
import {configureStore}  from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'


export const store = configureStore({
    reducer:{
        auth:authReducer
    }, 
})