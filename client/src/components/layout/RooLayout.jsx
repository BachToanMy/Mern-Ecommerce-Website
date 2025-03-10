import React from "react";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import ServiceTags from "../ServiceTags";

const RooLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ServiceTags/>
      <Footer />
    </>
  );
};

export default RooLayout;
