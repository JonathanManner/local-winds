import React from "react";
import { RenderWeather } from "../RenderWeather/RenderWeather";
import "./Options.css";
import { coordinates } from "../../utilities/coordinates";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectLocation, selectDay } from "../../store/actions/actions";

export const Options = () => {
  // const [selectedDay, setSelectedDay] = useState("forecast");
  const selectedDay = useSelector(state => state.selectedDay);
  const locationID = useSelector(state => state.locationID);
  const dispatch = useDispatch();

  const handleSelectedDayChange = (selectedDay) => {
    // setSelectedDay(selectedDay);
    dispatch(selectDay(selectedDay));
  };

  const handleSearch = (_locationID) => {
    dispatch(selectLocation(_locationID));
  };

  return (
    <React.Fragment>
      <div className="options-wrap">
        <div className="options-navbar">
          <div className="options">
            <div className="select-location"></div>
            <SearchBar coordinates={coordinates} handleSearch={handleSearch} />
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
