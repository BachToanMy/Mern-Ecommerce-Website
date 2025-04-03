import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import Title from "./Title";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import Slider from "react-slick";
import Product from "./Product";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [isLoaing, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await axios.get(serverUrl + `api/product/list`);
        const data = response?.data;
        if (data?.success) {
          setProducts(data?.products);
          setTotal(data?.total);
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
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full py-10">
      <div>
        <Title className='mb-5'>New Arrivals</Title>
        {products?.length > 0 ? (
          <Slider {...settings}>
            {products?.map((item) => (
              <Product key={item?._id} product={item} />
            ))}
          </Slider>
        ) : (
          <div className="w-full h-96 flex items-center gap-5 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-full bg-zinc-500 animate-pulse rounded-md"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
