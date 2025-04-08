import PropTypes from "prop-types";
import React from "react";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({ itemsPerPageFromBanner }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full">
      <div>Sorting filter</div>
      <div className="flex items-center gap-2 text-black relative">
        <label htmlFor="itemsPerPage">Show</label>
        <select className="w-16 md:w-20 border-[1px]
        border-gray-200
       bg-gray-200 py-1 px-4 cursor-pointer text-primary text-base block appearance-none focus-within:outline-none focus-visible:border-primary"
       onChange={(e)=>itemsPerPageFromBanner(e.target.value)}>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={24}>24</option>
          <option value={32}>32</option>
        </select>
        <GoTriangleDown className=" absolute text-sm right-3 top-2.5"/>
      </div>
    </div>
  );
};
ProductBanner.propTypes = {
  itemsPerPageFromBanner: PropTypes.func,
};
export default ProductBanner;
