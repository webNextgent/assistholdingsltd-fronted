import React from 'react';
const BACKGROUND_IMAGE_URL ="https://i.postimg.cc/mkgg18p2/Concord-Fresh-Meadows-Affordable-Luxury-Living-in-Bashundhara-7.jpg"
const AboutBanner = () => {
    return (
            <div 
            style={{ 
                backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            }}
           
            className="
                h-96 md:h-[555px]
                bg-cover bg-center 
                flex items-center justify-center 
                relative 
                text-white 
            "
        >
           
            <div className="absolute inset-0 bg-black opacity-20"></div>
            
            {/* Container for the text, positioned on top of the overlay */}
            <div className="relative text-center p-4 space-y-2">
                {/* Small text "PROPERTIES" */}
                <p className="text-sm tracking-widest uppercase mb-2 opacity-100">
                    About us
                </p>
                
                {/* Large main title "CONCRETE WONDERS" */}
                <h1 className="
                    text-2xl md:text-7xl  
                    font-light 
                    tracking-wider
                    uppercase
                ">
                  Better To Be Trusted Than Famous
                </h1>
            </div>

         
          
        </div>
    );
};

export default AboutBanner;