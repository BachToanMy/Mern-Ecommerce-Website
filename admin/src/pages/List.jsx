import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { serverUrl } from "../../config";
import Title from "../components/Title";
import Loader from "../components/Loader";
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
      {!isLoading ? (
        <Loader/>
      ) : (
        <>
          <div>
            <Title>Product List</Title>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
