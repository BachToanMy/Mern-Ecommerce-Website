import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-7 h-7 rounded-full text-white bg-black/10 hover:bg-black/100  duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-4.5"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default SampleNextArrow;
