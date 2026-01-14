import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperties: builder.mutation({
      query: (formData) => {
        return {
          url: "/perfections/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.properties],
    }),

    getAllProperties: builder.query({
      query: () => ({
        url: "/perfections",
        method: "GET",
      }),
      providesTags: [tagTypes.properties],
    }),
    
    updateProperties: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/perfections/update/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.properties],
    }),

    deleteProperties: builder.mutation({
      query: (id: string) => ({
        url: `/perfections/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.properties],
    }),
  }),
});

export const {
  useCreatePropertiesMutation,
  useGetAllPropertiesQuery,
  useUpdatePropertiesMutation,
  useDeletePropertiesMutation,
} = propertiesApi;