import React from "react";

const Input = ({ value, handleChange }) => {
  return (
    <input
      type="search"
      name="search"
      value={value}
      onChange={handleChange}
      placeholder="Search Other Country"
      className="search"
    />
  );
};

export default Input;
