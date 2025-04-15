import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { emptyCart } from "../assets/images/index.js";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct.jsx";
import { resetCart } from "../redux/orebiSlice.js";
import PriceFormat from "../components/PriceFormat.jsx";
import toast from "react-hot-toast";
const Cart = () => {
  const { products } = useSelector((state) => state.orebi);
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    let discountedPrice = 0;
    let price = 0;
    products?.map((item) => {
      discountedPrice += item?.discount>0 ? (item?.price*item?.discount/100)*item?.quantity:0;
      price += item?.price * item?.quantity;
      return price, discountedPrice;
    });
    setDiscount(discountedPrice);
    setSubtotal(price);
  }, [products]);

  const handleReset = () => {
    const confirmed = window.confirm("Are you sure to reset your cart?");
    if (confirmed) {
      dispatch(resetCart());
    }
  };
  const handleCheckout = () => {
    toast.success("Payment will proceed shortly");
  }
  return (
    <Container>
      <Title>My Cart</Title>
      {products?.length > 0 ? (
        <div className="py-10">
          <div className="w-full h-20 bg-[#f5f7f7] text-primary hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold ">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Subtotal</h2>
          </div>
          <div className="mt-5">
            {products?.map((item) => (
              <CartProduct key={item?._id} item={item} />
            ))}
          </div>
          <div className="flex items-start justify-between">
            <button
              onClick={handleReset}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 rounded-md hover:bg-red-700 hoverEffect"
            >
              Reset Cart
            </button>
            <div className="max-w-xl gap-4 flex justify-end mt-4">
              <div className="w-96 flex flex-col gap-4">
                <h2 className="text-xl font-bold uppercase text-right">
                  Cart totals
                </h2>
                <div>
                  <p className="flex items-center justify-between border-[1px] py-1.5 px-4 text-lg font-medium">
                    Subtotal
                    <PriceFormat
                      amount={subtotal}
                      className={"font-semibold tracking-wide"}
                    />
                  </p>
                  <p className="flex items-center justify-between border-[1px] py-1.5 px-4 text-lg font-medium border-b-0 border-t-0">
                    Discount
                    <PriceFormat
                      amount={discount}
                      className={"font-semibold tracking-wide"}
                    />
                  </p>
                  <p className="flex items-center justify-between border-[1px] py-1.5 px-4 text-lg font-medium">
                    Total
                    <PriceFormat
                      amount={subtotal-discount}
                      className={"font-bold text-xl tracking-wide"}
                    />
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-md py-2.5 bg-primary/80 text-white hover:bg-primary hoverEffect"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10">
          <img src={emptyCart} alt="empty cart" className="max-w-80" />
          <div className=" mt-5 flex flex-col gap-2.5">
            <h2 className="text-xl font-bold uppercase">
              Your cart feels lonely
            </h2>
            <p className="text-sm max-w-96 text-lightText ">
              Your shopping cart lives to serve. Give it purpose - fill it with
              books, electronics,...
            </p>
          </div>
          <div className="mt-5">
            <Link
              to={"/shop"}
              className="pd-10 bg-primary/80 text-white px-8 py-2 w-48 text-center rounded-md hover:bg-primary hoverEffect"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
