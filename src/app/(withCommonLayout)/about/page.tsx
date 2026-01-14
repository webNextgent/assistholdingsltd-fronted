import About2 from '@/components/shared/About/About2';
import AboutBanner from '@/components/shared/About/AboutBanner';
import GreenLivingSection from '@/components/shared/About/GreenLIving';
import AboutUsSection from '@/components/shared/About/Mission';
import Relentlessingoingbeyond from '@/components/shared/About/Relentlessingoingbeyond';
import OurAwardsandRecognition from '@/components/shared/Home/OurAwardsandRecognition';
import Testimonials from '@/components/shared/Home/Testimonials';
import React from 'react';

const AboutPage = () => {
    return (
        <div>
            <AboutBanner />
            <Relentlessingoingbeyond/>
            <AboutUsSection/>
            <GreenLivingSection/>
            <About2/>
            <Testimonials/>
            {/* <OurAwardsandRecognition/> */}
        </div>
    );
};

export default AboutPage;