import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contact:{
        _id:'',
    name:'',
    number:'',
    address:'',
    }
    
}

export const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{
       setContact:(state, action) =>{
         state.contact = action.payload;
       }
    }
})

export const {setContact} = contactSlice.actions

export default contactSlice.reducer