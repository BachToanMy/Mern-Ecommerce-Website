import React from "react";
import { FaSpinner } from "react-icons/fa6";
const Loader = () => {
  return (
    <div className="text-orange-600 text-5xl w-full flex items-center justify-center py-40 ">
      <FaSpinner className="animate-spin"></FaSpinner>
    </div>
  );
};

export default Loader;
