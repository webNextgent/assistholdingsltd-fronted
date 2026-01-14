"use client";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { getDecodedToken } from "@/utils/jwt";
import { useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Current password is required";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Get user info from token
      const decodedToken = getDecodedToken();
      
      if (!decodedToken) {
        toast.error("User not authenticated. Please login again.");
        return;
      }

      console.log("User from token:", decodedToken);

      // Send data with user ID/email from token
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        userId: decodedToken.id, // Send user ID
        userEmail: decodedToken.email // Send email if needed
      }).unwrap();

      toast.success("Password changed successfully!");
      
      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
    } catch (error: any) {
      console.error("Password change error:", error);
      toast.error(error?.data?.message || error?.message || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
          <p className="text-gray-600 mt-2">Update your account password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.oldPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter current password"
            />
            {errors.oldPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 text-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7A3E1B] hover:bg-[#6a3618] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7A3E1B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>

        {/* Security Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Password Tips</h3>
          <ul className="mt-2 text-xs text-blue-700 list-disc list-inside space-y-1">
            <li>Use at least 6 characters</li>
            <li>Include numbers and special characters</li>
            <li>Avoid common words or phrases</li>
            <li>Don't reuse old passwords</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;