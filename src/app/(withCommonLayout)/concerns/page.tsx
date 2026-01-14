import React from "react";
import Concerns from "@/components/shared/Concerns/Concerns";
import Ourconcerns from "@/components/shared/Concerns/Ourconcerns";
import Testimonials from "@/components/shared/Home/Testimonials";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";

const ConcernsPage = () => {
  return (
    <div>
      <Concerns />
      <Ourconcerns />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default ConcernsPage;
