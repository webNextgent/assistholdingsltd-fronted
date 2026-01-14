import OurAwardsandRecognition from '@/components/shared/Home/OurAwardsandRecognition';
import Testimonials from '@/components/shared/Home/Testimonials';
import ManagementBanner from '@/components/shared/Management/ManagementBanner';
import Team1 from '@/components/shared/Management/Team1';
import Team2 from '@/components/shared/Management/Team2';
import Team3 from '@/components/shared/Management/Team3';
import Team4 from '@/components/shared/Management/Team4';
import Team5 from '@/components/shared/Management/Team5';
import React from 'react';

const Management = () => {
    return (
        <div>
            <ManagementBanner/>
            <Team1/>
            <Team2/>
            <Team3 />
            <Team4 />
            <Team5 />
            <Testimonials />
            <OurAwardsandRecognition />
        </div>
    );
};

export default Management;