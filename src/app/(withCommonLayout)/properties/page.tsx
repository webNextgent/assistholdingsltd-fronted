import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import PropertiesBanner from "@/components/shared/Properties/PropertiesBanner";
import React from "react";
import ResidentialCard from "@/components/shared/Residential/ResidentailCard";


const Properties = () => {
  return (
    <div>
      <PropertiesBanner />
      <ResidentialCard />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Properties;
