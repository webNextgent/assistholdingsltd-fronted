/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useCreateEnquiryMutation } from "@/redux/features/enquiry/enquiryApi";

// --- Types ---
interface FormInputs {
  firstName: string;
  lastName: string;
  phoneLandowner: string;
  phoneDifferent?: string;
  email: string;
  location: string;
  landSize: string;
  features?: string;
  message: string;
}

// --- Framer Motion Variants ---
const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
};

// --- Reusable Input Field ---
const FormField: React.FC<{
  name: keyof FormInputs;
  placeholder: string;
  type?: string;
  register: any;
  required?: string;
  error?: string;
}> = ({ name, placeholder, type = "text", register, required, error }) => (
  <div className="w-full mb-6">
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { required })}
      className={`w-full border-b py-2 transition duration-200 bg-transparent text-black focus:outline-none ${
        error
          ? "border-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-blue-500"
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// --- Main Component ---
const Enquiry: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Client-side validation
      if (data.message.length < 10) {
        toast.error("Message must be at least 10 characters long");
        return;
      }

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneLandowner,
        secondPhone: data.phoneDifferent || "",
        location: data.location,
        landSize: data.landSize,
        attractiveFeature: data.features || "",
        message: data.message,
        email: data.email,
      };

      // Using RTK Query mutation
      const response = await createEnquiry(payload).unwrap();

      toast.success("Enquiry submitted successfully!");
      setIsSubmitted(true);
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);

      // Handle different error formats
      if (err?.data?.message) {
        // Backend validation error
        toast.error(err.data.message);
      } else if (err?.data?.errorMessages) {
        // Multiple error messages from backend
        err.data.errorMessages.forEach((error: any) => {
          toast.error(error.message);
        });
      } else if (err?.status === 400) {
        toast.error("Validation failed. Please check your inputs.");
      } else if (err?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(err?.message || "Something went wrong");
      }
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <AnimatePresence>
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <h2 className="text-5xl font-light text-blue-600 mb-4">
              CONGRATULATIONS!
            </h2>
            <p className="text-xl text-gray-700 max-w-lg">
              Your enquiry has been successfully submitted. Our team will review
              your details and get in touch with you shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-8 border border-blue-500 text-blue-500 px-8 py-3 tracking-widest hover:bg-blue-500 hover:text-white transition duration-300"
            >
              SUBMIT ANOTHER ENQUIRY
            </button>
          </motion.div>
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <div className="min-h-screen flex justify-center p-5 md:py-28 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-[35px] font-light tracking-widest text-gray-800">
              ENQUIRY
            </h1>
            <div className="w-12 h-0.5 bg-orange-400 mx-auto mt-2"></div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <FormField
              name="firstName"
              placeholder="First Name"
              register={register}
              required="First Name is required"
              error={errors.firstName?.message}
            />
            <FormField
              name="lastName"
              placeholder="Last Name"
              register={register}
              required="Last Name is required"
              error={errors.lastName?.message}
            />
            <FormField
              name="phoneLandowner"
              placeholder="Phone Number (Landowner)"
              type="text"
              register={register}
              required="Phone Number (Landowner) is required"
              error={errors.phoneLandowner?.message}
            />
            <FormField
              name="phoneDifferent"
              placeholder="Phone Number (If Different)"
              type="text"
              register={register}
            />
            <FormField
              name="email"
              placeholder="Email"
              type="email"
              register={register}
              required="Email is required"
              error={errors.email?.message}
            />
            <FormField
              name="location"
              placeholder="Location"
              register={register}
              required="Location is required"
              error={errors.location?.message}
            />
            <FormField
              name="landSize"
              placeholder="Size of Land"
              register={register}
              required="Size of Land is required"
              error={errors.landSize?.message}
            />
            <FormField
              name="features"
              placeholder="Attractive Features (If Any)"
              register={register}
            />
          </div>

          {/* Message Field */}
          <div className="w-full mt-4 mb-12">
            <textarea
              placeholder="Message (Minimum 10 characters)"
              {...register("message", {
                required: "Message is required"
              })}
              rows={3}
              className={`w-full border-b py-2 transition duration-200 bg-transparent text-black focus:outline-none ${
                errors.message
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              disabled={isLoading}
              className={`border border-[#FBC342] px-8 py-3 tracking-widest transition duration-300 ${
                isLoading
                  ? "bg-gray-400 border-gray-400 text-white cursor-not-allowed"
                  : "text-[#FBC342] hover:bg-blue-500 hover:text-white"
              }`}
            >
              {isLoading ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Enquiry;
