import BlogsCard from "@/components/shared/Blogs/BlogsCard";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Blogs = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://t3.ftcdn.net/jpg/04/96/48/04/360_F_496480434_VtvDbJ3I7u3UHi2pkQuaTahV2TegLfCd.jpg"
        }
        title="blogs"
        // text="find your nest"
      ></LandownerBanner>
      <BlogsCard></BlogsCard>
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Blogs;
