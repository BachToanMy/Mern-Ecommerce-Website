import PropTypes from "prop-types";
import React from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const AddToCartButton = ({ product, className }) => {
  return (
    <button
      onClick={() => toast.success(`${product?.name} has been selected`)}
      className={twMerge(
        "bg-primary/90 text-white/90 text-sm font-medium py-2 rounded-md mt-2 hover:text-white hover:bg-primary hoverEffect",
        className
      )}
    >
      Add to cart
    </button>
  );
};
AddToCartButton.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
};
export default AddToCartButton;
