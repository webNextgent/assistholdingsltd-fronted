"use client";

import React from "react";
import { motion } from "framer-motion";

const Map: React.FC = () => {
  const MAP_URL =
    "https://maps.app.goo.gl/T7eGL6TfFksrZWmd6";
  const STATIC_MAP_IMAGE =
    "https://i.postimg.cc/bJJ0YwXQ/Screenshot-2026-01-12-142500.png";

  return (
    <div className="text-white w-full">
      <div className="w-full mx-auto">
        <motion.a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full h-72 md:h-[600px] cursor-pointer overflow-hidden shadow-2xl"
          initial="restMap" 
          whileHover="hoverMap" 
        >
          <img
            src={STATIC_MAP_IMAGE}
            alt="Map of Dhaka, Bangladesh showing assist-holdings-limited location"
            className="w-full h-full object-cover"
          />

          <motion.div
            className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4"
            variants={{
              restMap: { opacity: 0 },
              hoverMap: {
                opacity: 1,
                transition: { duration: 0.3 },
              },
            }}
          >
            <motion.div
              className="relative uppercase tracking-widest text-lg md:text-xl font-light px-8 py-3 border border-white rounded overflow-hidden z-20"
              initial="rest"
              whileHover="fill"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-white z-0"
                variants={{
                  rest: { scaleY: 0, transformOrigin: "bottom" },
                  fill: {
                    scaleY: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              />

              <motion.span
                className="relative z-10"
                variants={{
                  rest: { color: "#ffffff" },
                  fill: {
                    color: "#000000",
                    transition: { delay: 0.2, duration: 0.1 },
                  },
                }}
              >
                CLICK TO LOAD THE MAP
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default Map;