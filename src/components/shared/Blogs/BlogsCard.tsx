/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGetAllBlogsQuery } from '@/redux/features/blogs/blogsApi';

// --- Blog Data Structure ---
interface Blog {
  id: string;
  createdAt: string;
  title: string;
  Image: string;
  dipped?: boolean; // Optional flag for styling
}

// --- Sub-Component: Individual Blog Card ---
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const controls = useAnimation();

  const arrowVariants = {
    rest: { x: 0, scale: 1, color: '#374151', transition: { duration: 0.3 } },
    hover: { x: 5, scale: 1.2, color: '#2563eb', transition: { duration: 0.3 } },
  };

  const dipStyle = blog.dipped ? 'translate-y-8' : 'translate-y-0';
  const dipMotionStyle = { y: blog.dipped ? 32 : 0 };

  return (
    <motion.div
      className={`flex flex-col w-full px-4 mb-10 transition-transform duration-500 ${dipStyle}`}
      style={dipMotionStyle}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: dipMotionStyle.y }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('rest')}
    >
      {/* Image */}
      <div className="mb-6 overflow-hidden">
        <img
          src={blog.Image}
          alt={blog.title}
          className="w-full h-auto object-cover aspect-4/3 transition-transform duration-500 hover:scale-[1.05]"
        />
      </div>

      {/* Content */}
      <p className="text-gray-500 text-sm mb-2">
        {new Date(blog.createdAt).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {blog.title}
      </h3>

      {/* Read More Link */}
      <a href={`/blogs/${blog.id}`} className="flex items-center text-sm font-medium mt-auto group">
        <span className="mr-2 tracking-wider text-gray-700 hover:text-blue-600 transition-colors duration-300">
          READ MORE
        </span>
        <motion.span animate={controls} variants={arrowVariants} initial="rest" className="text-3xl">
          &rarr;
        </motion.span>
      </a>
    </motion.div>
  );
};

// --- Main Component ---
const BlogsCard: React.FC = () => {
  const { data: blogsData, isLoading, isError } = useGetAllBlogsQuery(null);

  if (isLoading) return <p className="text-center py-20">Loading blogs...</p>;
  if (isError) return <p className="text-center py-20 text-red-500">Failed to load blogs.</p>;

  // Optionally, mark every 2nd blog as 'dipped'
  const blogsWithDipped = blogsData?.map((blog: Blog, index: number) => ({
    ...blog,
    dipped: index % 2 === 1,
  })) || [];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4 justify-center">
          {blogsWithDipped.map((blog:any) => (
            <div key={blog.id} className="w-full md:w-1/3">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
