import CSRSection from "@/components/shared/CSR/Csr";
import CSRFeature from "@/components/shared/CSR/CSRHand";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const CSR = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://jcxbd.com/wp-content/uploads/2024/04/Page-Banners-CSR.jpg"
        }
        title="csr"
        text="raising the bar"
      ></LandownerBanner>

      <CSRSection />

      <CSRFeature />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default CSR;
