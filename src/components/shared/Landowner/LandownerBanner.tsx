/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const LandownerBanner = ({img,title,text}:any) => {
    return (
        <div>
            <div 
            style={{ 
                backgroundImage: `url(${img})`,
            }}
            className="
                h-96 md:h-[552px]
                bg-cover bg-center 
                flex items-center justify-center 
                relative 
                text-white 
            "
        >
           
            <div className="absolute inset-0 bg-black opacity-20"></div>
            
            {/* Container for the text, positioned on top of the overlay */}
            <div className="relative text-center p-4">
                {/* Small text "PROPERTIES" */}
                <p className="text-sm tracking-widest uppercase mb-2 opacity-80">
                    {title}
                </p>
                
                {/* Large main title "CONCRETE WONDERS" */}
                <h1 className="
                    text-2xl md:text-6xl  
                    font-light 
                    tracking-wider uppercase
                ">
                   {text}
                </h1>
            </div>

         
          
        </div>
        </div>
    );
};

export default LandownerBanner;