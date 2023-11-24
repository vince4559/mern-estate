import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username:null,
    email:null,
    roles: null,
    _id:null
}

const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers:{
        setCredentails: (state, action) => {
            const {username, email, roles, _id} = action.payload;
            state.username = username;
            state.email = email;
            state.roles = roles;
            state._id = _id
        },
        logOut:(state) => {
            state.username = null;
            state.email = null;
            state.roles = null;
            state._id = null
        },
    }
})

export const  {setCredentails, logOut} = authSlice.actions;
export default authSlice.reducer;

export const currentUser = (state) => state.auth.username;
export const currentEmail = (state) => state.auth.email;
export const roles = (state) => state.auth.roles;