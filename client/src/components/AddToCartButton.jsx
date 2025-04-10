import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { addToCart, descreaseQuantity, increaseQuantity } from "../redux/orebiSlice";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

const AddToCartButton = ({ product, className }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.name} has been added successfully`);
  };
  const { products } = useSelector((state) => state.orebi);
  const [cartProduct, setCartProduct] = useState(null);
  useEffect(() => {
    const existingProduct = products?.find(
      (item) => item?._id === product?._id
    );
    setCartProduct(existingProduct);
  }, [product, products]);
  
  const handleInCreaseQuantity=()=>{
    dispatch(increaseQuantity(product?._id));
    toast.success(`${product?.name} has been increased successfully`);
  }
  const handleDesCreaseQuantity=()=>{
    dispatch(descreaseQuantity(product?._id));
    toast.success(`${product?.name} has been descreased successfully`);
  }
  return (
    <div className="h-12">
      {cartProduct ? (
        <div className="w-full h-full flex items-center gap-5">
          <button
          disabled={cartProduct?.quantity===1}
          onClick={handleDesCreaseQuantity}
            className="w-6 h-6 border inline-flex items-center justify-center border-gray-400 rounded-sm hover:bg-gray-950
          hover:text-white hoverEffect cursor-pointer disabled:text-gray-400 disabled:border-gray-200 disabled:hover:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-400               "
          >
            <HiOutlineMinus className="text-sm" />
          </button>
          <p className="text-base font-semibold w-6 text-center">{cartProduct?.quantity}</p>
          <button
          onClick={handleInCreaseQuantity}
            className="w-6 h-6 border inline-flex items-center justify-center border-gray-400 rounded-sm hover:bg-gray-950
          hover:text-white hoverEffect cursor-pointer "
          >
            <HiOutlinePlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className={twMerge(
            "bg-primary/90 text-white/90 text-sm font-medium py-2 rounded-md mt-2 w-full hover:text-white hover:bg-primary hoverEffect",
            className
          )}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};
AddToCartButton.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string,
};
export default AddToCartButton;
