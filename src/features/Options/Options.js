import React from "react";
import { RenderWeather } from "../RenderWeather/RenderWeather";
import "./Options.css";
import { coordinates } from "../../utilities/coordinates";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectDay } from "../../store/actions/actions";

export const Options = () => {
  const selectedDay = useSelector(state => state.selectedDay);
  const locationID = useSelector(state => state.locationID);
  const dispatch = useDispatch();

  const handleSelectedDayChange = (selectedDay) => {
    dispatch(selectDay(selectedDay));
  };

  return (
    <React.Fragment>
      <div className="options-wrap">
        <div className="options-navbar">
          <div className="options">
            <div className="select-location"></div>
            <SearchBar coordinates={coordinates}/>
            <div className="select-interval">
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
