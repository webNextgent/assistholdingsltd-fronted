"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { motion, Variants } from "framer-motion";
import FixedDrawer from "../Home/Recapcha";

const Footer: React.FC = () => {
  const footerLinks = [
    [
      { name: "GALLERY", href: "/gallery" },
      { name: "VIDEO", href: "/gallery" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
    [
      { name: "ABOUT US", href: "/about" },
      { name: "CSR", href: "/csr" },
      { name: "CONTACT", href: "/contact" },
    ],
    [
      { name: "OUR PROJECT", href: "/properties" },
      { name: "NEWS & EVENTS", href: "/blogs" },
    ],
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const continuousRippleVariants: Variants = {
    animate: {
      scale: [1, 1.4, 1.8],
      opacity: [0.8, 0.4, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-black text-[#C1C1C0] pt-20 pb-4 px-4 md:px-12 relative">
      <div className="max-w-7xl md:h-96 mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20 pb-10">
          {footerLinks.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`col-span-1 text-sm text-gray-300 ${
                colIndex === 2 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <ul className="space-y-8">
                {column.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-xs font-light tracking-wider hover:text-gray-400 transition-colors duration-200 ${
                        link.name === "Privacy Policy"
                          ? "text-sm text-gray-400"
                          : "uppercase"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-4">
          <p className="mb-4 md:mb-0 text-gray-300">
            © 2025 Assist Holdings Limited | All Rights Reserved.
          </p>
          <p className="mb-4 md:mb-0 text-gray-300">
           Development, SEO, & Ads By{" "}
            <a className="font-bold " href="https://nextgent.org">NextGent.org </a>
          </p>

          <div className="flex items-center space-x-4">
            {[FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram].map(
              (Icon, idx) => {
                const links = [
                  "https://www.facebook.com/Assistholdingslimited",
                  "https://l.facebook.com/l.php?u=https%3A%2F%2Flinkedin.com%2Fin%2Fassist-holdings-limited-116007383%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExV2QyM2JWU0d3dHp4eEhjOQEeh4rY43DU4QhaXdtS-5qa9EdeIEuTGm0vBxuwubqsr3j3_yJj-xKOdAtmzNI_aem_yV49j2VOaYtzkGVZCnkD-A&h=AT1xtyHf18PbLq0Zv4QfdT-DF6VlVyd0zCxte2uw7XRw9TIagmw4TWGB2XJnb8a3DNTRUh5TCBihafd4tFfykHjlcWXTWRPyjzDqCn2UBrCtVn1aNEzEjeURyqRNmYKK8Zwl",
                  "https://www.youtube.com/@AssistHoldingsLimited",
                  "https://www.instagram.com/",
                ];
                const colors = ["#3b5998", "#0077b5", "#ff0000", "#C13584"];
                return (
                  <motion.a
                    key={idx}
                    href={links[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors duration-200"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: colors[idx],
                      color: "#fff",
                    }}
                  >
                    <Icon className="text-black text-sm" />
                  </motion.a>
                );
              }
            )}
          </div>
        </div>
      </div>

      <motion.a
        href="https://wa.me/8801711181453"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-4 bottom-4 md:left-8 md:bottom-8 z-50 w-14 h-14 bg-[#783D1B] rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="text-white text-3xl" />
      </motion.a>

      <div className="fixed right-16 bottom-2 z-50">
        <div className="relative">
          {/* First Ripple Layer */}
          <motion.div
            className="absolute inset-0 rounded-full border border-gray-400"
            variants={continuousRippleVariants}
            animate="animate"
            style={{ animationDelay: "0s" }}
          />

          {/* Second Ripple Layer */}
          <motion.div
            className="absolute inset-0 rounded-full border border-gray-400"
            variants={continuousRippleVariants}
            animate="animate"
            style={{ animationDelay: "0.66s" }}
          />

          {/* Third Ripple Layer */}
          <motion.div
            className="absolute inset-0 rounded-full border border-gray-400"
            variants={continuousRippleVariants}
            animate="animate"
            style={{ animationDelay: "1.33s" }}
          />

          <motion.button
            onClick={scrollToTop}
            className="relative w-12 h-12 rounded-full bg-transparent text-gray-500 shadow-lg flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <IoIosArrowUp className="text-xl" />
          </motion.button>
        </div>
      </div>
      <FixedDrawer></FixedDrawer>
    </footer>
  );
};

export default Footer;
