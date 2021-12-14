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
              <button
              value={selectedDay}
              className="options-button"
              onClick={() =>
                selectedDay === 'forecast' ?
                handleSelectedDayChange('today') :
                handleSelectedDayChange('forecast')
              }
              ><span>{selectedDay === 'forecast' ? 'Idag' : 'I veckan'}</span></button>
            </div>
          </div>
        </div>
      </div>

      <RenderWeather interval={selectedDay} location={locationID} />
    </React.Fragment>
  );
};
