import { apiSlice } from "../../app/api/apiSlice";

export const contactApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendEmail: builder.mutation({
            query: (credentail) => ({
                url: '/sendemail',
                method: "POST",
                body: {...credentail}
            }),
            invalidatesTags: ['credential']
        }),

    })
})


export const {useSendEmailMutation} = contactApiSlice;