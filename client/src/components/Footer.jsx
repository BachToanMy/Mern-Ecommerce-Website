import React from "react";
import Container from "./Container";
import Title from "./Title";
import SocialLinks from "./socialLinks";
import { Link } from 'react-router-dom';

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

const Account = [
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
            {shopArray?.map((item)=>(
              <Link key={item?.title} to={item?.link} className="text-base text-lightText hover:text-white hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        {/* Third */}
        {/* Fourth */}
      </Container>
    </div>
  );
};

export default Footer;
