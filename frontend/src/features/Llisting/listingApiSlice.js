import { apiSlice } from "../../app/api/apiSlice";

export const listingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createListing: builder.mutation({
            query: (Credential) => ({
                url: '/createlisting',
                method: 'POST',
                body: {...Credential}
            })
        }),

        deleteListing: builder.mutation({
            query: (id) => ({
                url: `deletelisting/${id}`,
                method: "DELETE",
                body: id
            })
        }),
    })
})


export const {useCreateListingMutation, useDeleteListingMutation } = listingApiSlice;