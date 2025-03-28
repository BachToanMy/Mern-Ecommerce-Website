import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { ImUsers } from "react-icons/im";
const Sidebar = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4 mt-2 pl-2 md:pl-6">
        <NavLink
          to={"/add"}
          className="flex items-center justify-between md:justify-normal gap-3 border border-gray-300 border-r-0 py-2 px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300 "
        >
          <span className=" inline-flex border border-gray-300 items-start justify-center rounded-full text-lg p-1">
            <IoMdAdd />
          </span>
          <p className="hidden md:inline-flex font-semibold">Add Item</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className="flex items-center justify-between md:justify-normal gap-3 border border-gray-300 border-r-0 py-2 px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300 "
        >
          <span className=" inline-flex border border-gray-300 items-start justify-center rounded-full text-lg p-1">
            <FaList />
          </span>
          <p className="hidden md:inline-flex font-semibold">Product List</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center justify-between md:justify-normal gap-3 border border-gray-300 border-r-0 py-2 px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300 "
        >
          <span className=" inline-flex border border-gray-300 items-start justify-center rounded-full text-lg p-1">
            <AiFillProduct />
          </span>
          <p className="hidden md:inline-flex font-semibold">Orders</p>
        </NavLink>
        <NavLink
          to={"/users"}
          className="flex items-center justify-between md:justify-normal gap-3 border border-gray-300 border-r-0 py-2 px-3 bg-gray-100 hover:bg-black/80 hover:text-white duration-300 "
        >
          <span className=" inline-flex border border-gray-300 items-start justify-center rounded-full text-lg p-1">
            <ImUsers/>
          </span>
          <p className="hidden md:inline-flex font-semibold">User List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
