"use client";
import React, { useState } from "react";
import { PlayCircle, X } from "lucide-react"; 

interface VideoModalTriggerProps {
    thumbnailUrl: string;
    videoEmbedUrl: string;
}

const VideoModalTrigger: React.FC<VideoModalTriggerProps> = ({
    thumbnailUrl,
    videoEmbedUrl,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    return (
        <>
            <div
                className="relative w-full h-[562px] cursor-pointer overflow-hidden group"
                onClick={openModal}
            >
                <img
                    src={thumbnailUrl}
                    alt="Project Video Thumbnail"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/60">
                    <PlayCircle
                        className="w-20 h-20 md:w-24 md:h-24 text-white"
                        strokeWidth={1}
                    />
                </div>
            </div>



            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-11/12 max-w-4xl max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-10 right-0 md:right-[-50px] text-white hover:text-gray-300 transition-colors z-50 p-2"
                            onClick={closeModal}
                            aria-label="Close Video Modal"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute inset-0 w-full h-full rounded-lg shadow-2xl"
                                src={`${videoEmbedUrl}?autoplay=1`}
                                title="Project Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoModalTrigger;