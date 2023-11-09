import { apiSlice } from "../../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({   // login
            query:(Credential) => ({
                url:'/signin',
                method:'POST',
                body:{...Credential}
            })
        }),
        signup: builder.mutation({   // login
            query:(Credential) => ({
                url:'/signup',
                method:'POST',
                body:{...Credential}
            })
        }),
        signout:builder.mutation({     //logout
            query:() => ({
                url:'signout',
                method:'GET',
            })
        })
    })
})

export const {useSigninMutation, useSignupMutation, useSignoutMutation} =authApiSlice;