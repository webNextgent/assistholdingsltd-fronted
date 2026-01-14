'use client';

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useGetAllBlogsQuery,
  useUpdateBlogsMutation,
} from "@/redux/features/blogs/blogsApi";

interface Blog {
  id: string;
  title: string;
  content: string;
  Image: string;
  status: string;
  createdAt: string;
}

const BlogsAdminPage = () => {
  const [createBlog, { isLoading: creating }] = useCreateBlogsMutation();
  const [updateBlog, { isLoading: updating }] = useUpdateBlogsMutation();
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogsMutation();

  const { data: blogsData, isLoading, refetch } = useGetAllBlogsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const blogs: Blog[] = blogsData?.data || blogsData || [];

  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    content: "", 
    Image: "" 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        content: editingBlog.content,
        Image: editingBlog.Image
      });
      setShowForm(true);
    }
  }, [editingBlog]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormData((prev) => ({ ...prev, Image: URL.createObjectURL(file) }));
    }
  };

  // ✅ Upload image to CPANEL
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
      }

      const blogData = {
        title: formData.title,
        content: formData.content,
        Image: imageUrl,
      };

      if (editingBlog) {
        // ✅ CORRECTED: Pass data in the format expected by the mutation
        await updateBlog({ 
          id: editingBlog.id, 
          data: blogData  // 'data' property explicitly added
        }).unwrap();
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(blogData).unwrap();
        toast.success("Blog created successfully!");
      }

      resetForm();
      setShowForm(false);
      refetch();
    } catch (err: any) {
      console.error("Error:", err);
      toast.error(err?.data?.message || "Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete blog");
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", Image: "" });
    setImageFile(null);
    setEditingBlog(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) resetForm();
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
            <h1 className="text-2xl font-bold text-gray-800">Blog Management</h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Blog"}</span>
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingBlog ? "Edit Blog" : "Add New Blog"}
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
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter blog content"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image {!editingBlog && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!editingBlog}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {formData.Image && (
                    <div className="mt-2">
                      <img src={formData.Image} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
                      <p className="text-xs text-gray-500 mt-1">
                        {editingBlog && !imageFile ? "Current Image" : "Preview"}
                      </p>
                    </div>
                  )}
                  {editingBlog && !imageFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty to keep current image
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
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
                    {editingBlog ? "Update Blog" : "Add Blog"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Blog Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">All Blogs ({blogs.length})</h2>
              {!blogs.length ? (
                <div className="text-center py-8 text-gray-500">No blogs found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Content</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blogs.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <img src={b.Image} alt={b.title} className="w-14 h-14 rounded-md object-cover" />
                          </td>
                          <td className="px-4 py-2 font-medium">{b.title}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">{b.content}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              b.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button
                              onClick={() => handleEditBlog(b)}
                              className="text-blue-600 hover:text-blue-900 text-sm font-medium px-3 py-1  rounded hover:bg-blue-50"
                              disabled={updating}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="text-red-600 hover:text-red-900 text-sm font-medium px-3 py-1 rounded hover:bg-red-50"
                              disabled={deleting}
                            >
                              {deleting ? "Deleting..." : "Delete"}
                            </button>
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

export default BlogsAdminPage;