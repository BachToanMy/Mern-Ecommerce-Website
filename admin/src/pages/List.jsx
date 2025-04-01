import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config";
import Title from "../components/Title";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const List = () => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchProductList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(serverUrl + "api/product/list");
      const data = response?.data;
      if (data?.success) {
        setList(data?.products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Product list fetching error", error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductList();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <Title>Product List</Title>
            <Link
              to={"/add"}
              className="text-sm font-medium hover:text-blue-600 duration-300 cursor-pointer"
            >
              Add Product +
            </Link>
          </div>
          {list?.length > 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-100 text-sm my-1.5">
                <b>Image</b>
                <b>Name</b>
                <b className="hidden md:inline-block">Category</b>
                <b>Price</b>
                <b className="text-center">Action</b>
                <b className="text-center">Edit</b>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <p className="mb-4 text-red-600 font-medium tracking-wide">
                You have no product in your Database.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
