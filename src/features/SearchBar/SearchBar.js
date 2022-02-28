import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchLocations } from "../../utilities/smhi";
import { updateLocations } from "../../store/actions/actions";
import "./SearchBar.css";
import { DropDownItem } from "../DropDownItem/DropDownItem";
import { setSearchTerm, selectLocation } from "../../store/actions/actions";
import { coordinates } from "../../utilities/coordinates";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState(0);
  const searchTerm = useSelector((state) => state.searchTerm);
  const locations = useSelector((state) => state.locations);

  const filteredItems = locations.filter((location) =>
    location.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let weatherLocations = [];
  // this was used with the locations API endpoint
  // const renderSearchList = (response) => {
  //   if (response) {
  //     return response.map((responseItem, index) => {
  //       return responseItem.country === "Sverige"
  //         ? weatherLocations.push({
  //             id: index,
  //             location: `${responseItem.place}, ${responseItem.county}`,
  //             lon: Math.round(responseItem.lon * 100) / 100,
  //             lat: Math.round(responseItem.lat * 100) / 100,
  //           })
  //         : null;
  //     });
  //   }
  //   return;
  // };

  const matchInputWithList = (userInput) => {
    coordinates.map((coordinate) => {
      if (coordinate.location.toLowerCase().includes(userInput.toLowerCase())) {
      weatherLocations.push({
        id: coordinate.id,
        location: coordinate.location,
        lon: coordinate.lon,
        lat: coordinate.lat
      })
      return dispatch(updateLocations(weatherLocations));
    }
    return null;
    })
  }

  const onSearchInput = (e) => {
    const userInput = e.target.value;
    dispatch(setSearchTerm(userInput));
    matchInputWithList(userInput);
    
    // fetchLocations(userInput).then((response) => {
    //   renderSearchList(response);
    //   dispatch(updateLocations(weatherLocations));
    // });

    setCurrentItem(0);
  };

  const handleKeyPress = (e) => {
    const keyPressed = e.key;
    if (searchTerm !== "") {
      if (
        keyPressed === "ArrowDown" &&
        currentItem < filteredItems.length - 1
      ) {
        e.preventDefault();
        setCurrentItem((current) => current + 1);
      } else if (keyPressed === "ArrowUp" && currentItem > 0) {
        e.preventDefault();
        setCurrentItem((current) => current - 1);
      } else if (keyPressed === "Enter") {
        dispatch(setSearchTerm(""));
        const selectedItem = filteredItems[currentItem];
        dispatch(selectLocation(selectedItem));
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
                if (index < 10)
                return (
                  <div
                    className="list-item"
                    key={"list-item-" + index}
                    style={{
                      backgroundColor: currentItem === index ? "#daeeff" : "",
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
                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
