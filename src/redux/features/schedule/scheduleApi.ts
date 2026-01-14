import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const scheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: (data) => {
        return {
          url: "/schedule/create",
          method: "POST",
           data,
        };
      },
      invalidatesTags: [tagTypes.schedule],
    }),
    getAllSchedule: builder.query({
      query: () => ({
        url: "/schedule",
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),
deleteSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/schedule/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.slider],
    }),
  }),
});

export const {
 useCreateScheduleMutation,
 useGetAllScheduleQuery,
 useDeleteScheduleMutation
} = scheduleApi;