'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroBanner: React.FC = () => {
  
  // Framer Motion variants for staggered text entrance
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between words
        delayChildren: 0.5, // Delay before the first word starts
      },
    },
  };

  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Framer Motion variants for the button and lines
  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        delay: 1.5, // Appears after the main text
      },
    },
  };

  return (
    // 1. Full-width container setup
    <div className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      
      {/* 2. Image Background (Next.js Image) */}
      <Image
        src="https://i.postimg.cc/2jLcXpnZ/1723884127Ih-DHF.jpg" // Replace with your local image path if possible
        alt="Luxury interior with glass railings and modern lighting"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="brightness-50" // Slightly dim the image for better text readability
        unoptimized // Remove this line if using a local image in /public
      />

      {/* 3. Text Overlay Container */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 p-4">
        
        {/* Top Text: "A LITTLE PIECE OF" */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm font-light tracking-widest uppercase mb-4"
        >
          A LITTLE PIECE OF
        </motion.p>

        {/* Main Text: "HEAVEN" - Staggered Animation */}
        <motion.h1
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-8xl font-extralight tracking-tighter uppercase mb-20 md:mb-28"
        >
          {['H', 'E', 'A', 'V', 'E', 'N'].map((char, index) => (
            <motion.span 
              key={index} 
              variants={textItemVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Contact Button Area */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center"
        >
          {/* Top Line */}
          <motion.div 
            className="w-32 h-px bg-white mb-3" 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{ originX: 0.5 }}
          />
          
          {/* Button Text */}
          <motion.a
            href="contact"
            className="uppercase tracking-widest text-sm font-light px-8 py-2 hover:text-gray-300 transition-colors duration-300"
            // Simple hover animation for the text
            whileHover={{ scale: 0.5 }} 
            whileTap={{ scale: 0.5 }}
          >
            CONTACT US
          </motion.a>
          
          {/* Bottom Line */}
          <motion.div 
            className="w-32 h-px bg-white mt-3" 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{ originX: 0.5 }}
          />

        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;