/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";

import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import N71LakeCondos from "@/components/shared/Properties/propertiesText";
import FeaturesAmenities from "@/components/shared/Properties/PropertiesFeatures/PropertiesFeatures";
import Video from "@/components/shared/Properties/PropertiesFeatures/Vedio";
import GalleryPage from "@/components/shared/Properties/PropertiesFeatures/PropertiesPhoto";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import Testimonials from "@/components/shared/Home/Testimonials";
import { decodeSlug, generateSlug } from "@/utils/slug";

interface Project {
  id: string;
  Title: string;
  Type: string;
  coverImage: string;
  extraFields: Record<string, string>;
  description: string;
  description2: string;
  description3: string;
  status: string;
  FeaturesAmenities: any;
  videoUrl: string;
  galleryImages: string[];
}

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

// Function to parse extraFields and sort by serial number
const parseAndSortExtraFields = (extraFields: Record<string, string>) => {
  if (!extraFields) return [];

  const parsedFields = Object.entries(extraFields).map(([key, value]) => {
    // Split key to get serial number and icon name
    const [serialPart, ...iconParts] = key.split("_");
    const serialNumber = parseInt(serialPart) || 0;
    const iconName = iconParts.join("_");

    // Split value to get field name and field value
    const [fieldName, ...fieldValueParts] = value.split(": ");
    const fieldValue = fieldValueParts.join(": ");

    return {
      serialNumber,
      iconName,
      fieldName: fieldName?.trim() || "",
      fieldValue: fieldValue?.trim() || "",
      originalKey: key,
    };
  });

  // Sort by serial number
  return parsedFields.sort((a, b) => a.serialNumber - b.serialNumber);
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/perfections`
        );
        const result = await response.json();

        if (result.success && result.data) {
          // Decode the slug back to original title
          const originalTitle = decodeSlug(slug);
          console.log("Decoded Title from URL:", originalTitle);

          // Try multiple matching strategies
          let foundProject = null;

          // Strategy 1: Exact match with decoded title
          foundProject = result.data.find(
            (p: Project) =>
              p.Title.toLowerCase() === originalTitle.toLowerCase()
          );

          if (!foundProject) {
            // Strategy 2: Match with slug generated from Title
            foundProject = result.data.find((p: Project) => {
              const projectSlug = generateSlug(p.Title);
              return projectSlug === slug.toLowerCase();
            });
          }

          if (!foundProject) {
            // Strategy 3: Case-insensitive partial match
            foundProject = result.data.find((p: Project) => {
              const normalizedTitle = p.Title.toLowerCase().replace(
                /\s+/g,
                " "
              );
              const normalizedSlug = originalTitle
                .toLowerCase()
                .replace(/\s+/g, " ");
              return (
                normalizedTitle.includes(normalizedSlug) ||
                normalizedSlug.includes(normalizedTitle)
              );
            });
          }

          if (!foundProject) {
            // Strategy 4: Remove special characters and try again
            foundProject = result.data.find((p: Project) => {
              const cleanTitle = p.Title.replace(/[^\w\s]/gi, "").toLowerCase();
              const cleanSlug = originalTitle
                .replace(/[^\w\s]/gi, "")
                .toLowerCase();
              return cleanTitle === cleanSlug;
            });
          }

          if (foundProject) {
            setProject(foundProject);
          } else {
            console.log(
              "Available projects:",
              result.data.map((p: Project) => p.Title)
            );
            console.log("Looking for:", originalTitle);
            setError(
              `Project not found. Available: ${result.data
                .map((p: Project) => p.Title)
                .join(", ")}`
            );
          }
        } else {
          setError("Failed to fetch project data");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error fetching project");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
        <div className="text-xl text-red-600 mb-4">
          {error || "Project not found"}
        </div>
        <div className="text-gray-600 mb-2">URL Slug: {slug}</div>
        <Link href="/properties" className="text-blue-600 hover:underline">
          Back to Properties
        </Link>
      </div>
    );
  }

  // Parse and sort extra fields
  const sortedExtraFields = parseAndSortExtraFields(project.extraFields);

  return (
    <div className="min-h-screen bg-white">
      <LandownerBanner
        img={project?.galleryImages?.[1] || project?.galleryImages?.[0]}
        title="Properties"
        text={project.Title}
      />

      <N71LakeCondos
        des={project.description}
        des2={project.description2}
        des3={project.description3}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-24">
        {/* Title Section */}
        <div className="text-center my-12 md:my-20 uppercase">
          <motion.p
            className="text-2xl sm:text-3xl font-light uppercase tracking-widest text-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            at a glance
          </motion.p>
          <motion.div
            className="mx-auto mt-2 h-1 w-14 bg-blue-600"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Project Details Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Left: Project Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-full">
              <img
                src={project?.galleryImages?.[0]}
                alt={project.Title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Right: Project Info - Only Extra Fields */}
          <div className="w-full lg:w-1/3">
            <div className="w-full space-y-4 sm:space-y-6">
              {/* Dynamic Extra Fields Display */}
              {sortedExtraFields.length > 0 ? (
                sortedExtraFields.map((field, index) => (
                  <motion.div
                    key={field.originalKey}
                    className="flex items-start sm:items-center py-2 sm:py-3 border-b border-gray-200"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                  >
                    <div className="flex flex-col items-center justify-center md:flex-row md:items-center w-full gap-3">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-10 h-10 bg-[#FBC341] text-white rounded-lg shrink-0 mr-2">
                        {renderIcon(field.iconName, 20)}
                      </div>

                      {/* Field Name and Value */}
                      <div className="flex-1">
                        <span className="font-semibold text-[#003C8C] text-sm sm:text-base md:mr-20">
                          {field.fieldName}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 text-sm sm:text-base flex-1 w-full">
                          {field.fieldValue}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="text-center py-8 text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  No additional information available
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* @ts-ignore */}
      <FeaturesAmenities features={project.FeaturesAmenities} />
      <Video url={project.videoUrl} />
      <GalleryPage images={project.galleryImages} />
      <Enquiry />
      <Testimonials />
    </div>
  );
}
