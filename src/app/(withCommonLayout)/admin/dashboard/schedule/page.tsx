"use client";
import { toast } from "react-toastify";
import {
  useDeleteScheduleMutation,
  useGetAllScheduleQuery,
} from "@/redux/features/schedule/scheduleApi";

interface Schedule {
  id: string;
  name: string;
  email: string;
  date: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

const SchedulePage = () => {
  const [deleteSchedule, { isLoading: deleting }] = useDeleteScheduleMutation();

  const {
    data: SchedulesData,
    isLoading,
    refetch,
  } = useGetAllScheduleQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Use the actual data structure from your backend
  const Schedules: Schedule[] = SchedulesData?.data || SchedulesData || [];



  const handleDeleteSchedule = async (id: string) => {
    try {
      await deleteSchedule(id).unwrap();
      toast.success("Schedule deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete Schedule");
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-black">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Schedule Management
            </h1>
            <div className="text-sm text-gray-500">
              Total Schedules: {Schedules.length}
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Schedules ({Schedules.length})
              </h2>
              {!Schedules.length ? (
                <div className="text-center py-8 text-gray-500">
                  No Schedules found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Phone
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Message
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Created At
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Schedules.map((schedule) => (
                        <tr key={schedule.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">
                            {schedule.name}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {schedule.email}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {schedule.phone}
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {formatDate(schedule.date)}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">
                            {schedule.message}
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                schedule.status === "CONFIRMED"
                                  ? "bg-green-100 text-green-800"
                                  : schedule.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {schedule.status || "PENDING"}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-500">
                            {formatDate(schedule.createdAt)}
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleDeleteSchedule(schedule.id)
                                }
                                className="text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer"
                                disabled={deleting}
                              >
                                {deleting ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchedulePage;
