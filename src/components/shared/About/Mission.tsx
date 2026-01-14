"use client";

import React, { useState } from "react";

const aboutUsData = [
  {
    id: 1,
    title: "MISSION",
    imageUrl: "https://img.freepik.com/free-photo/business-strategy-success-target-goals_1421-33.jpg",
    description:
      "At Assist Holdings Limited, our mission is to provide innovative and sustainable real estate solutions that empower individuals and families to achieve their dream of property ownership. We are committed to delivering high-quality developments, transparent services, and lasting value for our clients, partners, and communities. And also empower individuals and families to achieve their dreams of land ownership by providing transparent, secure, and value-driven real estate and land share solutions. We are dedicated to building lasting trust through innovation, integrity, and excellence in every project we undertake.",
  },
  {
    id: 2,
    title: "BRAND PROMISE",
    imageUrl: "https://simplestrat.com/hubfs/SS_Brand%20Promise_Featured%20Image.jpg",
    description:
      "Our brand promise is to establish trust with clients with a touch of our individuality and integrity.",
  },
  {
    id: 3,
    title: "VISION",
    imageUrl: "https://cdn.create.vista.com/api/media/small/655544618/stock-photo-vision-human-hands-holding-black-silhouette-word",
    description:
      "Our vision is to become a leading and trusted name in the real estate and land share industry, creating sustainable communities and unlocking opportunities that enhance the quality of life for our clients and future generations.",
  },
];

const AboutUsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="flex flex-col sm:flex-row bg-black overflow-hidden">
      {aboutUsData.map((item) => (
        <div
          key={item.id}
          className={`
            relative group 
            h-96
            overflow-hidden cursor-pointer 
            transition-all duration-700 ease-in-out
            ${hoveredCard === item.id ? "sm:w-[50%]" : "sm:w-[35%] w-full"}
          `}
          onMouseEnter={() => setHoveredCard(item.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Background Image */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out 
              ${hoveredCard === item.id ? "scale-110" : "scale-100"}`}
          />

          {/* Dark Overlay */}
          <div
            className={`absolute inset-0 transition-all duration-700 
              ${hoveredCard === item.id ? "bg-black/60" : "bg-black/40"}`}
          ></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-8 z-10">
            <h2
              className={`font-bold tracking-wide transition-all duration-700 ${
                hoveredCard === item.id ? "text-xl mb-4" : "text-xl"
              } w-full`}
            >
              {item.title}
            </h2>

            {/* Description (Only on hover) */}
            <p
              className={`max-w-md text-sm sm:text-base transition-all duration-700 ease-in-out ${
                hoveredCard === item.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 absolute"
              }`}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsSection;