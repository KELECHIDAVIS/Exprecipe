// where the store of states is 
import AsyncStorage from '@react-native-async-storage/async-storage'

import {create}  from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

import { configureStore } from '@reduxjs/toolkit'

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }


// const persistedReducer = persistReducer(persistConfig, authReducer) // to get state to persist
// export const store = configureStore({
//     reducer:{
//         auth:persistedReducer
//     }, 
// })

// export const persistor = persistStore(store)

export const store = configureStore({
    reducer:{
        auth:authReducer
    },
})

