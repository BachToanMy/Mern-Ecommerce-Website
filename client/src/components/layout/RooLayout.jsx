import React from "react";
import Header from "../Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Footer";
import ServiceTags from "../ServiceTags";
import { Toaster } from "react-hot-toast";

const RooLayout = () => {
  return (
    <>
      <Header />
      <ScrollRestoration/>
      <Outlet />
      <ServiceTags />
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default RooLayout;
