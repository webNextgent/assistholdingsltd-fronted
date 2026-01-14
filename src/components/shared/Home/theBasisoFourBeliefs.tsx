"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

interface Belief {
  id: string;
  title: string;
  description: string;
}

const beliefs: Belief[] = [
  {
    id: "trust",
    title: "TRUST",
    description:
      "One of our most valued attributes is reliability. Maintaining a culture that fosters a sense of dependability among all parties involved improves respect, productivity, and the relationship between us and our clients.",
  },
  {
    id: "closeness",
    title: "CLOSENESS",
    description:
      " One of the main things we fail to do is to maintain rewarding, long-term connections with our clients. Our progress towards success is based on their enjoyment, which we achieve by focussing on even the smallest aspects.",
  },
  {
    id: "uniqueness",
    title: "UNIQUENESS",
    description:
      "At Assist Holdings Limited, we take a different approach. Every one of our construction projects exhibits individuality on its own. Modern architecture, cutting-edge technology, and a significant level of sustainability all come together to create captivating outcomes.",
  },
  {
    id: "integrity",
    title: "INTEGRITY",
    description:
      "One of the core values that defines us is integrity. By amassing successes and accomplishments across the new path of our journey, we show integrity in our work and win our clients' trust.",
  },
];

const BeliefsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(beliefs[0].id);
  const activeContent = beliefs.find((b) => b.id === activeTab);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 80,
    mass: 4,
  });
  const moveY = useTransform(smoothVelocity, [-1000, 1000], [20, -20]); // small translate for text

  return (
    <div className="bg-black py-20 px-4 md:px-12 text-white overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white">
          THE BASIS OF OUR BELIEFS
        </h2>
        <div className="mx-auto h-0.5 w-16 bg-[#F6BD2F]  mt-2" />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto">
        {/* Tabs + Text */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 relative bg-[#1a1a1a] min-h-[350px] lg:mr-[-100px] z-10 shadow-xl">
          <div className="flex relative mb-10 pb-1">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700 z-0" />
            {beliefs.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative uppercase tracking-widest cursor-pointer text-sm font-light transition-colors duration-300 mr-8 pb-1 z-10"
                style={{ color: activeTab === item.id ? "white" : "gray" }}
              >
                {item.title}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeContent ? activeContent.id : "empty"}
              style={{ y: moveY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[150px] mt-4"
              ref={ref}
            >
              {activeContent && (
                <p className="text-base leading-relaxed text-gray-300">
                  {activeContent.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-[-100px] lg:mt-0 z-0">
          <div className="relative w-full max-w-xl lg:h-[450px] aspect-4/3 lg:aspect-auto">
            <img
              src="https://i.postimg.cc/J41r5QBq/Concord-Malancha-22-scaled-1.jpg"
              alt="Assist-holdings-limited Developments"
              className=" object-cover  shadow-2xl h-[480px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeliefsSection;
