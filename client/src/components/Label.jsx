import React from "react";
import { cn } from "./ui/cn";
import PropTypes from "prop-types";
const Label = ({ children, className, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-base font-semibold text-gray-600", className)}
    >
      {children}
    </label>
  );
};
Label.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};
export default Label;
