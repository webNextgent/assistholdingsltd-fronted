/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const JCXSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yFirstText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yLastText = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="bg-black text-white py-20 px-[5%] min-h-screen flex flex-col gap-10 font-sans"
    >
      {/* Heading */}
      <motion.h1
        variants={textItemVariants}
        className="text-[1.5em] leading-relaxed max-w-3xl"
      >
        If you are looking for a company that would value your resources and
        helps you find a place with exquisite workmanship at the same time,{" "}
        <b className="text-gray-400">JCX</b> is the ultimate place to rely on.
      </motion.h1>

      {/* Content Row */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Left Image */}
        <motion.div
          variants={imageVariants}
          className="w-full md:w-[400px] h-[300px] rounded-md overflow-hidden shrink-0"
        >
          <img
            src="https://jcxbd.com/wp-content/uploads/2021/11/Page-Banners-Landowner-1.jpg"
            alt="Landowner assist-holdings-limited"
            className="w-full h-full object-cover rounded-md"
          />
        </motion.div>

        {/* Right Texts — 2 columns */}
        <div className="flex flex-col md:flex-row justify-between gap-8 grow">
          <motion.p
            style={{ y: yFirstText }}
            className="text-base leading-relaxed md:w-1/2"
          >
            At <b className="text-gray-400">Assist-holdings-limited</b>, you can put your faith
            without any hesitation because we ensure creating true value for
            your investment. Alongside, by putting your resources here at{" "}
            <b className="text-gray-400">Assist-holdings-limited</b>, you would be endowed with
            opulence and unique properties in the market and feel the ultimate
            pleasure of triumph.
          </motion.p>

          <motion.p
            style={{ y: yLastText }}
            className="text-base leading-relaxed md:w-1/2"
          >
            Our expert team understands the client journey and tries to deliver
            a consistent customer experience across the whole period, from the
            development to delivery, that helps our brand build a strong
            customer relationship and promote reliability and trustworthiness.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default JCXSection;
