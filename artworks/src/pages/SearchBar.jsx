import React from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const { value, setValue } = props;

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {value && <i className="fa-solid fa-x" onClick={() => setValue("")}></i>}
    </div>
  );
}
