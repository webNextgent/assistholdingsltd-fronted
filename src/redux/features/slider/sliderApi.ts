import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const sliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlider: builder.mutation({
      query: (formData) => {
        return {
          url: "/slider/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.slider],
    }),

    getAllslider: builder.query({
      query: () => ({
        url: "/slider",
        method: "GET",
      }),
      providesTags: [tagTypes.slider],
    }),
    updateSlider: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/slider/update/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.slider],
    }),


    deleteSlider: builder.mutation({
      query: (id: string) => ({
        url: `/slider/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slider],
    }),
  }),
});

export const {
  useCreateSliderMutation,
  useGetAllsliderQuery,
  useUpdateSliderMutation,
  useDeleteSliderMutation
} = sliderApi;
