/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion, easeOut, Variants } from "framer-motion";
import { useGetAllGalleryQuery } from "@/redux/features/gallery/galleryApi";

interface GalleryItem {
  id: string;
  videoUrl?: string;
  image: string[];
}

const GalleryPage = () => {
  const {
    data: galleryData,
    isLoading,
  } = useGetAllGalleryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const galleries: GalleryItem[] = galleryData?.data || galleryData || [];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  // Filter data based on tab
  const photoItems = galleries.filter(item => item.image && item.image.length > 0);
  const videoItems = galleries.filter(item => item.videoUrl);

  // ✅ YouTube URL কে embed format-এ convert করার function
  const convertToEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // যদি already embed URL হয়
    if (url.includes('youtube.com/embed')) {
      return url;
    }
    
    // Regular YouTube URL থেকে video ID extract করা
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[7].length === 11) {
      return `https://www.youtube.com/embed/${match[7]}`;
    }
    
    // YouTube Shorts URL handle করা
    if (url.includes('youtube.com/shorts/')) {
      const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
      if (shortsMatch && shortsMatch[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}`;
      }
    }
    
    // যদি convert করতে না পারে, original URL return করবে
    return url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="animate-spin h-10 w-10 border-b-2 border-red-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h1
          className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Our Gallery
        </motion.h1>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-red-600"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
        
        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mt-8 space-x-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              activeTab === "photos"
                ? "bg-red-600 border-red-600 text-white"
                : "border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-600"
            }`}
          >
            Photos ({photoItems.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-2 rounded-full border transition-all duration-300 ${
              activeTab === "videos"
                ? "bg-red-600 border-red-600 text-white"
                : "border-gray-600 text-gray-400 hover:border-red-600 hover:text-red-600"
            }`}
          >
            Videos ({videoItems.length})
          </button>
        </motion.div>
      </div>

      {/* Photos Section */}
      {activeTab === "photos" && (
        <div className="px-6 md:px-16">
          {photoItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-xl text-gray-400">No photos available</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {photoItems.map((gallery) =>
                gallery.image.map((img, index) => (
                  <motion.div
                    key={`${gallery.id}-${index}`}
                    className="cursor-pointer group relative"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: easeOut, delay: index * 0.1 }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-800">
                      <img
                        src={img}
                        alt={`Gallery ${gallery.id} - ${index + 1}`}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-2xl pointer-events-none">
                      <span className="text-white text-4xl">🔍</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Videos Section */}
      {activeTab === "videos" && (
        <div className="px-6 md:px-16">
          {videoItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-xl text-gray-400">No videos available</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              {videoItems.map((gallery, index) => (
                <motion.div
                  key={gallery.id}
                  className={`relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ${
                    index % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeOut, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveVideo(gallery.videoUrl!)}
                >
                  {/* Video Thumbnail - Use first image as thumbnail if available */}
                  <div className="w-full h-72 bg-gray-800 relative">
                    {gallery.image && gallery.image.length > 0 ? (
                      <img
                        src={gallery.image[0]}
                        alt={`Video ${gallery.id}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-6xl">🎬</span>
                      </div>
                    )}
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="bg-red-600 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-3xl">▶</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
                    <p className="text-lg font-medium">Video Gallery</p>
                    <p className="text-sm text-gray-400">Click to play</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/95 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Fullscreen"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, ease: easeOut }}
          />
          <button
            className="absolute top-8 right-8 text-white text-3xl font-light hover:text-red-500 transition"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </motion.div>
      )}

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-[90%] md:w-[70%]">
            <iframe
              src={convertToEmbedUrl(activeVideo)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[400px] md:h-[600px] rounded-2xl shadow-lg"
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white text-4xl font-bold hover:text-red-600 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {galleries.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-2xl font-light mb-2">No Content Available</h3>
          <p className="text-gray-400">Check back later for updates</p>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryPage;