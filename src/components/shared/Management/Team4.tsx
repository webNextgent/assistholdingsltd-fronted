/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const Team4: React.FC = () => {
  // ✨ Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.2 },
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
    <div className="bg-white text-black py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ========== Left Image ========== */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={imageFadeIn}
        >
          <img
            src="https://jcxbd.com/wp-content/uploads/2021/11/MAD05201-1.jpg"
            alt="Managing Director"
            className="w-full h-full object-cover rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* ========== Right Text ========== */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          {/* Name & Designation */}
          <div className="mt-10 pl-4 space-y-2">
            <p className="text-3xl font-extralight uppercase">
             MD MIRJA GOLAM 
             <p>RAHMAN </p>

            </p>
            <p className="text-lg "> DIRECTOR - construction, SCM & administration</p>
            <hr className="w-20 h-5 text-blue-500" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-base leading-relaxed ">
            <p>
              Md. Mirja Golam Rahman was born in 1989 in Lakshmipur district. In past days he was involved in stock market, garment business & import business. Currently he is a Director of Construction, SCM and Administration Department of assist-holdings-limited Development Limited & he is young entrepreneur. Being a young and dynamic leader, he works on various innovations in procurement strategy implementation and management for the sake of company development.
            </p>

            <p>
              Born in Dhaka District, Mr. Muhit is one of the youngest FCCA in
              Bangladesh. He obtained his ACCA qualification from Kaplan
              Financial, London, United Kingdom in 2013, showcasing his
              dedication to professional growth.
            </p>
            <p>
              Throughout his career, Mr. Muhit has actively participated in
              various professional training and development courses, enhancing
              his skills and efficiency in all aspects of his job. This
              commitment to continuous improvement has set him apart as a
              dynamic and ambitious professional. Starting his career in 2012,
              Mr. Muhit has held positions in renowned companies within the
              Finance & Accounts Department. Notably, he served as the Head of
              Finance and Accounts Department at Rangs Group, further
              solidifying his expertise in the field.
            </p>
            <p>
              Born in Dhaka District, Mr. Muhit is one of the youngest FCCA in
              Bangladesh. He obtained his ACCA qualification from Kaplan
              Financial, London, United Kingdom in 2013, showcasing his
              dedication to professional growth.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team4;
