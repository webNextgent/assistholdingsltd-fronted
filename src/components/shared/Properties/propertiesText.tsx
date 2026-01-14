import React from "react";

interface N71LakeCondosProps {
  des: string;
  des2: string;
  des3: string;
}

const N71LakeCondos: React.FC<N71LakeCondosProps> = ({ des, des2, des3 }) => {
  return (
    // Full black background with white text
    <div className="bg-black text-white  font-sans font-light tracking-wider">
      <div className="flex justify-center items-center p-4 h-40 ">
        <div className="">
          <p className="text-sm leading-relaxed ">{des}</p>
        </div>
       

      </div>
    </div>
  );
};

export default N71LakeCondos;
