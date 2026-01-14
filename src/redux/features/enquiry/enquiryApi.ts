import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const enquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEnquiry: builder.mutation({
      query: (formData) => {
        return {
          url: "/enquiry/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.enquiry],
    }),

    getAllEnquiry: builder.query({
      query: () => ({
        url: "/enquiry",
        method: "GET",
      }),
      providesTags: [tagTypes.enquiry],
    }),

    getSingleEnquiry: builder.query({
      query: (id: string) => ({
        url: `/enquiry/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.enquiry],
    }),

    updateEnquiry: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/enquiry/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.enquiry],
    }),

    deleteEnquiry: builder.mutation({
      query: (id: string) => ({
        url: `/enquiry/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.enquiry],
    }),
  }),
});

export const {
  useCreateEnquiryMutation,
  useGetAllEnquiryQuery,
  useGetSingleEnquiryQuery,
  useUpdateEnquiryMutation,
  useDeleteEnquiryMutation,
} = enquiryApi;