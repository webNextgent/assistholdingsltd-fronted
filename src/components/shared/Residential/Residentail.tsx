import React from 'react';

const BACKGROUND_IMAGE_URL = 'https://jcxbd.com/wp-content/uploads/2024/11/Properties-Banner.webp';

const Residential = () => {
    return (
        <div 
            // 1. Set the background image and cover the container.
            style={{ 
                backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
            }}
            // 2. Add classes for height, background size/position, and flex for centering.
            className="
                h-96 md:h-[552px]
                bg-cover bg-center 
                flex items-center justify-center 
                relative 
                text-white 
            "
        >
           
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            {/* Container for the text, positioned on top of the overlay */}
            <div className="relative text-center p-4">
                {/* Small text "PROPERTIES" */}
                <p className="text-sm tracking-widest uppercase mb-2 opacity-80">
                    PROPERTIES
                </p>
                
                {/* Large main title "CONCRETE WONDERS" */}
                <h1 className="
                    text-2xl md:text-6xl  
                    font-light 
                    tracking-wider
                ">
                    CONCRETE WONDERS
                </h1>
            </div>

         
          
        </div>
    );
};

export default Residential;