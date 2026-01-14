import BuyerContact from "@/components/shared/Buyer/BuyerContact";
import BuyerInfo from "@/components/shared/Buyer/BuyerInfo";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Buyer = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/11/Page-Banners-Buyer.webp"
        }
        title="Buyer"
        text="find your nest"
      ></LandownerBanner>

      <BuyerInfo />
      <Enquiry />
      <BuyerContact />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Buyer;
