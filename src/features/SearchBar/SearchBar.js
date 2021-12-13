import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchBar.css";
import { DropDownItem } from "../DropDownItem/DropDownItem";
import { setSearchTerm, selectLocation } from "../../store/actions/actions";

export const SearchBar = (props) => {
  const coordinates = props.coordinates;
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState(0);
  const searchTerm = useSelector((state) => state.searchTerm);

  const filteredItems = coordinates.filter((coordinate) =>
    coordinate.location.toLowerCase()
  .includes(searchTerm.toLowerCase()));

  const onSearchInput = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
    setCurrentItem(0);
  };

  const handleKeyPress = (e) => {
    const keyPressed = e.key;
    if (searchTerm !== "") {
      if (keyPressed === "ArrowDown" && currentItem < filteredItems.length - 1) {
        e.preventDefault();
        setCurrentItem((current) => current + 1);
      } else if (keyPressed === "ArrowUp" && currentItem > 0) {
        e.preventDefault();
        setCurrentItem((current) => current - 1);
      } else if (keyPressed === "Enter") {
        dispatch(setSearchTerm(""));
        const selectedItem = filteredItems[currentItem];
        dispatch(selectLocation(selectedItem.id));
        setCurrentItem(0);
      }
    }
    return;
  };

  return (
    <div className="search-container">
      <input
        onKeyDown={handleKeyPress}
        className="search-box"
        type="text"
        value={searchTerm}
        onChange={onSearchInput}
        placeholder="Sök och välj ort"
      />

      <div className="dropdown-container">
        {searchTerm !== "" && (
          <div>
            <div className="dropdown-list">
              {filteredItems.map((coordinate, index) => {
                  return (
                    <div 
                    className="list-item" 
                    key={"list-item-" + index} 
                    style={
                      {
                        backgroundColor: currentItem === index ? "#daeeff":"",
                      }}
                    onMouseEnter={() => setCurrentItem(index)}
                    onMouseLeave={() => setCurrentItem(currentItem)}
                    >
                      {searchTerm !== "" && (
                        <div className="dropdown-list-item">
                          <DropDownItem
                            location={coordinate}
                            searchTerm={searchTerm}
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
