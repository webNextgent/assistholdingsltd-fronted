"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCreateSliderMutation, useDeleteSliderMutation, useGetAllsliderQuery, useUpdateSliderMutation } from "@/redux/features/slider/sliderApi";

interface Slider {
  id: string;
  title: string;
  text: string;
  Image: string;
  status: string;
  createdAt: string;
}

const SliderPage = () => {
  const [createSlider, { isLoading: creating }] = useCreateSliderMutation();
  const [updateSlider, { isLoading: updating }] = useUpdateSliderMutation();
  const [deleteSlider, { isLoading: deleting }] = useDeleteSliderMutation();

  const { data: slidersData, isLoading, refetch } = useGetAllsliderQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const sliders: Slider[] = slidersData?.data || slidersData || [];

  const [showForm, setShowForm] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [formData, setFormData] = useState({ title: "", text: "", Image: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormData((prev) => ({ ...prev, Image: URL.createObjectURL(file) }));
    }
  };

  // const uploadImageToCPanel = async (file: File): Promise<string> => {
  //   const data = new FormData();
  //   data.append("image", file);

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-image`, {
  //       method: "POST",
  //       body: data,
  //     });
  //     if (!res.ok) throw new Error("Failed to upload image");
  //     const result = await res.json();
  //     return result.url;
  //   } catch (err) {
  //     toast.error("Image upload failed");
  //     throw err;
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
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      } else if (!editingSlider && !formData.Image) {
        toast.error("Please select an image");
        setUploading(false);
        return;
      } else if (editingSlider && !imageFile) {
        imageUrl = editingSlider.Image;
      }

      const sliderData = {
        title: formData.title,
        text: formData.text,
        Image: imageUrl,
      };

      if (editingSlider) {
        await updateSlider({ id: editingSlider.id, data: sliderData }).unwrap();
        toast.success("Slider updated successfully!");
      } else {
        await createSlider(sliderData).unwrap();
        toast.success("Slider created successfully!");
      }

      resetForm();
      setShowForm(false);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSlider = async (id: string) => {
      try {
        await deleteSlider(id).unwrap();
        toast.success("Slider deleted successfully!");
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete slider");
      }
    
  };

  const resetForm = () => {
    setFormData({ title: "", text: "", Image: "" });
    setImageFile(null);
    setEditingSlider(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) {
      resetForm();
    }
  };

  const handleEditSlider = (slider: Slider) => {


    setEditingSlider(slider);
    setFormData({ 
      title: slider.title, 
      text: slider.text, 
      Image: slider.Image 
    });
    setImageFile(null);
    setShowForm(true);
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
            <h1 className="text-2xl font-bold text-gray-800">Slider Management</h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Slider"}</span>
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingSlider ? "Edit Slider" : "Add New Slider"}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter slider title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text/Description *</label>
                  <textarea
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image {!editingSlider && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
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
                        {editingSlider ? "Current Image - Select new to update" : "Preview"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {(uploading || creating || updating) && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {editingSlider ? "Update Slider" : "Add Slider"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Slider Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">All Sliders ({sliders.length})</h2>
              {!sliders.length ? (
                <div className="text-center py-8 text-gray-500">No sliders found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Text</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sliders.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <img src={s.Image} alt={s.title} className="w-14 h-14 rounded-md object-cover" />
                          </td>
                          <td className="px-4 py-2 font-medium">{s.title}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{s.text}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              s.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditSlider(s)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium cursor-pointer"
                                disabled={deleting || updating}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSlider(s.id)}
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

export default SliderPage;