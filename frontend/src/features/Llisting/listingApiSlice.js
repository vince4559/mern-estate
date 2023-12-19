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
                url: `/getlistings?${searchQuery}`,
            }),
            providesTags: ['listings'],
            keepUnusedDataFor: 60
            
        }),
        recentOffer: builder.query({
            query: () => ({
                url: `/getlistings?offer=false&sort=createdAt&order=desc`
            }),
            providesTags: ['listings'],
            keepUnusedDataFor: 60
        }),

        recentRent: builder.query({
            query: () => ({
                url: `/getlistings?type=Rent&sort=createdAt&order=desc`
            }),
            providesTags: ['listings'],
            keepUnusedDataFor: 60
        }),

        recentSale: builder.query({
            query: () => ({
                url: `/getlistings?type=Sell&sort=createdAt&order=desc`
            }),
            providesTags: ['listings'],
            keepUnusedDataFor: 60
        }),

    })
})


export const {
    useCreateListingMutation, 
    useDeleteListingMutation, 
    useUpdateListingMutation ,
    useGetListingByIdQuery,
    useGetAllListingsQuery,
    useRecentOfferQuery,
    useRecentRentQuery,
    useRecentSaleQuery
}     = listingApiSlice;
