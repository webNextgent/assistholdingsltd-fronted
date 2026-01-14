import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import Landowner from "@/components/shared/Landowner/Landowner";
import React from "react";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import Dream from "@/components/shared/Landowner/Dream";
import Testimonials from "@/components/shared/Home/Testimonials";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";

const Landowners = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/11/Page-Banners-Landowners.webp"
        }
        title="Landowner"
        text="BUILDING TOMORROW"
      ></LandownerBanner>
      <Landowner />
      <Enquiry />
      <Dream></Dream>
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Landowners;
