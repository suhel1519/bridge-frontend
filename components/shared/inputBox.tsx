"use client";
import React, { useState } from "react";

interface props {
  input: string;
  handleChange: (val: string) => void;
  placeholder: string;
}

const InputBox = ({ input, handleChange, placeholder }: props) => {
  return (
    <input
      placeholder={placeholder}
      value={input}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-[#1b1f22] text-white w-full"
    />
  );
};

export default InputBox;
