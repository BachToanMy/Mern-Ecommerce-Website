import React, { useState, useEffect, } from "react";
import Title from "../components/Title";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../config";
import ProductInfo from "../components/ProductInfo";
const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await axios.get(`${serverUrl}api/product/detail?id=${id}`);
        const data = response?.data;
        if (data?.success) {
          setProduct(data?.product);
        } else {
          console.log("Product fectching error: ", data?.message);
        }
      };
      fetchData();
    } catch (error) {
      console.log("Product fetching error: ", error);
    } finally {
      setLoading(false);
    }
  }, [id]);
  return (
    <Container className='grid grid-cols-2 gap-10'>
      <div className="w-full max-h-[500px] group overflow-hidden rounded-md ">
        <img src={product?.images[0]} alt="productImage"
        className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform duration-500 ease-in-out  "/>
      </div>
      <ProductInfo product={product}/>
    </Container>
  );
};

export default SingleProduct;
