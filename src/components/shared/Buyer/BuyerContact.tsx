/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { motion } from "framer-motion";

const BuyerContact: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="https://jcxbd.com/wp-content/uploads/2021/11/Page-Banners-Buyer-2.jpg"
        alt="Dream Background"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        {/* Small Text */}
        <p className="text-sm uppercase tracking-widest font-light mb-7">
          we can help you find your
        </p>

        {/* Large Text */}
        <p className="text-lg uppercase md:text-8xl tracking-widest font-light mb-6">
          DREAM
        </p>

        <p className="text-sm uppercase tracking-widest font-light mb-20">
          house
        </p>
        {/* CONTACT US Button */}
        <a
          href="#contact"
          className="relative px-8 py-3 text-sm tracking-widest border-t border-b border-white overflow-hidden group inline-block"
        >
          {/* Top border animates left → right */}
          <span className="absolute top-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>

          {/* Bottom border animates right → left */}
          <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></span>

          {/* Left border animates top → bottom */}
          <span className="absolute top-0 left-0 w-0.5 h-0 bg-white group-hover:h-full transition-all duration-500 delay-300"></span>

          {/* Right border animates bottom → top */}
          <span className="absolute bottom-0 right-0 w-0.5 h-0 bg-white group-hover:h-full transition-all duration-500 delay-300"></span>
          {/* full bg white niche thake upre animation → top */}
          <span className="absolute bottom-0 right-0 w-full h-full hover:bg-white  transition-all duration-500 delay-300"></span>

          {/* Background fill animation - BOTTOM to TOP */}
          <motion.span
            className="absolute inset-0 bg-white scale-y-0 origin-bottom z-0"
            initial={{ scaleY: 0 }}
            whileHover={{
              scaleY: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          />

          {/* Button text */}
          <span className="relative z-10 text-white   group-hover:text-black transition-colors duration-300 delay-200">
            CONTACT US
          </span>
        </a>
      </div>
    </div>
  );
};

export default BuyerContact;
