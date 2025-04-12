import React from "react";
import PriceFormat from "./PriceFormat";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

const PriceContainer = ({ product, className, priceStyle }) => {
  // const { products } = useSelector((state) => state.orebi);
  // const [cartProduct, setCartProduct] = useState(null);
  // useEffect(() => {
  //   const existingProduct = products?.find(
  //     (item) => item?._id === product?._id
  //   );
  //   setCartProduct(existingProduct);
  // }, [product, products]);
  // const discountPrice = cartProduct
  //   ? (product?.price - product?.price * (product?.discount / 100)) *
  //     cartProduct?.quantity
  //   : product?.price - product?.price * (product?.discount / 100);
  // const regularPrice = cartProduct
  //   ? product?.price * cartProduct.quantity
  //   : product?.price;

  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      {product?.discount > 0 ? (
        <>
          <PriceFormat
            amount={product?.price}
            className={twMerge(
              "text-base font-normal text-lightText line-through",
              priceStyle
            )}
          />
          <PriceFormat
            amount={product?.price - (product?.price * product?.discount) / 100}
            className={twMerge("text-primary font-semibold", priceStyle)}
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
