/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

// Animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.2 },
  },
};

// Single Project Card
const ProjectCard = ({ project }: any) => (
  <motion.div
    className="w-full sm:w-1/2 lg:w-1/3 p-3 shrink-0"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
  >
    <div className="rounded-lg overflow-hidden group shadow-lg bg-white">
      {/* Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
          <p className="text-sm text-gray-200">{project.area}</p>
        </motion.div>
      </div>

      {/* Bottom Details */}
      <div className="p-4 text-left text-black bg-white">
        <p className="text-xs text-gray-600">{project.location}</p>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-gray-500">{project.area}</p>
      </div>
    </div>
  </motion.div>
);

// Main Component
const Ourconcerns = () => {
  const projects = [
    {
      id: 1,
      title: "assist-holdings-limited",
      location: "Dhaka, Bangladesh",
      area: "Real Estate & Property Development",
      image: "https://jcxbd.com/wp-content/uploads/2024/12/Picture2.jpg",
    },
    {
      id: 2,
      title: "assist-holdings-limited",
      location: "Dhaka, Bangladesh",
      area: "Trading & Import Business",
      image: "https://jcxbd.com/wp-content/uploads/2024/12/Picture1.jpg",
    },
    {
      id: 3,
      title: "The Rio Lounge",
      location: "Banani, Dhaka",
      area: "Hospitality & Restaurant",
      image: "https://jcxbd.com/wp-content/uploads/2024/12/Picture1.jpg",
    },
    {
      id: 4,
      title: "Bashundhara Kings FC",
      location: "Dhaka, Bangladesh",
      area: "Sports & Entertainment",
      image: "https://jcxbd.com/wp-content/uploads/2021/09/jcx-interior.jpg",
    },
    {
      id: 5,
      title: "Napier Homes Ltd.",
      location: "Dhaka, Bangladesh",
      area: "Residential & Commercial Projects",
      image: "https://jcxbd.com/wp-content/uploads/2021/09/Untitled-1-2.jpg",
    },
    {
      id: 6,
      title: "Bengal Commercial Bank Ltd.",
      location: "Dhaka, Bangladesh",
      area: "Banking & Finance",
      image: "https://jcxbd.com/wp-content/uploads/2021/09/jcx-properties-1.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 py-24 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden font-sans">
      {/* Title Section */}
      <div className="text-center mb-16">
        <motion.p
          className="text-3xl font-light uppercase tracking-widest text-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          OUR CONCERNS
        </motion.p>
        <motion.div
          className="mx-auto mt-3 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Grid Section */}
      <div className="flex flex-wrap justify-center -m-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Ourconcerns;
