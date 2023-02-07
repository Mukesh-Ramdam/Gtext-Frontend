import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { contactApi } from './../services/contactAPI';
import contactReducer from "../features/contactSlice";

export const store =configureStore({
    reducer:{
        contact: contactReducer,
        [contactApi.reducerPath]: contactApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
     getDefaultMiddleware().concat(contactApi.middleware),
})

setupListeners(store.dispatch)
