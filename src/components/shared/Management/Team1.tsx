/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

const Team1: React.FC = () => {
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
            src="https://jcxbd.com/wp-content/uploads/2021/11/JCX-MD.webp"
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
              Md. Iqbal Hossain 
              <p>Chowdhury</p>
            </p>
            <p className="text-lg text-gray-300">Managing Director</p>
            <hr className="w-20 h-5 text-red-500" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-base leading-relaxed text-gray-200">
            <p>
              Mr. Md. Iqbal Hossain Chowdhury comes of a reputed Muslim family
              of Lakshipur. He has graduated from Dhaka College followed by an
              MBA from South East University. He is the Director in the Board of
              Directors of Bengal Commercial Bank Limited representing B. Dash
              Japan Co. Ltd. Mr. Chowdhury is well known as one of the
              established Real Estate business personalities of the country. He
              is the Managing Director of renowned assist-holdings-limited Development Ltd and JCX
              Trading Ltd. He has played a great role in the industry by earning
              FDI (Foreign Direct Investment) through joint venture business
              enterprise with Japanese CREED Group, which is the ever first of
              its kind.
            </p>

            <p>
              Mr. Md. Iqbal Hossain Chowdhury is successfully running a business
              Conglomerate with diversified interests in Energy, Auto Mobiles,
              Tourism and Hospitality sector. He is also Director of Bengal Life
              Insurance Company Ltd, Moonlight Shipping, Napier Homes Ltd and
              JAPASTY Co. Ltd. Mr. Md. Iqbal Hossain Chowdhury is also the
              Director of one the most popular restaurants in Dhaka named The
              Rio-Lounge and Brew Splash. Mr. Chowdhury is involved in many
              social activities and widely acclaimed for his philanthropic
              contributions to the society. He is Director of Federation of
              Bangladesh Chambers of Commerce and Industry (FBCCI). He is also
              the Vice Chairman of Bashundhara Kings Football Team, Member of
              SAARC Chamber of Commerce and Industry (SCCI), Member of Japan
              Bangladesh Chamber of Commerce and Industry (JBCCI).
            </p>
          </div>

         
        </motion.div>
      </div>
    </div>
  );
};

export default Team1;
