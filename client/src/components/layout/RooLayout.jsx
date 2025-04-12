import React from "react";
import Header from "../Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Footer";
import ServiceTags from "../ServiceTags";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
const RooLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <ScrollRestoration />
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
      </PersistGate>
    </Provider>
  );
};

export default RooLayout;
