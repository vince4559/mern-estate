
import { apiSlice } from "../../app/api/apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        updateUser: builder.mutation({
            query: ({id, ...rest}) => ({
                url:`/updateuser/${id}`, 
                method:'PUT',
                body:rest
            })
        }),

        deleteUSer: builder.mutation({
            query: (id) => ({
                url:`/deleteuser/${id}`,
                method: 'DELETE',
                body:id
            })
        }),

        userListing: builder.query({
            query: ({id}) => ({
                url: `/userlisting/${id}`,
            })
        }),

    })
})

export const {
    useDeleteUSerMutation, 
    useUpdateUserMutation, 
    useUserListingQuery, 
} = userApiSlice;