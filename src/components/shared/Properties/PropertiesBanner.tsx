"use client";
import { useGetAllPropertiesQuery } from "@/redux/features/properties/propertiesApi";
import React from "react";
const BACKGROUND_IMAGE_URL =
  "https://img.freepik.com/free-photo/construction-workers-collaborating-blueprints-construction-site_23-2152006117.jpg?semt=ais_hybrid&w=740&q=80";

const PropertiesBanner = () => {
  const { data } = useGetAllPropertiesQuery(null);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        }}
        className="
               h-96 md:h-[552px]
                bg-cover bg-center 
                flex items-center justify-center 
                relative 
                text-white 
            "
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Container for the text, positioned on top of the overlay */}
        <div className="relative text-center p-4">
          {/* Small text "PROPERTIES" */}
          <p className="text-sm tracking-widest uppercase mb-2 opacity-80">
            PROJECT
          </p>

          {/* Large main title "CONCRETE WONDERS" */}
          <h1
            className="
                    text-2xl md:text-6xl  
                    font-extralight 
                    tracking-wider
                    uppercase
                "
          >
            Every Detail Reflects Our promise of no Compromise in Quality
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PropertiesBanner;
