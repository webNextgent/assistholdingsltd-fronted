'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Framer Motion Variants ---

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the main text blocks
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- Data for Accordion-like Blocks ---
const csrCategories = [
  'ENVIRONMENT',
  'EDUCATION',
  'COMMUNITY',
  'SOCIAL',
];



const CategoryBlock: React.FC<{ title: string }> = ({ title }) => (
  <motion.div variants={textItemVariants} className="w-full">
    <div className="py-6 border-b border-white hover:border-blue-500 transition-colors duration-300 cursor-pointer">
      <h3 className="text-xl font-medium tracking-widest">{title}</h3>
      {/* Note: In a real app, you'd add the hidden content here and use state to toggle it. */}
    </div>
  </motion.div>
);


// --- Main Component ---

const CSRSection: React.FC = () => {
  return (
    <motion.section
      className="bg-black text-white py-16 px-4 my-32 md:px-10 lg:px-24 min-h-screen"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Animate when 10% visible
    >
      {/* Top Header Text */}
      <motion.p 
        variants={textItemVariants}
        className="text-xl mb-16 max-w-4xl leading-relaxed"
      >
        Here at assist-holdings-limited, we believe that proactive environmental responsibility and a dedication to the communities in which we invest are the most effective ways for us to generate value for our clients. And we are committed to upholding strong legal and ethical standards in our organization to reflect our motive.
      </motion.p>
      
      {/* Accordion-like Category List */}
   <div className="flex justify-end">
  <div className="w-[660px]">
    {csrCategories.map((title) => (
      <CategoryBlock key={title} title={title} />
    ))}
  </div>
</div>


      {/* Bottom Text Columns */}
     <div className="flex justify-end">
         <div className="w-[660px]  mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-200 leading-relaxed ">
        
        {/* Left Column Text */}
        <motion.p variants={textItemVariants}>
          Our projects are designed and built keeping sustainability in mind. Through our developments, we aim to solve the housing that people are changing their needs the most and that is being compromised by nature. Hence, we will keep working to set new standards in the delivery of environmentally friendly projects around the country.
        </motion.p>
        
        {/* Right Column Text */}
        <motion.p variants={textItemVariants}>
          Community and Social Responsibility come equally high on our priorities as the environment does. In the journey of our social service at assist-holdings-limited, we want it feel to make dreams come true and this extends to the communities of the underprivileged in the country.
        </motion.p>
      </div>
     </div>
    </motion.section>
  );
};

export default CSRSection;