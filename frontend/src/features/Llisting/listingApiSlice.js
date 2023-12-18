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

        updateListing: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/updatelisting/${id}`,
                method: "PUT",
                body: rest
            })
        }),

        getListingById: builder.query({
            query: ({id}) => ({
                url: `/listing/${id}`
            })
        }),

        getAllListings: builder.query({
            query: (searchQuery) => ({
                url: `/getlistings?${searchQuery}`
            })
        }),

    })
})


export const {
    useCreateListingMutation, 
    useDeleteListingMutation, 
    useUpdateListingMutation ,
    useGetListingByIdQuery,
    useGetAllListingsQuery,
}     = listingApiSlice;