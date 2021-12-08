import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import "./SearchBar.css";
import { DropDownItem } from "../DropDownItem/DropDownItem";
import { setSearchTerm } from "../../store/actions/actions";

export const SearchBar = (props) => {
  const coordinates = props.coordinates;
  const handleSearch = props.handleSearch;
  const dispatch = useDispatch();

  const searchTerm = useSelector(state => state.searchTerm);

  const onSearchInput = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
  };

  // const onEnter = ({ key }) => {
  //   if (key === "Enter") {
  //     console.log(searchTerm, ": " + key);
  //     setSearchTerm("");
  //   }
  // };

  return (
    <div className="search-container">
      <input
        className="search-box"
        type="text"
        value={searchTerm}
        onChange={onSearchInput}
        // onKeyPress={onEnter}
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
                      <div className="dropdown-list-item">
                        <DropDownItem
                          location={coordinate}
                          searchTerm={searchTerm}
                          handleSearch={handleSearch}
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
