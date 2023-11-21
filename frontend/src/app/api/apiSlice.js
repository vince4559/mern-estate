import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { setCredentails, logOut } from "../../features/auth/authSlice";

const baseQuerry = fetchBaseQuery({
    baseUrl:"http://localhost:3500/api",
    credentials:'include',
    prepareHeaders:(Headers, {getState}) => {
        const token = getState().auth.token;

        if(token){
            Headers.set('authorization', `Bearer ${token}`)
        };
        return Headers
    },
});

const baseQuerryWithReauth = async(args, api, extraOptions) => {
    let result = await baseQuerry(args, api, extraOptions);

    if(result?.error?.originalStatus === 403){
        console.log('sending refresh token')
        // send refresh token to get new access token

        const refreshResult = await baseQuerry('/refresh', api, extraOptions);
        console.log(refreshResult);

        if(refreshResult?.data){
            const username = api.getState().auth.username;
            const email = api.getState().auth.email;
            const roles = api.getState().auth.roles;

            // store the new token
            api.dispatch(setCredentails({...refreshResult.data, username, email, roles}))

            // now retry the original query with new access token
            result = await baseQuerry(args, api, extraOptions) 
        }else{
            api.dispatch(logOut())
        }
    }
    return result
};

export const apiSlice = createApi({
    baseQuery:baseQuerryWithReauth,
    endpoints:builder => ({})
})