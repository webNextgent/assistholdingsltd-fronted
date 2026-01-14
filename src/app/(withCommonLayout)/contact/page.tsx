import ContactInfo from "@/components/shared/Contact/ContactInfo";
import OurAwardsandRecognition from "@/components/shared/Home/OurAwardsandRecognition";
import Testimonials from "@/components/shared/Home/Testimonials";
import Enquiry from "@/components/shared/Landowner/Enquiry";
import LandownerBanner from "@/components/shared/Landowner/LandownerBanner";
import React from "react";

const Contact = () => {
  return (
    <div>
      <LandownerBanner
        img={
          "https://media.istockphoto.com/id/1450058572/photo/businessman-using-a-laptop-and-touching-on-virtual-screen-contact-icons-consists-of-telephone.jpg?s=612x612&w=0&k=20&c=R5wzCGHu6ZS-8EQpJ2Z1tkSbKGGdJH4apVhFM18EXSM="
        }
        title="contact"
        text="Feel Free to Contact Us for Any Queries"
      ></LandownerBanner>
      <ContactInfo></ContactInfo>
      <Enquiry />
      <Testimonials />
      {/* <OurAwardsandRecognition /> */}
    </div>
  );
};

export default Contact;
