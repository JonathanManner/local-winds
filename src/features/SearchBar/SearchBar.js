import React, { useState } from "react";
import "./SearchBar.css";
import { DropDownItem } from "../DropDownItem/DropDownItem";

export const SearchBar = (props) => {
  const coordinates = props.coordinates;
  const handleSearch = props.handleSearch;

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchInput = (e) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);
  };

  const onEnter = ({ key }) => {
    if (key === "Enter") {
      console.log(searchTerm, ": " + key);
      setSearchTerm("");
    }
  };
  
  return (
    <div className="search-container">
      <input
        className="search-box"
        type="text"
        value={searchTerm}
        onChange={onSearchInput}
        onKeyPress={onEnter}
        placeholder="Sök och välj ort"
      />
      
      <div className="dropdown-container">
        {searchTerm !== "" && (
        <div>
          <div className="dropdown-list">
            {coordinates.map((coordinate, index) => {
              return (
                <div key={"list-item-" + index}>
                  {searchTerm !== "" && (
                    <div
                      className="dropdown-list-item"
                    >
                      <DropDownItem
                        location={coordinate}
                        searchTerm={searchTerm}
                        handleSearch={handleSearch}
                        setSearchTerm={setSearchTerm}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
