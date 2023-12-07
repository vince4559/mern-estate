import { apiSlice } from "../../app/api/apiSlice";

export const listingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createListing: builder.mutation({
            query: (Credential) => ({
                url: '/createlisting',
                method: 'POST',
                body: {...Credential}
            })
        })
    })
})


export const {useCreateListingMutation} = listingApiSlice;