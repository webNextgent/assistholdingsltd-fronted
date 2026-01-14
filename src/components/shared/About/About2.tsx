"use client";

import React from "react";
import { motion, Variants, easeOut } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  message: string;
  image: string;
  layout: "left" | "right";
}

const About2: React.FC = () => {
  // 📜 Team Members Data - Dynamic
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Engr. Ruhul Amin",
      position: "Chairman",
      message: `At Assist Holdings Limited, we believe that real estate is more than land and buildings — it's about building dreams, securing futures, and creating lasting value. From our very beginning, our goal has been to offer reliable, transparent, and innovative property solutions that empower people and strengthen communities. Our success is built on integrity, professionalism, and a deep commitment to our clients. As we move forward, we remain focused on expanding our services, improving customer experience, and contributing to the sustainable growth of our nation's real estate sector. Together, we are not just developing properties — we are developing trust.`,
      image: "https://i.ibb.co/qLT1Jk6m/chairman.jpg",
      layout: "right",
    },
    {
      id: 2,
      name: "Mohammad Tohidur Rahman",
      position: "Managing Director",
      message: `At Assist Holdings Limited, our mission is to make land ownership simple, secure, and profitable. We have built our reputation on trust, quality, and commitment — values that continue to guide us as we expand our footprint in the real estate market. Our focus remains on transparency, client satisfaction, and sustainable development. We are continuously improving our services, technology, and processes to meet the evolving needs of our valued clients and investors. We look forward to welcoming you to our growing family of satisfied landowners and investors.`,
      image: "https://i.ibb.co/LzbFL6BH/mm-1.jpg",
      layout: "left",
    },
    {
      id: 3,
      name: "Ziaur Rahman",
      position: "Director & CEO",
      message: `Welcome to Assist Holdings Limited. Our company was founded on a vision to redefine real estate by combining modern development strategies with genuine care for our clients. Every project we undertake reflects our promise — to deliver quality, transparency, and long-term value. As CEO, I take pride in leading a team that is passionate about creating opportunities for investment and home ownership. We are dedicated to providing exceptional service and ensuring every client finds not just property, but peace of mind. Together, let's build a future where every investment grows with confidence.`,
      image:
        "https://i.ibb.co/pBsvk0sB/Whats-App-Image-2025-11-08-at-11-10-17-7478152d.jpg",
      layout: "right",
    },
    {
      id: 4,
      name: "Md. Imam Hossain",
      position: "Director-Business Development",
      message: `As the Director of Business Development, I am pleased to extend our commitment to delivering reliable, transparent, and high-quality real estate solutions. Our mission is to ensure that every client receives exceptional service, personalized support, and strategic guidance throughout their property journey.At Assist Holdings Limited, we continuously work to expand opportunities, strengthen partnerships, and introduce innovative approaches that add true value to your investments. Your trust motivates us to maintain the highest standards of professionalism and integrity.Should you require any assistance, property consultation, or investment guidance, please feel free to reach out. We are always here to support your goals.Thank you for choosing Assist Holdings Limited.`,
      image: "https://i.ibb.co/vxYZ1zWT/imam-1.jpg",
      layout: "left",
    },
  ];

  // 📜 Framer Motion Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut, staggerChildren: 0.2 },
    },
  };

  const imageFadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: easeOut },
    },
  };

  // 📜 Render Team Member Section
  const renderTeamMember = (member: TeamMember, index: number) => {
    const isImageRight = member.layout === "right";

    return (
      <div
        key={member.id}
        className="bg-black text-white py-24 px-4 sm:px-8 md:px-12 lg:px-24 font-sans overflow-hidden"
      >
        <div
          className={`max-w-7xl mx-auto flex flex-col lg:flex-row${
            isImageRight ? "-reverse" : ""
          } md:gap-10 items-stretch`}
        >
          {/* Text Content Section */}
          <motion.div
            className="lg:w-1/2 pr-0 lg:pr-16 flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            {/* Main Content Paragraphs */}
            <motion.div className="text-base leading-relaxed" variants={fadeUp}>
              <p className="whitespace-pre-line text-justify ">
                {member.message}
              </p>

              <br />
              <p className="font-semibold">
                {member.position}, Assist Holdings Limited
              </p>
            </motion.div>

            {/* Name and Position Section */}
            <motion.div className="mt-4" variants={fadeUp}>
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-gray-300">{member.position}</p>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={imageFadeIn}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover shadow-2xl rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {teamMembers.map((member, index) => renderTeamMember(member, index))}
    </div>
  );
};

export default About2;
