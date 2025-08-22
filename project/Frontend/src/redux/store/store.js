import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../slice/authSlice.js'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import cartReducer from "../slice/CartSlice.jsx";
import persistStore from 'redux-persist/es/persistStore';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  cart : cartReducer
})

const persistedReducer= persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})
export const persistor = persistStore(store)