"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  Variants,
  easeOut,
} from "framer-motion";

const Relentlessingoingbeyond: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // 🪶 Smooth damping effect
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 80,
    stiffness: 80,
    mass: 0.3,
  });

  // 🎞️ Transform mapping: scroll speed অনুযায়ী translate হবে
  const moveY = useTransform(smoothVelocity, [-1000, 1000], [100, -100]);
  const imgMove1 = useTransform(smoothVelocity, [-1000, 1000], [60, -60]);
  const imgMove2 = useTransform(smoothVelocity, [-1000, 1000], [-60, 60]);
  const imgMove3 = useTransform(smoothVelocity, [-1000, 1000], [80, -80]);

  // ✨ Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: moveY }}
      className="py-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-black text-white  font-sans overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <motion.p
          className="text-4xl font-light uppercase tracking-widest"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          RELENT LESS IN GOING BEYOND
        </motion.p>
        <motion.div
          className="mx-auto mt-2 h-0.5 w-24 bg-orange-400"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeOut }}
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col justify-between space-y-8">
          <div>
            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              Welcome to Assist Holdings Limited, a trusted name in real estate
              and land share investment. We specialize in helping individuals
              and organizations secure valuable land assets with transparency,
              reliability, and long-term growth in mind.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              We will strive to deliver precise, exquisite solutions to our
              client&apos;s wishes and requirements so that their aspirations
              become a reality. This will be accomplished by introducing
              state-of-the-art innovative Japanese technologies with the
              partnership with Creed Group from Japan.
            </motion.p>

            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              At Assist Holdings Limited, our mission is simple — to make land
              ownership accessible and profitable for everyone. We believe that
              every piece of land holds potential, and our goal is to assist our
              clients in unlocking that value through smart investments and
              innovative land-sharing opportunities. With a team of experienced
              professionals and a deep understanding of the real estate market,
              we ensure every project we undertake meets the highest standards
              of quality, legality, and return on investment. From identifying
              prime land locations to managing share ownership and development,
              we guide our clients every step of the way.
            </motion.p>
            <motion.p
              className="text-base leading-relaxed mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.2, duration: 0.9, ease: easeOut }}
            >
              Whether you’re looking to invest, expand, or secure your future
              through land ownership, Assist Holdings Limited is here to help
              you build your foundation for success.
              <br /> Assist Holdings Limited — Better To Be Trusted Than Famous
            </motion.p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-5 relative">
          <motion.div style={{ y: imgMove2 }} className="col-span-1 mt-8">
            <img
              src="https://i.ibb.co/Cs0x5yCp/La-Speranza-6.jpg"
              alt="Building 1"
              className="w-full h-full md:h-[480px] object-cover rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div style={{ y: imgMove3 }} className="col-span-1">
            <img
              src="https://i.ibb.co/LDW4HD6r/Luxury-Apartment-for-Sale-in-Dhanmondi-Concord-Hazera-Mansion-10.jpg"
              alt="Building 2"
              className="w-full h-full md:h-[600px] object-cover rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Relentlessingoingbeyond;
