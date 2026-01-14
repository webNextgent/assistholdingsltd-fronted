'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Data for the awards/logos
const awards = [
  {
    id: 1,
    name: 'UKAS Management Systems',
    image: 'https://jcxbd.com/wp-content/uploads/2023/09/Award-2-min.webp',
  },
  {
    id: 2,
    name: 'U.S. Green Building Council - LEED USGBC',
    image: 'https://jcxbd.com/wp-content/uploads/2023/09/Award-1-min.webp',
  },
  {
    id: 3,
    name: 'ISO 9001:2015 Certification',
    image: 'https://jcxbd.com/wp-content/uploads/2023/09/Award-3-min.webp',
  },
];

const OurAwardsandRecognition: React.FC = () => {
    
    // Framer Motion variant for staggering the cards
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    // Framer Motion variant for each individual card (fade-in from bottom)
    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
            }
        },
    };

    return (
        // The background in the image appears to be a very light gray/off-white
        <div className="bg-[#F2F2F2] py-20 px-4 md:px-12 text-gray-800">
            
            {/* Section Header */}
            <div className="text-center mb-16">
                <motion.h2
                    className="text-xl md:text-4xl font-light uppercase tracking-wider"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    OUR AWARDS AND RECOGNITION
                </motion.h2>
                {/* Decorative Blue Underline */}
                <motion.div
                    className="mx-auto mt-2 h-0.5 w-20 bg-blue-600"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    style={{ transformOrigin: "center" }}
                ></motion.div>
            </div>

            {/* Awards Grid Container */}
            <motion.div
                className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Triggers when 40% of the container is visible
            >
                {awards.map((award) => (
                    <motion.div
                        key={award.id}
                        variants={itemVariants}
                        className="bg-white md:p-8 rounded-lg flex flex-col items-center justify-center md:h-80 transition-shadow duration-300 hover:shadow-xl"
                    >
                        {/* Award Logo/Badge */}
                        <div className="relative w-full h-40 flex items-center justify-center">
                            <Image
                                src={award.image}
                                alt={award.name}
                                layout="fill"
                                objectFit="contain"
                                className="p-4" // Add padding to ensure the logo fits within the white card
                                unoptimized // Required for external image URLs without next.config.js setup
                            />
                        </div>
                        
                        {/* Optional: Award Name below the logo */}
                        {/* <p className="text-sm text-gray-500 mt-4 text-center">{award.name}</p> */}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default OurAwardsandRecognition;