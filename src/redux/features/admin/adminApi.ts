import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create new admin
    createAdmin: builder.mutation({
      query: (data: any) => ({
        url: "/users/register",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    // Get all admins
    getAllAdmins: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    // Delete admin
    deleteAdmin: builder.mutation({
      query: (id: string) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin]
    }),
  }),
});

export const { 
  useCreateAdminMutation, 
  useGetAllAdminsQuery, 
  useDeleteAdminMutation 
} = adminApi;