import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./Product";
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems?.map((item) => <Product key={item?._id} product={item} />)}
    </>
  );
}

const Pagination = ({ itemsPerPage, products }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(0);
  const endOffset = Number(itemOffset) + Number(itemsPerPage);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap5 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center ">
        <ReactPaginate
          nextAriaLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-gray-300 hover:border-black duration-300 flex items-center justify-center pointer-cursor"
          pageClassName="mr-1"
          containerClassName="flex text-base font-semibold py-5 items-center"
          activeClassName="bg-black text-white"
        />
        <p>
          Products from {itemStart === 0 ? 1 : itemStart} to{" "}
          {endOffset > products?.length ? products?.length : Number(endOffset)}{" "}
          of total {products?.length}{" "}
        </p>
      </div>
    </div>
  );
};
Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  products: PropTypes.array,
};
export default Pagination;
