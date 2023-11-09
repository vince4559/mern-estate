import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from "../features/auth/authSlice"
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
};

const rootReducers = combineReducers({auth:authReducer})

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth: persistedReducer
    },
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(apiSlice.middleware),
    devTools: true,
});

export let persistor = persistStore(store)