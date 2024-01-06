import { apiSlice } from "../../app/api/apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({   // login
            query:(Credential) => ({
                url:'/signin',
                method:'POST',
                body:{...Credential}
            }),
            invalidatesTags: ['Credential']
        }),

        signup: builder.mutation({   // login
            query:(Credential) => ({
                url:'/signup',
                method:'POST',
                body:{...Credential}
            }),
            invalidatesTags: ['Credential']
        }),

        signout:builder.mutation({     //logout
            query:(Credential) => ({
                url:'/signout',
                method:'GET',
            }),
            invalidatesTags: ['Credential']
        }),

        googleSignIn: builder.mutation({
            query: (Credential) => ({
                url: '/google',
                method: 'POST',
                body: {...Credential}
            }),
            invalidatesTags: ['Credential']
        }),

        verifyEmail:builder.query({
            query: ({id, token}) => ({
                url: `/user/${id}/verify/${token}`,
                method: "GET"
            })
        })

    })
})

export const {
    useSigninMutation, 
    useSignupMutation, 
    useSignoutMutation, 
    useGoogleSignInMutation,
    useVerifyEmailQuery,
} =authApiSlice;