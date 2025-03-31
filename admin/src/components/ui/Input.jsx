import React, { Children } from "react";
import PropTypes from "prop-types";
import { cn } from "./cn";

export const Label = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-semibold tracking-wide", className)}
    >
      {children}
    </label>
  );
};

export default function Input({
  type,
  classname,
  placeholder,
  id,
  name,
  onChange,
  value,
  disabled,
}) {
  return (
    <input
      className={cn(
        "px-4 py-1 border border-gray-500 rounded-md max-w-lg",
        classname
      )}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  classname: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
