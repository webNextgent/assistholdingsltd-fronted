"use client";
import React, { useState } from 'react';
const FixedDrawer: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const drawerClasses = `
    fixed 
    -bottom-7
    -translate-y-1/2 
    right-0 
    p-2 
    bg-gray-100 
    border border-gray-300 
    border-r-0 
    shadow-lg 
    z-40 
    flex 
    items-center 
    overflow-hidden 
    transition-all 
    duration-300 
    ease-in-out 
    cursor-pointer
    rounded-[5px]
    ${isHovered ? 'w-56' : 'w-16'}  
  `;



    return (
        <div
            className={drawerClasses}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            aria-label="Privacy and Terms menu"
        >
            <div className="shrink-0 mr-2 ">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/1200px-RecaptchaLogo.svg.png" className='w-14 h-14' alt="" />
            </div>

            <div className={`
        text-xs 
        text-gray-700 
        font-medium 
        whitespace-nowrap
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        transition-opacity 
        duration-100 
        delay-150
      `}>
                <p>Protected by reCaptcha</p>
                Privacy - Terms
            </div>
        </div>
    );
};

export default FixedDrawer;