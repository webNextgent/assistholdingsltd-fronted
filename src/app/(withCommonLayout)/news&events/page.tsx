import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import NewsCards from "@/components/shared/News/NewsCard";
import React from "react";

const News = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/11/Page-Banners-News-v2-1.webp"
        }
        title="News & Events
"
        text="writing responsibly"
      ></LandownerBanner>
      <NewsCards />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default News;
