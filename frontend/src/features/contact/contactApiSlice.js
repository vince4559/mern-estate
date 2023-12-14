import { apiSlice } from "../../app/api/apiSlice";

export const contactApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        sendEmail: builder.mutation({
            query: (credentail) => ({
                url: '/sendemail',
                method: "POST",
                body: {...credentail}
            })
        }),

    })
})


export const {useSendEmailMutation} = contactApiSlice;