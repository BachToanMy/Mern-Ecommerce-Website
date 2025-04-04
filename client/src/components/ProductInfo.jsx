import PropTypes from "prop-types";
import React from "react";
import Title from "./Title";
import PriceContainer from "./PriceContainer";
import AddToCartButton from './AddToCartButton';
export default function ProductInfo({ product }){
  return (
    <div className="flex justify-center flex-col gap-5">
      <Title className={'text-4xl'}>{product?.name}</Title>
      <PriceContainer product={product} priceStyle='text-xl'></PriceContainer>
      <p className="text-base text-gray-600">{product?.description}</p>
      <p className="text-sm font-semibold">Be the first to leave a review</p>
      <div>
        <p className="text-base font-semibold" >
          <span className="text-lightText font-normal mr-1">Category:</span>{product?.category}
        </p>
        <p className="text-base font-semibold" >
          <span className="text-lightText font-normal mr-1 mt-2">Brand:</span>{product?.brand}
        </p>
      </div>
      <AddToCartButton product={product} className={'py-3 text-base font-semibold tracking-wide'}/>
    </div>
  );
};
ProductInfo.propTypes = {
  product: PropTypes.object,
};
