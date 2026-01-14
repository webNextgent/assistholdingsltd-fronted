/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

import * as Icons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as FiIcons from "react-icons/fi";
import { generateSlug } from "@/utils/slug";

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10,
      delay: 1.5,
    },
  },
};

interface FeatureAmenity {
  icon: string;
  text: string;
}

interface Perfection {
  id: string;
  Title: string;
  description: string;
  description2: string;
  description3: string;
  icon: string;
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

// Render icons dynamically
const renderIcon = (iconName: string, size: number = 16) => {
  if (!iconName) return null;
  const libraries = [Icons, IoIcons, MdIcons, HiIcons, FiIcons];

  for (const library of libraries) {
    const IconComponent = (library as any)[iconName];
    if (IconComponent) return <IconComponent size={size} />;
  }
  return null;
};

// Function to get sorted extra fields
const getSortedExtraFields = (extraFields: Record<string, string> = {}) => {
  return Object.entries(extraFields)
    .sort(([keyA], [keyB]) => {
      // Extract numbers from keys like "1_FaMapPin", "2_FaVectorSquare"
      const numA = parseInt(keyA.split("_")[0]) || 0;
      const numB = parseInt(keyB.split("_")[0]) || 0;
      return numA - numB;
    })
    .map(([key, value]) => ({
      key,
      value,
      iconName: key.split("_")[1], // Extract icon name from key
    }));
};

const OurPerfections: React.FC = () => {
  const [perfections, setPerfections] = useState<Perfection[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Fetch data
  useEffect(() => {
    const fetchPerfections = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/perfections`
        );
        const json = await res.json();
        setPerfections(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to fetch perfections:", err);
        setPerfections([]);
      }
    };
    fetchPerfections();
  }, []);

  // FIXED BREAKPOINTS (phone=1, tablet=2, laptop=3, large=4)
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1536) setVisibleCount(4); // 2XL screen
      else if (width >= 1050) setVisibleCount(3); // Laptop
      else if (width >= 640) setVisibleCount(2); // Tablet
      else setVisibleCount(1); // Phone
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (!perfections.length)
    return (
      <div className="py-20 flex justify-center items-center">
        <p className="text-white text-xl">No perfections available.</p>
      </div>
    );

  const maxIndex = Math.max(0, perfections.length - visibleCount);
  const totalSegments = perfections.length - visibleCount + 1;

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-black text-white py-8">
      {/* Header */}
      <div className="text-center mb-20">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          OUR PERFECTIONS
        </motion.p>

        <motion.div
          className="mx-auto mt-2 h-1 w-14 bg-[#F6BD2F]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Slider */}
      <div className="relative w-full mx-auto px-2">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {perfections.map((perfection) => {
              const slug = generateSlug(perfection.Title);

              const sortedExtraFields = getSortedExtraFields(
                perfection.extraFields
              );

              return (
                <Link
                  href={`/properties/${slug}`}
                  key={perfection.id}
                  className="shrink-0 overflow-hidden group cursor-pointer"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <div className="relative w-full bg-black overflow-hidden group">
                      <img
                        src={
                          perfection.galleryImages?.[0] ||
                          perfection.icon ||
                          "/default-image.jpg"
                        }
                        alt={perfection.Title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/70 flex flex-col p-6 opacity-0 group-hover:opacity-100 z-10"
                      initial={{ y: 50, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Sorted extra fields */}
                      {sortedExtraFields.map((field, index) => (
                        <p
                          key={index}
                          className="text-sm text-gray-200 mb-2 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 border border-white"></span>
                          <span>{field.value}</span>
                        </p>
                      ))}

                      <motion.div
                        variants={buttonVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-16"
                      >
                        <motion.div
                          className="w-20 h-px bg-white"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                        <motion.span className="uppercase tracking-widest text-sm font-light my-2 block">
                          EXPLORE
                        </motion.span>
                        <motion.div
                          className="w-20 h-px bg-white"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom Info */}
                  <div className="bg-black/80 p-4">
                    <p className="text-sm text-gray-300">{perfection.Type}</p>
                    <h3 className="text-xl font-bold">{perfection.Title}</h3>
                    <p className="text-sm text-gray-300">
                      {perfection.Category}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {/* Sorted extra fields for bottom section */}
                      {sortedExtraFields.slice(0, 2).map((field, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-gray-700 rounded text-xs"
                        >
                          {renderIcon(field.iconName, 12)}
                          {field.value.split(":")[0]}
                        </span>
                      ))}

                      {sortedExtraFields.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{sortedExtraFields.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 mr-4 ${
              currentIndex === 0
                ? "text-gray-500"
                : "text-white hover:text-red-600"
            }`}
          >
            <FaArrowLeftLong className="text-4xl" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`p-2 mr-6 ${
              currentIndex === maxIndex
                ? "text-gray-500"
                : "text-white hover:text-red-600"
            }`}
          >
            <FaArrowRightLong className="text-4xl" />
          </button>

          {/* Progress Bar */}
          <div className="hidden md:flex flex-1 h-px bg-gray-400 rounded overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gray-200"
              animate={{
                x: `${(currentIndex / (totalSegments - 1)) * 100}%`,
                width: `${100 / totalSegments}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPerfections;
