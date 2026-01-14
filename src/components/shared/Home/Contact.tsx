'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

const socialLinks = [
  { icon: FaFacebookF, href: 'https://www.facebook.com/Assistholdingslimited', color: '#3b5998' },
  { icon: FaLinkedinIn, href: 'https://l.facebook.com/l.php?u=https%3A%2F%2Flinkedin.com%2Fin%2Fassist-holdings-limited-116007383%3Ffbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBExV2QyM2JWU0d3dHp4eEhjOQEeh4rY43DU4QhaXdtS-5qa9EdeIEuTGm0vBxuwubqsr3j3_yJj-xKOdAtmzNI_aem_yV49j2VOaYtzkGVZCnkD-A&h=AT1xtyHf18PbLq0Zv4QfdT-DF6VlVyd0zCxte2uw7XRw9TIagmw4TWGB2XJnb8a3DNTRUh5TCBihafd4tFfykHjlcWXTWRPyjzDqCn2UBrCtVn1aNEzEjeURyqRNmYKK8Zwl', color: '#0077b5' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@AssistHoldingsLimited', color: '#ff0000' },
  { icon: FaInstagram, href: 'https://www.instagram.com/', color: '#C13584' },
];

const FixedSocialSidebar: React.FC = () => {
  return (
    // Fixed container on the right side of the screen
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 shadow-2xl hidden lg:block">

      {socialLinks.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#783D1B] border-b border-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300"
            // Set initial state for background (Dark Blue)
            initial={{ backgroundColor: '#783D1B' }}
            whileHover={{
              backgroundColor: item.color,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="text-white text-xl" />
          </motion.a>
        );
      })}

   

    </div>
  );
};

export default FixedSocialSidebar;