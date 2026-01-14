/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- Blog Data Structure ---
interface Blog {
  id: number;
  date: string;
  title: string;
  imageUrl: string;
  dipped: boolean; 
}

const blogData: Blog[] = [
  {
    id: 1,
    date: '23 September, 2025',
    title: 'How to Choose the Right Orientation & Facing for Your Apartment in Dhaka?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/08/534999241_1262265922579000_4522588339009397937_n-scaled.jpg',
    dipped: false,
  },
  {
    id: 2,
    date: '10 September, 2025',
    title: 'How to Transfer Property Ownership Legally in Bangladesh?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/08/Astoria-Ground-Breking-01.jpg',
    dipped: true,
  },
  {
    id: 3,
    date: '10 September, 2025',
    title: 'How to Identify High ROI Properties in Bangladesh?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/08/Golpo-Bari-Ground-Breking-post-06.jpg',
    dipped: false,
  },
  {
    id: 4,
    date: '23 September, 2025',
    title: 'How to Choose the Right Orientation & Facing for Your Apartment in Dhaka?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/09/How-to-Choose-the-Right-Orientation-Facing-for-Your-Apartment-in-Dhaka.jpg',
    dipped: false,
  },
  {
    id: 5,
    date: '10 September, 2025',
    title: 'How to Transfer Property Ownership Legally in Bangladesh?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/09/property-handover.jpg',
    dipped: true, 
  },
  {
    id: 6,
    date: '10 September, 2025',
    title: 'How to Identify High ROI Properties in Bangladesh?',
    imageUrl: 'https://jcxbd.com/wp-content/uploads/2025/09/How-to-Identify-High-ROI-Properties-in-Bangladesh.jpg',
    dipped: false,
  },
];



const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const controls = useAnimation();

  // Animation variants for the arrow (slides right and gets bigger)
  const arrowVariants = {
    rest: { x: 0, scale: 1, color: '#374151', transition: { duration: 0.3 } },
    hover: { x: 5, scale: 1.2, color: '#2563eb', transition: { duration: 0.3 } },
  };

  // Define the 'dipped' style and animation based on the flag
  const dipStyle = blog.dipped ? 'translate-y-8' : 'translate-y-0';
  const dipMotionStyle = { y: blog.dipped ? 32 : 0 }; // 32px to match Tailwind's translate-y-8 (8*4=32)

  return (
    <motion.div
      className={`flex flex-col w-full px-4 mb-10 transition-transform duration-500 ${dipStyle}`}
      style={dipMotionStyle} // Apply the dipped style using Framer Motion
      initial={{ opacity: 0, y: 50 }} // Staggered entry animation
      whileInView={{ opacity: 1, y: dipMotionStyle.y }} 
      viewport={{ once: true, amount: 0.2 }} // Animate when 20% visible
      transition={{ duration: 0.6, delay: blog.id * 0.1 }}
      
      // Hover listeners for the Read More animation
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('rest')}
    >
      {/* Image */}
      <div className="mb-6 overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-auto object-cover aspect-4/3 transition-transform duration-500 hover:scale-[1.05]"
        />
      </div>

      {/* Content */}
      <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
      <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {blog.title}
      </h3>

      {/* Read More Link with Animated Arrow */}
      <a href={`/blog/${blog.id}`} className="flex items-center text-sm font-medium mt-auto group">
        <span className="mr-2 tracking-wider text-gray-700 hover:text-blue-600 transition-colors duration-300">
          READ MORE
        </span>
        <motion.span
          animate={controls}
          variants={arrowVariants}
          initial="rest"
          className="text-3xl" // Making the arrow text bigger
        >
          &rarr;
        </motion.span>
      </a>
    </motion.div>
  );
};


// --- Main Component ---

const NewsCards: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 justify-center">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full md:w-1/3">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCards;