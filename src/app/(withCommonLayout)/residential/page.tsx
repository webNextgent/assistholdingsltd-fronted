import React from "react";
import Residential from "@/components/shared/Residential/Residentail";
import ResidentialCard from "@/components/shared/Residential/ResidentailCard";
import Testimonials from "@/components/shared/Home/Testimonials";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";

const Residentials = () => {
  return (
    <>
      <Residential />
      <ResidentialCard />
      <Testimonials/>
      {/* <OurAwardsandRecognition/> */}
    </>
  );
};

export default Residentials;
