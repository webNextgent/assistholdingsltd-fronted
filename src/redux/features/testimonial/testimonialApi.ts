import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTestimonial: builder.mutation({
      query: (formData) => {
        return {
          url: "/testimonial/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.testimonial],
    }),

    getAllTestimonial: builder.query({
      query: () => ({
        url: "/testimonial",
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),

    updateTestimonial: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/testimonial/update/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.testimonial],
    }),

    deleteTestimonial: builder.mutation({
      query: (id: string) => ({
        url: `/testimonial/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
  }),
});

export const {
useCreateTestimonialMutation,
useGetAllTestimonialQuery,
useUpdateTestimonialMutation,
useDeleteTestimonialMutation
} = testimonialApi;
