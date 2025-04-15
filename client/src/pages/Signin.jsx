import React from "react";
import Title from "../components/Title";
import Label from "../components/Label";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form className="w-full max-w-lg flex items-center justify-center border border-gray-300 my-20 rounded-md shadow-sm shadow-orange-400 mx-4">
        <div className="px-6 py-4 flex flex-col justify-center w-full">
          <Title className="underline underline-offset-4 decoration-[1px] mb-4">
            Signin Page
          </Title>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={"email"}>Work Email</Label>
              <Input placeholder={"john@gmail.com"} type={"email"} />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={"password"}>Password</Label>
              <Input placeholder={"john@gmail.com"} type={"password"} />
            </div>
            <button className="bg-primary/90 hover:bg-primary text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md hoverEffect">
              Sign in
            </button>
            <p className="text-sm text-center font-medium">
              Don't you have an Account?{" "}
              <Link to={"/signup"}>
                <span className="hover:text-blue-600 hoverEffect">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
