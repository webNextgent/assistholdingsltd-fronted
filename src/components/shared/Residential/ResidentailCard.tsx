"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { generateSlug } from "@/utils/slug";

interface Project {
  id: string;
  Title: string;
  Type: string;
  Category: string;
  Location: string;
  status: string;
  createdAt: string;
  description: string;
  description2: string;
  description3: string;
  galleryImages: string[];
  extraFields: Record<string, string>;
  FeaturesAmenities: Array<{ icon: string; text: string }>;
  videoUrl?: string;
}

const buttonVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, delay: 1.4 },
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  // Generate slug from Title
  const slug = generateSlug(project.Title);
  
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 p-2 sm:p-3 shrink-0">
      {/* IMPORTANT: Use the generated slug instead of raw title */}
      <Link href={`/properties/${slug}`} className="block h-full">
        <div className="rounded-lg overflow-hidden group shadow-lg cursor-pointer w-full h-full flex flex-col bg-white">
          {/* Image Section - Fixed Height */}
          <div className="relative overflow-hidden w-full h-full sm:h-72 lg:h-[580px]">
            <img
              src={project.galleryImages[0]} // Use first gallery image
              alt={project.Title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <motion.div
              className="absolute inset-0 bg-black/70 flex flex-col justify-start p-4 sm:p-6 md:p-8 text-white opacity-0 group-hover:opacity-100 z-10 space-y-2 sm:space-y-3 md:space-y-4 overflow-y-auto"
              initial={{ y: 50, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Display all extraFields dynamically */}
              {Object.entries(project.extraFields).map(([key, value]) => (
                <p key={key} className="text-xs sm:text-sm flex items-start gap-2">
                  <span className="w-1 h-1 border border-white mt-1 shrink-0"></span>
                  <span>{value}</span>
                </p>
              ))}

              {/* Explore Button */}
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="relative flex flex-col items-start mt-4 sm:mt-6 md:mt-8 my-2"
              >
                <motion.div
                  className="w-16 sm:w-20 h-px bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  style={{ originX: 0.5 }}
                />
                <div className="uppercase tracking-widest text-xs sm:text-sm font-light hover:text-gray-300 transition-colors duration-300 my-1 sm:my-2">
                  EXPLORE
                </div>
                <motion.div
                  className="w-16 sm:w-20 h-px bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  style={{ originX: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section - Fixed Height */}
          <div className="bg-white p-3 sm:p-4 text-left text-black flex flex-col flex-1 min-h-[120px]">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 capitalize">
              {project.Type}
            </p>
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 line-clamp-2 flex-1">
              {project.Title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-auto">
              {project.Location}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const ProjectFilter = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeType, setActiveType] = useState("ALL");
  const [activeLocation, setActiveLocation] = useState("ALL");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/perfections`
        );
        const result = await response.json();
        if (result.success) {
          setProjects(result.data);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("Error fetching projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Dynamic filter options based on actual data
  const categories = useMemo(() => {
    const allCategories = ["ALL", ...new Set(projects.map(project => project.Category.toUpperCase()))];
    return allCategories.filter(cat => cat && cat !== "ALL");
  }, [projects]);

  const types = useMemo(() => {
    const allTypes = ["ALL", ...new Set(projects.map(project => project.Type.toUpperCase()))];
    return allTypes.filter(type => type && type !== "ALL");
  }, [projects]);

  const locations = useMemo(() => {
    const allLocations = ["ALL", ...new Set(projects.map(project => project.Location.toUpperCase()))];
    return allLocations.filter(location => location && location !== "ALL");
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category (status) - case insensitive
    if (activeCategory !== "ALL") {
      filtered = filtered.filter(
        (project) => project.Category.toUpperCase() === activeCategory
      );
    }

    // Filter by type - case insensitive
    if (activeType !== "ALL") {
      filtered = filtered.filter(
        (project) => project.Type.toUpperCase() === activeType
      );
    }

    // Filter by location - case insensitive
    if (activeLocation !== "ALL") {
      filtered = filtered.filter((project) => 
        project.Location.toUpperCase().includes(activeLocation.toUpperCase())
      );
    }

    return filtered;
  }, [projects, activeCategory, activeType, activeLocation]);

  const handleDropdownClick = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleFilterSelect = (filterType: string, value: string) => {
    switch (filterType) {
      case "CATEGORY":
        setActiveCategory(value);
        break;
      case "TYPE":
        setActiveType(value);
        break;
      case "LOCATION":
        setActiveLocation(value);
        break;
    }
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white flex flex-col sm:flex-row border-b border-gray-700 relative z-20">
        {/* Select Category */}
        <div className="relative w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-700">
          <div
            className={`flex items-center justify-between sm:justify-center px-4 sm:px-0 py-3 sm:py-4 cursor-pointer text-base sm:text-lg ${
              activeCategory !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT CATEGORY")}
          >
            <span>SELECT CATEGORY</span>
            <span className="text-xl sm:absolute sm:right-4">
              {openDropdown === "SELECT CATEGORY" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT CATEGORY"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden z-30"
          >
            {openDropdown === "SELECT CATEGORY" && (
              <div className="border-t border-white">
                <div className="py-3 px-4 sm:px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT CATEGORY
                </div>
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => handleFilterSelect("CATEGORY", category)}
                    className={`
                      py-3 px-4 sm:px-6 text-sm text-left transition duration-200 cursor-pointer
                      ${
                        activeCategory === category
                          ? "bg-[#783D1B] font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {category === "ALL" ? "ALL CATEGORIES" : category}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Select Type */}
        <div className="relative w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-gray-700">
          <div
            className={`flex items-center justify-between sm:justify-center px-4 sm:px-0 py-3 sm:py-4 cursor-pointer text-base sm:text-lg ${
              activeType !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT TYPE")}
          >
            <span>SELECT TYPE</span>
            <span className="text-xl sm:absolute sm:right-4">
              {openDropdown === "SELECT TYPE" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT TYPE"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden z-30"
          >
            {openDropdown === "SELECT TYPE" && (
              <div className="border-t border-white">
                <div className="py-3 px-4 sm:px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT TYPE
                </div>
                {types.map((type) => (
                  <div
                    key={type}
                    onClick={() => handleFilterSelect("TYPE", type)}
                    className={`
                      py-3 px-4 sm:px-6 text-sm text-left transition duration-200 cursor-pointer
                      ${
                        activeType === type
                          ? "bg-[#783D1B] font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {type === "ALL" ? "ALL TYPES" : type}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Select Location */}
        <div className="relative w-full sm:w-1/3">
          <div
            className={`flex items-center justify-between sm:justify-center px-4 sm:px-0 py-3 sm:py-4 cursor-pointer text-base sm:text-lg ${
              activeLocation !== "ALL" ? "bg-gray-800" : "hover:bg-gray-900"
            }`}
            onClick={() => handleDropdownClick("SELECT LOCATION")}
          >
            <span>SELECT LOCATION</span>
            <span className="text-xl sm:absolute sm:right-4">
              {openDropdown === "SELECT LOCATION" ? "×" : "+"}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={
              openDropdown === "SELECT LOCATION"
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-black shadow-xl overflow-hidden z-30"
          >
            {openDropdown === "SELECT LOCATION" && (
              <div className="border-t border-white">
                <div className="py-3 px-4 sm:px-6 text-sm text-gray-400 font-light text-left border-b border-gray-700">
                  SELECT LOCATION
                </div>
                {locations.map((location) => (
                  <div
                    key={location}
                    onClick={() => handleFilterSelect("LOCATION", location)}
                    className={`
                      py-3 px-4 sm:px-6 text-sm text-left transition duration-200 cursor-pointer
                      ${
                        activeLocation === location
                          ? "bg-[#783D1B] font-semibold"
                          : "hover:bg-gray-800"
                      }
                    `}
                  >
                    {location === "ALL" ? "ALL LOCATIONS" : location}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects found matching your filters.</p>
          </div>
        ) : (
          <div className="flex flex-wrap -m-1 sm:-m-2 md:-m-3 justify-center sm:justify-start">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;
