/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const CSRFeature: React.FC = () => {
  const currentImage =
    "https://jcxbd.com/wp-content/uploads/2021/09/289041405_1169461870568610_3157440044715892329_n-300x225.jpg";
  const caption = "দুস্থদের মাঝে ত্রাণ বিতরণ কর্মসূচী";

  // Text animation
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  // Image animation
  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  // Arrow hover animation
  const arrowVariants: Variants = {
    hover: {
      x: [0, 5, 0],
      transition: { duration: 0.4, ease: easeOut },
    },
    tap: { scale: 0.9 },
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1260694057/photo/multi-race-hands-joined-together.jpg?s=612x612&w=0&k=20&c=lg4g0TTZ8vlQ34AJvd9NStrMWofJBPMyABGJ2b8HWcQ=')",
          filter: "brightness(70%) contrast(110%) saturate(120%)", // more vivid
          transform: "scale(1.0)",
        }}
      />

      {/* Overlay layer */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-white flex flex-col items-center justify-center px-4">
        {/* CSR LIST */}
        <motion.p
          className="text-sm tracking-widest font-light mb-10 border-b border-white pb-1"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          CSR LIST
        </motion.p>

        {/* Main Image */}
        <motion.div
          className="w-full max-w-xl mx-auto mb-6"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={currentImage}
            alt="CSR Activity"
            className="w-full max-h-[70vh] object-cover shadow-2xl rounded-md"
          />
        </motion.div>

        {/* Caption */}
        <motion.p
          className="text-lg md:text-xl font-light text-center mt-4"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          {caption}
        </motion.p>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-10 left-10 z-20 flex space-x-6 text-white/70">
        <motion.button
          className="text-4xl font-light focus:outline-none"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
        >
          &larr;
        </motion.button>
        <motion.button
          className="text-4xl font-light focus:outline-none"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
        >
          &rarr;
        </motion.button>
      </div>
    </div>
  );
};

export default CSRFeature;
