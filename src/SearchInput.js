import React from "react";

export default function SearchInput({ placeholderText, onChangeFun }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder={placeholderText}
      onChange={onChangeFun}
    />
  );
}
