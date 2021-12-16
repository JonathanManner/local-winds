import React from "react";
import { RenderWeather } from "../RenderWeather/RenderWeather";
import "./Options.css";
import { coordinates } from "../../utilities/coordinates";
import { SearchBar } from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { selectDay } from "../../store/actions/actions";
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

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
              {/* <button
              value={selectedDay}
              className="options-button"
              onClick={() =>
                selectedDay === 'forecast' ?
                handleSelectedDayChange('today') :
                handleSelectedDayChange('forecast')
              }
              ><span>{selectedDay === 'forecast' ? 'Idag' : 'I veckan'}</span></button>          */}
              <Switch 
              {...label} 
              defaultChecked color="default"
              onClick={() =>
                selectedDay === 'forecast' ?
                handleSelectedDayChange('today') :
                handleSelectedDayChange('forecast')
              }
              />
              {/* <Button
              sx={{
                fontFamily: "Century Gothic",
                fontSize: 12,
                background: "white",
                color: "black",
                '&:hover': {
                  background: "white",
                },
              }} 
              className="options-button"
              onClick={() =>
                selectedDay === 'forecast' ?
                handleSelectedDayChange('today') :
                handleSelectedDayChange('forecast')
              }
              variant="contained">{selectedDay === 'forecast' ? 'Idag' : 'I veckan'}</Button>             */}
            </div>
          </div>
        </div>
      </div>

      <RenderWeather interval={selectedDay} location={locationID} />
    </React.Fragment>
  );
};
