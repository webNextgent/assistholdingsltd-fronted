"use client";

import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  Image: string;
  content: string;
  name: string;
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    // Responsive visible count
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(2);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonial`
        );
        const json = await res.json();
        setTestimonials(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setTestimonials([]);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0)
    return (
      <div className="py-20 flex justify-center items-center">
        <p className="text-white text-xl">No testimonials available.</p>
      </div>
    );

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const nextSlide = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const totalSegments = Math.ceil(testimonials.length / visibleCount);

  return (
    <div className="bg-[#1B1B1B] text-white py-8 md:py-28 min-h-screen">
      {/* Title */}
      <div className="text-center mb-10">
        <motion.h2
          className="text-xl md:text-3xl font-light uppercase tracking-widest"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          TESTIMONIALS
        </motion.h2>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-orange-400"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-8"
            animate={{ x: `-${(100 / visibleCount) * currentIndex}%` }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`shrink-0 flex flex-col md:flex-row items-start ${
                  visibleCount === 1 ? "w-full" : "w-[calc(50%-1rem)]"
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 h-[280px] md:h-[330px] overflow-hidden">
                  <img
                    src={testimonial.Image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/50 to-red-600/50 mix-blend-multiply opacity-70"></div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 bg-black text-left md:mt-6 md:-ml-8 relative z-30  md:h-[292px] ">
                  <p className="text-white mb-4 leading-relaxed text-sm md:text-base">
                    {testimonial.content}
                  </p>
                  <p className="text-white text-left">-{testimonial.name}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center mt-12 md:mt-18 w-full mx-auto justify-between md:gap-28">
          <div className="flex">
            <motion.button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`p-2 mr-4 ${
                currentIndex === 0
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white"
              } transition duration-200`}
              whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
              whileTap={{ scale: currentIndex === 0 ? 1 : 0.9 }}
            >
              <FaArrowLeftLong className="text-2xl md:text-4xl" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`p-2 ${
                currentIndex === maxIndex
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-white"
              } transition duration-200`}
              whileHover={{ scale: currentIndex === maxIndex ? 1 : 1.1 }}
              whileTap={{ scale: currentIndex === maxIndex ? 1 : 0.9 }}
            >
              <FaArrowRightLong className="text-2xl md:text-4xl" />
            </motion.button>
          </div>

          {/* Progress Bar - Hide on mobile */}
          <div className="hidden md:flex flex-1 h-1 bg-gray-700 rounded overflow-hidden relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gray-300"
              animate={{
                x: `${(currentIndex / Math.max(1, maxIndex)) * 100}%`,
                width: `${100 / Math.max(1, totalSegments)}%`,
              }}
              transition={{
                type: "tween",
                duration: 0.5,
                ease: "easeOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
