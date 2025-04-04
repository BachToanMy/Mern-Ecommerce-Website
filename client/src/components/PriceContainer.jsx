import React from "react";
import PriceFormat from "./PriceFormat";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const PriceContainer = ({ product, className, priceStyle }) => {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {product?.discount > 0 ? (
        <>
          <PriceFormat
            amount={product?.price}
            className={twMerge('text-base font-normal text-lightText line-through',priceStyle)}
          />
          <PriceFormat
            amount={product?.price - product?.price * (product?.discount / 100)}
            className={twMerge("text-primary font-semibold",priceStyle)}
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
  priceStyle: PropTypes.string,
};
export default PriceContainer;
