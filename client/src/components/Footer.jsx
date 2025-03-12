import React from "react";
import Container from "./Container";
import Title from "./Title";
import SocialLinks from "./socialLinks";
import { Link } from "react-router-dom";
import { paymentCard } from "../assets/images/index";

const shopArray = [
  {
    title: "Accessories",
    link: "/accessories",
  },
  {
    title: "Clothes",
    link: "/shop",
  },
  {
    title: "Electronic",
    link: "/shop",
  },
  {
    title: "Home appliances",
    link: "/shop",
  },
  {
    title: "New Arrivals",
    link: "/shop",
  },
];

const account = [
  {
    title: "Profile",
    link: "/profile",
  },
  {
    title: "Orders",
    link: "/orders",
  },
  {
    title: "Addresses",
    link: "/addresses",
  },
  {
    title: "Account Detail",
    link: "/profile",
  },
  {
    title: "Privacy",
    link: "/privacy",
  },
];
const Footer = () => {
  return (
    <div className="w-full bg-[#1b1b1b] py-20 text-white/80">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* First */}
        <div className=" col-span-2">
          <div className="flex flex-col gap-6">
            <Title className="text-xl">More about Orebi Shop</Title>
            <p className="text-base w-full lg:w-[80%]">
              Lorem ipsum dolir, sit amet consectetur adipisicing elit. Illu
              ipsum optio soluta repellendus consectetur perferendis?
            </p>
            <SocialLinks />
          </div>
        </div>
        {/* Second */}
        <div>
          <Title className="text-xl mb-6">Shop</Title>
          <div className="flex flex-col gap-2">
            {shopArray?.map((item) => (
              <Link
                key={item?.title}
                to={item?.link}
                className="text-base text-lightText hover:text-white hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        {/* Third */}
        <div>
          <Title className="text-xl mb-6">Your account</Title>
          <div className="flex flex-col gap-2">
            {account?.map((item) => (
              <Link
                key={item?.title}
                to={item?.link}
                className="text-base text-lightText hover:text-white hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300"
              >
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        {/* Fourth */}
        <div className="col-span-2 flex flex-col items-center w-full">
          <Title className="text-xl mb-6">Subcribe to our newsletter </Title>
          <p className="text-lightText text-center">
            Lorem ipsum dolor sit amet.
          </p>
          <div className="my-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Insert your email...*"
                className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-white text-lg placeholder:text-base outline-none"
              />
              <button className="px-6 py-2 bg-primary/70 border border-transparent hover:border-gray-500 duration-300 rounded-md">
                Submit
              </button>
            </div>
          </div>
          <img src={paymentCard} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
