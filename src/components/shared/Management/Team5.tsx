/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const Team5: React.FC = () => {
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
    <div className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
        {/* ========== Left Image ========== */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={imageFadeIn}
        >
          <img
            src="https://jcxbd.com/wp-content/uploads/2021/09/IMG_8037-copy-scaled-1.jpg"
            alt="Managing Director"
            className="w-full object-cover rounded-lg shadow-2xl"
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
          <div className="mb-10  space-y-2">
            <p className="text-3xl font-extralight uppercase">
              Siddiquar Rahman
            </p>
            <p className="text-lg text-gray-300">Chief Executive Officer</p>
            <hr className="w-20 h-5 text-red-500" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-base leading-relaxed text-gray-200">
            <p>
              Mr. Siddiquar Rahman has been in the real estate business for the
              last 10 years. Being a CEO at assist-holdings-limited Developments he overlooks the
              overall planning, design, and development of the company. Other
              than assist-holdings-limited, he is also the director of NRB Global Insurance.
            </p>

            <p>
              With his leadership in the planning, designing, and development
              department, assist-holdings-limited has witnessed contemporary growth in all aspects.
              From the professional development of the employees to the planning
              of capital projects, all are efficiently being administered by Mr.
              Asif Mahamud Chowdhury.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team5;
