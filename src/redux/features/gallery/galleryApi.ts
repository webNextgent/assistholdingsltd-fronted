import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGallery: builder.mutation({
      query: (formData) => {
        return {
          url: "/gallery/create",
          method: "POST",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.gallery],
    }),
    getAllGallery: builder.query({
      query: () => ({
        url: "/gallery",
        method: "GET",
      }),
      providesTags: [tagTypes.gallery],
    }),

    updateGallery: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/gallery/update/${id}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.slider],
    }),

    deleteGallery: builder.mutation({
      query: (id: string) => ({
        url: `/gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.gallery],
    }),
  }),
});

export const {
  useCreateGalleryMutation,
  useGetAllGalleryQuery,
  useDeleteGalleryMutation,
  useUpdateGalleryMutation
} = galleryApi;
