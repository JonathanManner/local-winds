import React from "react";
import { RenderWeather } from "../RenderWeather/RenderWeather";
import "./Options.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectDay } from "../../store/actions/actions";
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const Options = () => {
  const locations = useSelector(state => state.locations);
  const selectedDay = useSelector(state => state.selectedDay);
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
            <SearchBar locations={locations}/>
            <div className="select-interval">
              <Switch 
              {...label} 
              defaultChecked color="default"
              onClick={() =>
                selectedDay === 'forecast' ?
                handleSelectedDayChange('today') :
                handleSelectedDayChange('forecast')
              }
              />
            </div>
          </div>
        </div>
      </div>

      <RenderWeather interval={selectedDay}/>
    </React.Fragment>
  );
};
