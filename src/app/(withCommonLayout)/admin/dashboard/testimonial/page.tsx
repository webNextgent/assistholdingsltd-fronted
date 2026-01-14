"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { 
  useCreateTestimonialMutation, 
  useDeleteTestimonialMutation, 
  useGetAllTestimonialQuery, 
  useUpdateTestimonialMutation 
} from "@/redux/features/testimonial/testimonialApi";

interface Testimonial {
  id: string;
  content: string;
  name: string;
  Image: string;
  status: string;
  createdAt: string;
}

const TestimonialsPage = () => {
  const [createTestimonial, { isLoading: creating }] =
    useCreateTestimonialMutation();
  const [updateTestimonial, { isLoading: updating }] =
    useUpdateTestimonialMutation();
  const [deleteTestimonial, { isLoading: deleting }] =
    useDeleteTestimonialMutation();

  const {
    data: testimonialsData,
    isLoading,
    refetch,
  } = useGetAllTestimonialQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  
  const testimonials: Testimonial[] = testimonialsData || [];

  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    content: "",
    name: "",
    Image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      content: testimonial.content,
      name: testimonial.name,
      Image: testimonial.Image,
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      // Preview only
      setFormData((prev) => ({
        ...prev,
        Image: URL.createObjectURL(file),
      }));
    }
  };

  // const uploadImageToCPanel = async (file: File): Promise<string> => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-image`, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error("Failed to upload image");

  //     const data = await res.json();
  //     return data.url;
  //   } catch (error) {
  //     toast.error("Image upload failed");
  //     throw error;
  //   }
  // };

  const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url; // ✅ direct image URL
  } catch (error) {
    toast.error("Image upload failed");
    throw error;
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.Image;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else if (!editingTestimonial && !formData.Image) {
        toast.error("Please select an image");
        setUploading(false);
        return;
      }

      const testimonialData = {
        content: formData.content,
        name: formData.name,
        Image: imageUrl,
      };

      if (editingTestimonial) {
        await updateTestimonial({
          id: editingTestimonial.id,
          data: testimonialData,
        }).unwrap();
        toast.success("Testimonial updated successfully!");
      } else {
        await createTestimonial(testimonialData).unwrap();
        toast.success("Testimonial created successfully!");
      }

      resetForm();
      setShowForm(false);
      refetch();
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
   
      try {
        await deleteTestimonial(id).unwrap();
        toast.success("Testimonial deleted successfully!");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete testimonial");
      }
    
  };

  const resetForm = () => {
    setFormData({
      content: "",
      name: "",
      Image: "",
    });
    setImageFile(null);
    setEditingTestimonial(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) resetForm();
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Testimonials Management
            </h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Testimonial"}</span>
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
              </h2>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-3 sm:gap-4"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter customer name"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter testimonial content"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image {!editingTestimonial && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingTestimonial}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img
                        src={formData.Image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {editingTestimonial && !imageFile
                          ? "Current Image - Select new image to update"
                          : "Preview"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                    disabled={uploading || creating || updating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || creating || updating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    {(uploading || creating || updating) && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {editingTestimonial
                      ? "Update Testimonial"
                      : "Add Testimonial"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Testimonials ({testimonials?.length || 0})
              </h2>
              {!testimonials?.length ? (
                <div className="text-center py-8 text-gray-500">
                  No testimonials found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Image
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Content
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {testimonials.map((t: Testimonial) => (
                        <tr key={t.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <img
                              src={t.Image}
                              alt={t.name}
                              className="w-14 h-14 rounded-md object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 font-medium">{t.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs">
                            <div className="line-clamp-2">{t.content}</div>
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                t.status === "CONFIRMED"
                                  ? "bg-green-100 text-green-800"
                                  : t.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {t.status || "PENDING"}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditTestimonial(t)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                disabled={deleting}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(t.id)}
                                className="text-red-600 hover:text-red-900 text-sm font-medium"
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

export default TestimonialsPage;