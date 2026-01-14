"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export default function GalleryPage({images}:any) {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="p-4">

         <div className="text-center mb-20">
        <motion.p
          className="text-4xl font-light uppercase tracking-widest text-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          gallery
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-1 w-14 bg-[#003C8C]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Grid */}
   <div>
  
  {/* Remaining Images */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    {images.slice(2).map((img: any, idx: number) => (
      <div
        key={idx}
        className="cursor-pointer overflow-hidden rounded-lg"
        onClick={() => setSelectedImage(img)}
      >
        <img
          src={img}
          alt={`Gallery ${idx}`}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
    ))}
  </div>
</div>


      {/* Modal */}
     {selectedImage && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-4 right-4 text-white text-3xl z-50"
      >
        <X />
      </button>

      {/* Image */}
      <img
        src={selectedImage}
        alt="Selected"
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  </div>
)}

    </div>
  );
}
