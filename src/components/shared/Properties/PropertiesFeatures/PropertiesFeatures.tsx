import React from 'react';
import { motion } from "framer-motion";
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

interface Amenity {
  id: number;
  icon: string;
  text: string;
}

interface AmenityCardProps {
  serialNumber: number;
  icon: string;
  text: string;
}

// Function to dynamically get the icon component
const getIconComponent = (iconName: string): React.ElementType => {
  // Check different icon libraries; cast modules to a string-keyed record so we can index by iconName
  const iconLibraries: Array<Record<string, React.ElementType>> = [
    FaIcons as unknown as Record<string, React.ElementType>,
    MdIcons as unknown as Record<string, React.ElementType>,
    IoIcons as unknown as Record<string, React.ElementType>,
    RiIcons as unknown as Record<string, React.ElementType>,
  ];
  
  for (const library of iconLibraries) {
    if (iconName in library) {
      return library[iconName] as React.ElementType;
    }
  }
  
  // Fallback icon if not found
  console.warn(`Icon ${iconName} not found, using fallback`);
  return FaIcons.FaQuestion;
};

const AmenityCard: React.FC<AmenityCardProps> = ({ serialNumber, icon, text }) => {
  const IconComponent = getIconComponent(icon);
  
  return (
    <div className="flex flex-col items-center text-center p-4 relative">
      {/* Serial Number - Design একই রেখে */}
      {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#214187] text-white rounded-full flex items-center justify-center text-xs font-bold z-10">
        {serialNumber}
      </div> */}
      
      <IconComponent className="w-10 h-10 md:w-16 md:h-16 text-[#214187] mb-3" />
      <p className="text-gray-900 font-medium leading-snug">
        {text.split(' ').map((word, index) => (
          <span key={index} className="block">{word}</span>
        ))}
      </p>
    </div>
  );
};

interface FeaturesAmenitiesProps {
  features: Amenity[];
}

const FeaturesAmenities: React.FC<FeaturesAmenitiesProps> = ({ features }) => {
  // console.log(features)
  
  // Sort features by ID to ensure serial order
  const sortedFeatures = [...features].sort((a, b) => a.id - b.id);

  return (
    <div className="bg-[#F2F2F2] py-16 md:py-28 font-sans">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-20">
          <motion.p
            className="text-4xl font-light uppercase tracking-widest text-black"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            features & amenities
          </motion.p>
          <motion.div
            className="mx-auto mt-2 h-1 w-14 bg-[#214187]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 md:gap-y-20">
          {sortedFeatures.map((amenity) => (
            <AmenityCard
              key={amenity.id}
              serialNumber={amenity.id}
              icon={amenity.icon}
              text={amenity.text}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturesAmenities;