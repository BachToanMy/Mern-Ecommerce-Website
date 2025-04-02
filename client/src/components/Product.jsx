import React from "react";
import PropTypes from "prop-types";
import Badge from "./Badge";
import PriceContainer from "./PriceContainer";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
    console.log('Pricecontainer:',product);
  return (
    <div className="w-full group pr-2.5">
      <div className="h-80 border border-gray-300 rounded-tr-md rounded-tl-md overflow-hidden relative ">
        <div className="w-full h-full overflow-hidden bg-[#f3f3f3]">
          <img
            src={product?.images[0]}
            alt="Product Image"
            className="w-full h-full group-hover:scale-110 duration-300 object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          {product?.offer && <Badge title={"Sale"} className={"rounded-sm"} />}
        </div>
      </div>
      <div className="max-w-80 py-4 flex flex-col gap-1 border-[1px] border-t-0 border-gray-300 px-5 rounded-b-md">
        <p className="text-lg text-primary font-bold">{product?.name}</p>
        <PriceContainer product={product} className={''}/>
        <AddToCartButton product={product} className={''} />
      </div>
    </div>
  );
};
Product.propTypes = {
  product: PropTypes.object,
};
export default Product;
