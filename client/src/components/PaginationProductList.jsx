import PropTypes from "prop-types";
import React, { useState,useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../config";
import ProductBanner from "./ProductBanner";
import Pagination from "./Pagination";

const PaginationProductList = () => {
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
  const [itemsPerPage, setItemPerPage] = useState(8);
  const [type, setType] = useState("");
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemPerPage(itemsPerPage);
  };
  return <div className="flex flex-col gap-5">
    <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner}/>
    <Pagination/>
  </div>;
};

export default PaginationProductList;
