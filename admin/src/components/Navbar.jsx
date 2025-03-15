import React from "react";
import Container from "./Container";
import { logo } from "../assets/images/index";
import PropTypes from "prop-types";

const Navbar = ({ token, setToken }) => {
  const handleToken = ()=>{
    setToken("");
  }
  return (
    <header className="border-b border-b-gray-600 w-full sticky top-0 left-0 z-50 bg-white">
      <Container className="py-6 flex items-center justify-between">
        <div>
          <img src={logo} alt="logo" className="w-24" />
          <p className="text-xs uppercase font-bold mt-1 tracking-wide text-blue-600">
            Admin panel
          </p>
        </div>
        {token ? (
          <button
            onClick={handleToken}
            className="bg-black/80 text-white py-2 px-6 hover:bg-black divide-neutral-600 rounded-full "
          >
            Log out
          </button>
        ) : (
          <button
            onClick={() => setToken("")}
            className="bg-black/80 text-white py-2 px-6 hover:bg-black divide-neutral-600 rounded-full "
          >
            Log in
          </button>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
Navbar.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.string,
};
