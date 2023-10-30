import { apiSlice } from "../../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({
            query:(Credential) => ({
                url:'/signin',
                method:'POST',
                body:{...Credential}
            })
        }),
        signout:builder.mutation({
            query:() => ({
                url:'signout',
                method:'GET',
            })
        })
    })
})

export const {useSigninMutation, useSignoutMutation} =authApiSlice;