"use client";
import React from "react";
import VideoModalTrigger from "./PropertiesVedio";

interface VideoProps {
  url: string; // YouTube watch URL
}

const Video: React.FC<VideoProps> = ({ url }) => {
  // Convert YouTube URL to videoId
  const extractVideoId = (url: string): string => {
    try {
      const urlObj = new URL(url);

      if (urlObj.searchParams.has("v")) {
        return urlObj.searchParams.get("v") || "";
      }

      if (urlObj.pathname.startsWith("/shorts/")) {
        return urlObj.pathname.split("/")[2];
      }

      return "";
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      return "";
    }
  };

  const videoId = extractVideoId(url);

  if (!videoId) {
    return <p className="text-red-500 text-center">Invalid YouTube URL</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  // YouTube Default Thumbnail
  const youtubeThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="bg-gray-100 py-16">
      <div className="w-full mx-auto">
        <VideoModalTrigger
          thumbnailUrl={youtubeThumbnail}
          videoEmbedUrl={embedUrl}
        />
      </div>
    </div>
  );
};

export default Video;
