// where the store of states is 
import AsyncStorage from '@react-native-async-storage/async-storage'

import {create}  from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ingredientReducer from '../features/ingredients/ingredientSlice'
import { configureStore } from '@reduxjs/toolkit'


export const store = configureStore({
    reducer:{
        auth:authReducer,
        ingredients:ingredientReducer,
    },
})

