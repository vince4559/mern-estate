import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username:null,
    email:null,
    // token:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        setCredentails: (state, action) => {
            const {username, email} = action.payload;
            state.username = username;
            state.email = email;
        },
        logOut:(state) => {
            state.username = null;
            state.email = null;
            // state.token = null
        },
    }
})

export const  {setCredentails, logOut} = authSlice.actions;
export default authSlice.reducer;

export const currentUser = (state) => state.auth.username;
export const currentEmail = (state) => state.auth.email;
export const currentToken = (state) => state.auth.token;