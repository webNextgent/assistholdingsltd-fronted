/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Icons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import {
  useCreatePropertiesMutation,
  useDeletePropertiesMutation,
  useGetAllPropertiesQuery,
  useUpdatePropertiesMutation,
} from "@/redux/features/properties/propertiesApi";
import { isLoggedIn } from "@/services/auth.services";

// Dynamic Icon Picker Component
const IconPicker = ({
  selectedIcon,
  onIconSelect,
}: {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("fa");
  const [showPicker, setShowPicker] = useState(false);

  const allIcons = {
    fa: Object.keys(Icons),
    io: Object.keys(IoIcons),
    md: Object.keys(MdIcons),
    hi: Object.keys(HiIcons),
    fi: Object.keys(FiIcons),
  };

  const filteredIcons = allIcons[
    selectedLibrary as keyof typeof allIcons
  ].filter((iconName) =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIconComponent = (iconName: string) => {
    const libraries = {
      fa: Icons,
      io: IoIcons,
      md: MdIcons,
      hi: HiIcons,
      fi: FiIcons,
    };
    const library = libraries[selectedLibrary as keyof typeof libraries];
    return (library as any)[iconName];
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 rounded-md p-3 cursor-pointer bg-white flex items-center justify-between"
        onClick={() => setShowPicker(!showPicker)}
      >
        <div className="flex items-center gap-3">
          {selectedIcon ? (
            <>
              {(() => {
                const IconComponent = getIconComponent(selectedIcon);
                return IconComponent ? <IconComponent size={20} /> : null;
              })()}
              <span className="text-sm font-medium">{selectedIcon}</span>
            </>
          ) : (
            <span className="text-sm text-gray-500">Select an icon...</span>
          )}
        </div>
        <span className="text-gray-400">⌄</span>
      </div>

      {showPicker && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <div className="flex gap-2 mb-3">
              {Object.keys(allIcons).map((lib) => (
                <button
                  key={lib}
                  type="button"
                  onClick={() => setSelectedLibrary(lib)}
                  className={`px-3 py-1 text-xs rounded-full capitalize ${
                    selectedLibrary === lib
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {lib}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          <div className="overflow-y-auto max-h-60 p-3">
            {filteredIcons.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No icons found
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {filteredIcons.map((iconName) => {
                  const IconComponent = getIconComponent(iconName);
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        onIconSelect(iconName);
                        setShowPicker(false);
                        setSearchTerm("");
                      }}
                      className={`p-2 border rounded-md flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors ${
                        selectedIcon === iconName
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      {IconComponent && <IconComponent size={20} />}
                      <span className="text-xs truncate w-full text-center">
                        {iconName}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface FeatureAmenity {
  id: number;
  icon: string;
  text: string;
}

interface ExtraField {
  id: number;
  icon: string;
  fieldName: string;
  fieldValue: string;
}

interface Perfection {
  id: string;
  Title: string;
  description: string;
  description2: string;
  description3: string;
  FeaturesAmenities?: FeatureAmenity[];
  videoUrl: string;
  galleryImages: string[];
  Category: string;
  Type: string;
  Location: string;
  extraFields?: Record<string, string>;
  status: string;
  createdAt: string;
}

// Image Preview Component with Remove Button
interface ImagePreviewProps {
  src: string;
  index: number;
  onRemove: () => void;
  isNew?: boolean;
}

const ImagePreview = ({ src, index, onRemove, isNew = false }: ImagePreviewProps) => {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={`Gallery ${index}`}
        className="w-20 h-20 object-cover rounded-md border shadow-sm"
      />
      <div className="absolute -top-2 -right-2">
        <button
          type="button"
          onClick={onRemove}
          className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
          title="Remove image"
        >
          ×
        </button>
      </div>
      <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
        {isNew ? `New #${index}` : `#${index}`}
      </div>
      {isNew && (
        <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
          New
        </div>
      )}
    </div>
  );
};

const PerfectionsPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, [router]);

  if (!isLoggedIn()) {
    return null;
  }

  const [createPerfections, { isLoading: creating }] =
    useCreatePropertiesMutation();
  const [updatePerfections, { isLoading: updating }] =
    useUpdatePropertiesMutation();
  const [deletePerfections, { isLoading: deleting }] =
    useDeletePropertiesMutation();

  const {
    data: perfectionsData,
    isLoading,
    refetch,
  } = useGetAllPropertiesQuery(undefined, { refetchOnMountOrArgChange: true });

  const perfections: Perfection[] =
    perfectionsData?.data || perfectionsData || [];

  const [showForm, setShowForm] = useState(false);
  const [editingPerfection, setEditingPerfection] = useState<Perfection | null>(
    null
  );
  const [formData, setFormData] = useState({
    Title: "",
    description: "",
    description2: "",
    description3: "",
    videoUrl: "",
    Category: "",
    Type: "",
    Location: "",
  });
  const [featuresAmenities, setFeaturesAmenities] = useState<FeatureAmenity[]>(
    []
  );
  const [extraFields, setExtraFields] = useState<ExtraField[]>([]);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryImages, setExistingGalleryImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Function to render any icon by name
  const renderIcon = (iconName: string, size: number = 20) => {
    if (!iconName) return null;

    const libraries = [Icons, IoIcons, MdIcons, HiIcons, FiIcons];
    for (const library of libraries) {
      const IconComponent = (library as any)[iconName];
      if (IconComponent) {
        return <IconComponent size={size} />;
      }
    }
    return null;
  };

  // Add new feature amenity
  const addFeatureAmenity = () => {
    setFeaturesAmenities([
      ...featuresAmenities, 
      { id: 0, icon: "", text: "" }
    ]);
  };

  // Update feature amenity
  const updateFeatureAmenity = (
    index: number,
    field: "id" | "icon" | "text",
    value: string | number
  ) => {
    const updated = [...featuresAmenities];
    updated[index] = { ...updated[index], [field]: value };
    setFeaturesAmenities(updated);
  };

  // Remove feature amenity
  const removeFeatureAmenity = (index: number) => {
    setFeaturesAmenities(featuresAmenities.filter((_, i) => i !== index));
  };

  // Add new extra field
  const addExtraField = () => {
    setExtraFields([
      ...extraFields,
      { id: 0, icon: "", fieldName: "", fieldValue: "" },
    ]);
  };

  // Update extra field
  const updateExtraField = (
    index: number,
    field: "id" | "icon" | "fieldName" | "fieldValue",
    value: string | number
  ) => {
    const updated = [...extraFields];
    updated[index] = { ...updated[index], [field]: value };
    setExtraFields(updated);
  };

  // Remove extra field
  const removeExtraField = (index: number) => {
    setExtraFields(extraFields.filter((_, i) => i !== index));
  };

  // Handle file uploads
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles([...galleryFiles, ...newFiles]);
    }
  };

  // Remove main image
  const removeMainImage = () => {
    setMainImageFile(null);
  };

  // Remove cover image
  const removeCoverImage = () => {
    setCoverImageFile(null);
  };

  // Remove gallery file
  const removeGalleryFile = (index: number) => {
    const updatedFiles = [...galleryFiles];
    updatedFiles.splice(index, 1);
    setGalleryFiles(updatedFiles);
  };

  // Remove existing gallery image
  const removeExistingGalleryImage = (index: number) => {
    const updatedImages = [...existingGalleryImages];
    updatedImages.splice(index, 1);
    setExistingGalleryImages(updatedImages);
  };

  // Upload images to CPANEL
  // const uploadImageToCPanel = async (file: File): Promise<string> => {
  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-image`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

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
      // Start with existing images (if any are left after removals)
      let galleryUrls: string[] = [...existingGalleryImages];

      // Upload new main image if provided
      if (mainImageFile) {
        const mainImageUrl = await uploadImage(mainImageFile);
        // Replace index 0 with new main image
        galleryUrls[0] = mainImageUrl;
      } else if (existingGalleryImages[0]) {
        // Keep existing main image if not removed
        galleryUrls[0] = existingGalleryImages[0];
      }

      // Upload new cover image if provided
      if (coverImageFile) {
        const coverImageUrl = await uploadImage(coverImageFile);
        // Replace index 1 with new cover image
        galleryUrls[1] = coverImageUrl;
      } else if (existingGalleryImages[1]) {
        // Keep existing cover image if not removed
        galleryUrls[1] = existingGalleryImages[1];
      }

      // Upload additional new gallery images
      if (galleryFiles.length > 0) {
        const additionalGalleryUrls = await Promise.all(
          galleryFiles.map((file) => uploadImage(file))
        );
        
        // Add new gallery images after index 1
        galleryUrls = [
          ...galleryUrls.slice(0, 2),
          ...additionalGalleryUrls,
          ...galleryUrls.slice(2) // Keep any remaining existing images
        ];
      }

      // Convert extraFields to the required format
      const extraFieldsObj: Record<string, string> = {};
      extraFields.forEach((field) => {
        if (field.icon && field.fieldName && field.fieldValue && field.id > 0) {
          extraFieldsObj[`${field.id}_${field.icon}`] = `${field.fieldName}: ${field.fieldValue}`;
        }
      });

      // User যেভাবে number দিয়েছে সেভাবেই save হবে
      const featuresToSave = featuresAmenities.filter((fa) => fa.icon && fa.text && fa.id > 0);

      const perfectionData = {
        Title: formData.Title,
        description: formData.description,
        description2: formData.description2,
        description3: formData.description3,
        FeaturesAmenities: featuresToSave,
        videoUrl: formData.videoUrl,
        galleryImages: galleryUrls,
        Category: formData.Category,
        Type: formData.Type,
        Location: formData.Location,
        extraFields: extraFieldsObj,
      };

      if (editingPerfection) {
        await updatePerfections({
          id: editingPerfection.id,
          data: perfectionData,
        }).unwrap();
        toast.success("Perfection updated successfully!");
      } else {
        await createPerfections(perfectionData).unwrap();
        toast.success("Perfection created successfully!");
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

  const handleDeletePerfection = async (id: string) => {
    try {
      await deletePerfections(id).unwrap();
      toast.success("Perfection deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete perfection");
    }
  };

  const resetForm = () => {
    setFormData({
      Title: "",
      description: "",
      description2: "",
      description3: "",
      videoUrl: "",
      Category: "",
      Type: "",
      Location: "",
    });
    setFeaturesAmenities([]);
    setExtraFields([]);
    setMainImageFile(null);
    setCoverImageFile(null);
    setGalleryFiles([]);
    setExistingGalleryImages([]);
    setEditingPerfection(null);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
    if (showForm) resetForm();
  };

  const handleEditPerfection = (perfection: Perfection) => {
    setEditingPerfection(perfection);
    setFormData({
      Title: perfection.Title || "",
      description: perfection.description || "",
      description2: perfection.description2 || "",
      description3: perfection.description3 || "",
      videoUrl: perfection.videoUrl || "",
      Category: perfection.Category || "",
      Type: perfection.Type || "",
      Location: perfection.Location || "",
    });
    
    // Set features exactly as they were saved
    if (perfection.FeaturesAmenities) {
      const featuresWithIds = (perfection.FeaturesAmenities as any[]).map((fa: any) => ({
        id: fa.id || 0,
        icon: fa.icon || "",
        text: fa.text || "",
      }));
      setFeaturesAmenities(featuresWithIds);
    } else {
      setFeaturesAmenities([]);
    }

    // Set existing gallery images
    setExistingGalleryImages(perfection.galleryImages || []);

    // Convert extraFields object back to array for editing
    if (perfection.extraFields) {
      const fieldsArray: ExtraField[] = Object.entries(
        perfection.extraFields
      ).map(([key, value]) => {
        const [idPart, ...iconParts] = key.split('_');
        const icon = iconParts.join('_');
        const id = parseInt(idPart) || 0;
        
        const [fieldName, ...fieldValueParts] = value.split(": ");
        const fieldValue = fieldValueParts.join(": ");
        
        return {
          id,
          icon,
          fieldName: fieldName || "",
          fieldValue: fieldValue || "",
        };
      });
      setExtraFields(fieldsArray);
    } else {
      setExtraFields([]);
    }

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
            <h1 className="text-2xl font-bold text-gray-800">
              Perfections Management
            </h1>
            <button
              onClick={handleFormToggle}
              className="bg-[#7A3E1B] hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              disabled={uploading || creating || updating}
            >
              <span>+</span>
              <span>{showForm ? "Cancel" : "Add Perfection"}</span>
            </button>
          </div>

          {/* Main Form */}
          {showForm && (
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingPerfection ? "Edit Perfection" : "Add New Perfection"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.Title}
                      onChange={(e) =>
                        setFormData({ ...formData, Title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.Category}
                      onChange={(e) =>
                        setFormData({ ...formData, Category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.Type}
                      onChange={(e) =>
                        setFormData({ ...formData, Type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter type"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.Location}
                      onChange={(e) =>
                        setFormData({ ...formData, Location: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900">
                    Descriptions
                  </h3>
                  {["description", "description2", "description3"].map(
                    (field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.charAt(0).toUpperCase() + field.slice(1)} *
                        </label>
                        <textarea
                          required
                          value={formData[field as keyof typeof formData]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          placeholder={`Enter ${field}`}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Main Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Image {!editingPerfection && "*"}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    This will be the first image in gallery (index 0)
                    {editingPerfection && existingGalleryImages[0] && (
                      <span className="text-green-600 ml-2">
                        ✓ Current image will be kept if no new image selected
                      </span>
                    )}
                  </p>
                  <div className="flex flex-col gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        required={!editingPerfection && !existingGalleryImages[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  
                    {mainImageFile && (
                      <div className="flex items-center gap-2">
                        <ImagePreview
                          src={URL.createObjectURL(mainImageFile)}
                          index={0}
                          onRemove={removeMainImage}
                          isNew={true}
                        />
                        <span className="text-xs text-green-600">
                          ✓ New main image
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Show current main image in edit mode */}
                  {editingPerfection && existingGalleryImages[0] && !mainImageFile && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Current Main Image:</p>
                      <div className="flex items-center gap-3">
                        <ImagePreview
                          src={existingGalleryImages[0]}
                          index={0}
                          onRemove={() => removeExistingGalleryImage(0)}
                        />
                        <div className="text-xs text-gray-500">
                          <p>Index: 0</p>
                          <p className="text-red-500">Click X to remove</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image {!editingPerfection && "*"}
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    This will be the second image in gallery (index 1)
                    {editingPerfection && existingGalleryImages[1] && (
                      <span className="text-green-600 ml-2">
                        ✓ Current image will be kept if no new image selected
                      </span>
                    )}
                  </p>
                  <div className="flex gap-3 items-start flex-col">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        required={!editingPerfection && !existingGalleryImages[1]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    {coverImageFile && (
                      <div className="flex items-center gap-2">
                        <ImagePreview
                          src={URL.createObjectURL(coverImageFile)}
                          index={1}
                          onRemove={removeCoverImage}
                          isNew={true}
                        />
                        <span className="text-xs text-green-600">
                          ✓ New cover image
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Show current cover image in edit mode */}
                  {editingPerfection && existingGalleryImages[1] && !coverImageFile && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Current Cover Image:</p>
                      <div className="flex items-center gap-3">
                        <ImagePreview
                          src={existingGalleryImages[1]}
                          index={1}
                          onRemove={() => removeExistingGalleryImage(1)}
                        />
                        <div className="text-xs text-gray-500">
                          <p>Index: 1</p>
                          <p className="text-red-500">Click X to remove</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
                    placeholder="https://example.com/video.mp4"
                  />
                </div>

                {/* Additional Gallery Images */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Additional Gallery Images
                    </label>
                    <div className="text-xs text-gray-500">
                      {galleryFiles.length > 0 && (
                        <span className="text-green-600">
                          {galleryFiles.length} new image(s) selected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    These will be added after main and cover images (from index 2)
                    {editingPerfection && existingGalleryImages.length > 2 && (
                      <span className="text-green-600 ml-2">
                        ✓ {existingGalleryImages.length - 2} existing additional images
                      </span>
                    )}
                  </p>
                  
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  {/* Show current additional gallery images in edit mode */}
                  {editingPerfection && existingGalleryImages.length > 2 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Current Additional Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {existingGalleryImages.slice(2).map((img, index) => (
                          <ImagePreview
                            key={index + 2}
                            src={img}
                            index={index + 2}
                            onRemove={() => removeExistingGalleryImage(index + 2)}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-red-500 mt-1">
                        Click X to remove existing images
                      </p>
                    </div>
                  )}

                  {/* Show new gallery files */}
                  {galleryFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">New Additional Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {galleryFiles.map((file, index) => (
                          <ImagePreview
                            key={index}
                            src={URL.createObjectURL(file)}
                            index={index + 2}
                            onRemove={() => removeGalleryFile(index)}
                            isNew={true}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        These new images will be added to the gallery
                      </p>
                    </div>
                  )}

                  {/* Gallery summary */}
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Gallery Summary:</p>
                    <div className="text-xs text-gray-600 mt-1">
                      <p>• Main Image (index 0): {mainImageFile ? "New selected" : existingGalleryImages[0] ? "Existing" : "Not set"}</p>
                      <p>• Cover Image (index 1): {coverImageFile ? "New selected" : existingGalleryImages[1] ? "Existing" : "Not set"}</p>
                      <p>• Additional Images: {existingGalleryImages.length - 2} existing + {galleryFiles.length} new</p>
                      <p>• Total after update: {existingGalleryImages.length + galleryFiles.length - (mainImageFile ? 0 : 0) - (coverImageFile ? 0 : 0)} images</p>
                    </div>
                  </div>
                </div>

                {/* Sat A Glance */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-medium text-gray-900">
                      Sat A Glance
                    </h3>
                    <button
                      type="button"
                      onClick={addExtraField}
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      + Add Field
                    </button>
                  </div>

                  <div className="space-y-4">
                    {extraFields.map((field, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                          {/* Serial Number Input */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Number *
                            </label>
                            <input
                              type="number"
                              min="1"
                              required
                              value={field.id || ""}
                              onChange={(e) =>
                                updateExtraField(index, "id", parseInt(e.target.value) || 0)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="1, 2, 3..."
                            />
                          </div>

                          {/* Icon Picker */}
                          <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon *
                            </label>
                            <IconPicker
                              selectedIcon={field.icon}
                              onIconSelect={(icon) =>
                                updateExtraField(index, "icon", icon)
                              }
                            />
                          </div>

                          {/* Field Name */}
                          <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Field Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={field.fieldName}
                              onChange={(e) =>
                                updateExtraField(
                                  index,
                                  "fieldName",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Price, Area, Rooms"
                            />
                          </div>

                          {/* Field Value */}
                          <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Field Value *
                            </label>
                            <input
                              type="text"
                              required
                              value={field.fieldValue}
                              onChange={(e) =>
                                updateExtraField(
                                  index,
                                  "fieldValue",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., $500, 1200 sqft, 3"
                            />
                          </div>

                          {/* Remove Button */}
                          <div className="md:col-span-1 flex items-end">
                            <button
                              type="button"
                              onClick={() => removeExtraField(index)}
                              className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Preview how it will be saved */}
                        {field.id && field.icon && field.fieldName && field.fieldValue && (
                          <div className="mt-3 p-3 bg-white rounded border border-green-200">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  #{field.id}
                                </span>
                                {renderIcon(field.icon, 20)}
                                <span className="text-sm font-medium">
                                  {field.fieldName}: {field.fieldValue}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-blue-700 mt-2">
                              <strong>Will be saved as:</strong><br />
                              Key: <code>{field.id}_{field.icon}</code><br />
                              Value: <code>{field.fieldName}: {field.fieldValue}</code>
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {extraFields.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                      No fields added yet. Click "Add Field" to create custom fields.
                    </p>
                  )}
                </div>

                {/* Features & Amenities */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-md font-medium text-gray-900">
                      Features & Amenities
                    </h3>
                    <button
                      type="button"
                      onClick={addFeatureAmenity}
                      className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      + Add Feature
                    </button>
                  </div>

                  <div className="space-y-4">
                    {featuresAmenities.map((feature, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                          {/* Serial Number Input */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Number *
                            </label>
                            <input
                              type="number"
                              min="1"
                              required
                              value={feature.id || ""}
                              onChange={(e) =>
                                updateFeatureAmenity(index, "id", parseInt(e.target.value) || 0)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                              placeholder="1, 2, 3..."
                            />
                          </div>

                          {/* Icon Picker */}
                          <div className="md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select Icon *
                            </label>
                            <IconPicker
                              selectedIcon={feature.icon}
                              onIconSelect={(icon) =>
                                updateFeatureAmenity(index, "icon", icon)
                              }
                            />
                          </div>

                          {/* Feature Text */}
                          <div className="md:col-span-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Feature Text *
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                required
                                value={feature.text}
                                onChange={(e) =>
                                  updateFeatureAmenity(index, "text", e.target.value)
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                placeholder="Swimming Pool, Free WiFi, etc."
                              />
                              <button
                                type="button"
                                onClick={() => removeFeatureAmenity(index)}
                                className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Preview */}
                        {feature.id && feature.icon && feature.text && (
                          <div className="mt-3 p-3 bg-white rounded border border-green-200">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                  #{feature.id}
                                </span>
                                {renderIcon(feature.icon, 20)}
                                <span className="text-sm font-medium">{feature.text}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {featuresAmenities.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                      No features added yet. Click "Add Feature" to start.
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleFormToggle}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                    disabled={uploading || creating || updating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || creating || updating}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {(uploading || creating || updating) && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {editingPerfection ? "Update Perfection" : "Add Perfection"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Perfections Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">
                All Perfections ({perfections?.length || 0})
              </h2>
              {!perfections?.length ? (
                <div className="text-center py-8 text-gray-500">
                  No perfections found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Main Image
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Cover Image
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Title
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Features
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Gallery Images
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
                      {perfections.map((p: Perfection) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            {p.galleryImages?.[0] ? (
                              <img
                                src={p.galleryImages[0]}
                                alt="Main"
                                className="w-10 h-10 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No Main
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            {p.galleryImages?.[1] ? (
                              <img
                                src={p.galleryImages[1]}
                                alt="Cover"
                                className="w-10 h-10 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No Cover
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-2 font-medium">{p.Title}</td>
                          <td className="px-4 py-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {p.Category}
                            </span>
                          </td>
                          <td className="px-4 py-2 text-sm">{p.Type}</td>
                          <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">
                            {p.Location}
                          </td>
                          <td className="px-4 py-2">
                            <div className="max-w-xs">
                              {p.FeaturesAmenities && p.FeaturesAmenities.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {p.FeaturesAmenities.slice(0, 3).map((feature: any, index: number) => (
                                    <span 
                                      key={index}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                    >
                                      {feature.text}
                                    </span>
                                  ))}
                                  {p.FeaturesAmenities.length > 3 && (
                                    <span className="text-xs text-gray-500">
                                      +{p.FeaturesAmenities.length - 3} more
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">No features</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-600">
                                {p.galleryImages?.length || 0} images
                              </span>
                              {p.galleryImages && p.galleryImages.length > 2 && (
                                <span className="text-xs text-green-600">
                                  (+{p.galleryImages.length - 2})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                p.status === "CONFIRMED"
                                  ? "bg-green-100 text-green-800"
                                  : p.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {p.status || "PENDING"}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditPerfection(p)}
                                className="text-blue-600 hover:text-blue-900 text-sm font-medium cursor-pointer"
                                disabled={deleting}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeletePerfection(p.id)}
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

export default PerfectionsPage;