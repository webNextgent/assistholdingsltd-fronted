"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useCreateGalleryMutation,
  useDeleteGalleryMutation,
  useGetAllGalleryQuery,
  useUpdateGalleryMutation,
} from "@/redux/features/gallery/galleryApi";
import { isLoggedIn } from "@/services/auth.services";

interface Gallery {
  id: string;
  videoUrl: string;
  image: string[]; 
}

const GalleryPage = () => {
  const router = useRouter();

  const [createGallery, { isLoading: creating }] = useCreateGalleryMutation();
  const [updateGallery, { isLoading: updating }] = useUpdateGalleryMutation();
  const [deleteGallery, { isLoading: deleting }] = useDeleteGalleryMutation();

  const {
    data: galleryData,
    isLoading,
    refetch,
  } = useGetAllGalleryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const galleries: Gallery[] = galleryData?.data || galleryData || [];

  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    videoUrl: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<string[]>([]); // ✅ Current images for editing
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]); // ✅ Track images to remove
  const [uploading, setUploading] = useState(false);

  // ✅ Set current images when editing
  useEffect(() => {
    if (editingGallery) {
      setFormData({
        videoUrl: editingGallery.videoUrl || "",
      });
      setCurrentImages(editingGallery.image || []);
      setImageFiles([]);
      setImagesToRemove([]);
    }
  }, [editingGallery]);

  // ✅ Multiple Image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
    }
  };

  // ✅ Remove single image from new selection
  const removeNewImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  // ✅ Remove single current image (mark for removal)
  const removeCurrentImage = (index: number, imageUrl: string) => {
    setCurrentImages(currentImages.filter((_, i) => i !== index));
    setImagesToRemove(prev => [...prev, imageUrl]);
  };

  // ✅ Cancel removal of current image
  const cancelRemoveCurrentImage = (imageUrl: string) => {
    // Find the index in imagesToRemove array
    const index = imagesToRemove.indexOf(imageUrl);
    if (index > -1) {
      const newImagesToRemove = [...imagesToRemove];
      newImagesToRemove.splice(index, 1);
      setImagesToRemove(newImagesToRemove);
    }
  };

  // ✅ Upload image to CPANEL
  // const uploadImageToCPanel = async (file: File): Promise<string> => {
  //   const data = new FormData();
  //   data.append("image", file);

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-image`,
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     );
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
      let newImageUrls: string[] = [];

      // Upload new images if selected
      if (imageFiles.length > 0) {
        newImageUrls = await Promise.all(
          imageFiles.map((file) => uploadImage(file))
        );
      }

      // Combine current images (excluding removed ones) with new images
      const finalImages = [
        ...currentImages.filter(img => !imagesToRemove.includes(img)),
        ...newImageUrls
      ];

      // Check if at least one field is filled
      if (!formData.videoUrl && finalImages.length === 0) {
        toast.error("Please select at least one image or enter a video URL");
        setUploading(false);
        return;
      }

      // ✅ Backend model অনুযায়ী data structure
      const galleryPayload = {
        videoUrl: formData.videoUrl,
        image: finalImages, // ✅ Final combined images array
      };

      if (editingGallery) {
        // ✅ Update gallery with proper data structure
        await updateGallery({ 
          id: editingGallery.id, 
          data: galleryPayload 
        }).unwrap();
        toast.success("Gallery updated successfully!");
      } else {
        await createGallery(galleryPayload).unwrap();
        toast.success("Gallery created successfully!");
      }

      resetForm();
      setShowForm(false);
      refetch();
    } catch (err: any) {
      console.error("Error details:", err);
      toast.error(err?.data?.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    try {
      await deleteGallery(id).unwrap();
      toast.success("Gallery deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete gallery");
    }
  };

  const resetForm = () => {
    setFormData({ videoUrl: "" });
    setImageFiles([]);
    setCurrentImages([]);
    setImagesToRemove([]);
    setEditingGallery(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) resetForm();
  };

  const handleEditGallery = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setShowForm(true);
  };

  const cancelEdit = () => {
    resetForm();
    setShowForm(false);
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
              Gallery Management
            </h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Gallery"}</span>
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingGallery ? "Edit Gallery" : "Add New Gallery"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Video URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, videoUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Enter YouTube video URL
                  </p>
                </div>

                {/* Multiple Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Images {!editingGallery && "*"}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Select multiple images (At least one image or video URL is
                    required)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />

                  {/* New Selected Images Preview */}
                  {imageFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        New Selected Images ({imageFiles.length})
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {imageFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-md border"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 cursor-pointer"
                            >
                              ×
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                              New {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Images when Editing */}
                  {editingGallery && currentImages.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Current Images ({currentImages.length})
                        {imagesToRemove.length > 0 && (
                          <span className="text-red-500 ml-2">
                            ({imagesToRemove.length} marked for removal)
                          </span>
                        )}
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {currentImages.map((img, index) => {
                          const isMarkedForRemoval = imagesToRemove.includes(img);
                          return (
                            <div key={index} className={`relative group ${isMarkedForRemoval ? 'opacity-50' : ''}`}>
                              <img
                                src={img}
                                alt={`Current ${index + 1}`}
                                className="w-full h-24 object-cover rounded-md border"
                              />
                              {isMarkedForRemoval ? (
                                <button
                                  type="button"
                                  onClick={() => cancelRemoveCurrentImage(img)}
                                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-green-600"
                                >
                                  ↶
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => removeCurrentImage(index, img)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              )}
                              <div className={`absolute bottom-0 left-0 right-0 text-white text-xs p-1 text-center ${
                                isMarkedForRemoval ? 'bg-red-500' : 'bg-black bg-opacity-50'
                              }`}>
                                {isMarkedForRemoval ? 'Will Remove' : `Current ${index + 1}`}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Click × to remove images, click ↶ to cancel removal
                      </p>
                    </div>
                  )}
                </div>

                {/* Validation Message */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> You must provide at least one image
                    or a video URL.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={cancelEdit}
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
                    {editingGallery ? "Update Gallery" : "Add Gallery"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Gallery Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Galleries ({galleries.length})
              </h2>
              {!galleries.length ? (
                <div className="text-center py-8 text-gray-500">
                  No galleries found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Images
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Video URL
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {galleries.map((gallery) => (
                        <tr key={gallery.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <div className="flex flex-wrap gap-1">
                              {gallery.image && gallery.image.length > 0 ? (
                                <>
                                  <img
                                    src={gallery.image[0]}
                                    alt="Gallery"
                                    className="w-12 h-12 rounded-md object-cover"
                                  />
                                  {gallery.image.length > 1 && (
                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-600">
                                      +{gallery.image.length - 1}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <span className="text-gray-400 text-sm">
                                  No images
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm">
                            {gallery.videoUrl ? (
                              <a
                                href={gallery.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 truncate block max-w-xs"
                              >
                                {gallery.videoUrl}
                              </a>
                            ) : (
                              <span className="text-gray-400">No video</span>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditGallery(gallery)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium cursor-pointer px-3 py-1  rounded hover:bg-blue-50"
                                disabled={updating}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGallery(gallery.id)}
                                className="text-red-600 hover:text-red-900 text-sm font-medium cursor-pointer px-3 py-1  rounded hover:bg-red-50"
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

export default GalleryPage;