import React from "react";
import PriceFormat from "./PriceFormat";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const PriceContainer = ({ product, className }) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {product?.discount > 0 ? (
        <>
          <PriceFormat
            amount={product?.price}
            className="text-base font-normal text-lightText line-through"
          />
          <PriceFormat
            amount={product?.price - product?.price * (product?.discount / 100)}
            className="text-primary font-semibold"
          />
        </>
      ) : (
        <PriceFormat
          amount={product?.price}
          className="text-primary font-semibold"
        />
      )}
    </div>
  );
};
PriceContainer.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
};
export default PriceContainer;
