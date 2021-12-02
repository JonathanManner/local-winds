import React, { useState } from "react";
import { RenderWeather } from "../RenderWeather/RenderWeather";
import "./Options.css";
import { coordinates } from "../../utilities/coordinates";
import { SearchBar } from "../SearchBar/SearchBar";

export const Options = () => {
  const [selectedDay, setSelectedDay] = useState("forecast");
  const [locationID, setLocationID] = useState(5);

  const handleSelectedDayChange = (selectedDay) => {
    setSelectedDay(selectedDay);
  };

//   const handleLocationChange = (locationID) => {
//     setLocationID(locationID);
//   };

  const handleSearch = (locationID) => {
    setLocationID(locationID);
  };

  return (
    <React.Fragment>
      <div className="options-wrap">
        <div className="options-navbar">
          <div className="options">
            <div className="select-location">
              {/* <p>Plats</p>
              <select
                name="location"
                value={locationID}
                onChange={(event) => handleLocationChange(event.target.value)}
              >
                {coordinates.map((coordinate) => {
                  const location = coordinates[coordinate.id];
                  return (
                    <option value={coordinate.id} key={coordinate.id}>
                      {location.location}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <SearchBar
              coordinates={coordinates}
              handleSearch={handleSearch}
              setLocationID={setLocationID}
            />
            <div className="select-interval">
              <p>Intervall:</p>
              <select
                name="interval"
                value={selectedDay}
                onChange={(event) =>
                  handleSelectedDayChange(event.target.value)
                }
              >
                <option value="today">Idag</option>
                <option value="forecast">5-dagars prognos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <RenderWeather interval={selectedDay} location={locationID} />
    </React.Fragment>
  );
};
