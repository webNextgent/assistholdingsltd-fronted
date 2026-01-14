/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const GreenLivingSection: React.FC = () => {
  // 📜 Framer Motion Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut, staggerChildren: 0.2 },
    },
  };

  const imageFadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: easeOut },
    },
  };

  return (
    <div className="bg-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
        
        {/* ==================== Left Text Section ==================== */}
        <motion.div
          className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          {/* Main Title */}
          <motion.div className="" variants={fadeUp}>
            <h2 className="text-5xl font-extralight text-gray-800 uppercase relative inline-block">
              GREEN LIVING
              <span className="absolute mt-2 left-0 bottom-[-5px] h-0.5 w-1/3 bg-blue-700"></span>
            </h2>
          </motion.div>

          {/* Main Content Paragraphs */}
          <motion.div className="text-gray-600 space-y-6 text-base" variants={fadeUp}>
            <p>
              We believe that there should be a positive effect at every stage of our ongoing progress towards the future. As a result, our structures are prepared for the future. This is made possible by designing our flats with sustainability in mind, including adequate ventilation, beautifully planted rooftops, and kid-friendly green spaces where families can congregate. As a result, future generations will live in our apartments. We aim to be in the forefront of the movement for constructive change.
            </p>
          </motion.div>

       
        </motion.div>

        {/* ==================== Right Image Section ==================== */}
        <motion.div
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={imageFadeIn}
        >
          <img
            src="https://i.ibb.co/LDW4HD6r/Luxury-Apartment-for-Sale-in-Dhanmondi-Concord-Hazera-Mansion-10.jpg" 
            alt="Green Living and Rooftop Garden"
            className="w-full h-full object-cover shadow-2xl"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default GreenLivingSection;