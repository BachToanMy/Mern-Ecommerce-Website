import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-7 h-7 rounded-full text-white bg-black/10 hover:bg-black/100 duration-300 cursor-pointer flex justify-center items-center absolute z-10 top-[35%] left-1.5"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
