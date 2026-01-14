import GalleryPhoto from "@/components/shared/Gallery/GalleryPhoto";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://t3.ftcdn.net/jpg/04/96/48/04/360_F_496480434_VtvDbJ3I7u3UHi2pkQuaTahV2TegLfCd.jpg"
        }
        title="Gallery
"
        text="Going Back To The Memories"
      ></LandownerBanner>
      <GalleryPhoto />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Gallery;
