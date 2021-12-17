import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { isItLoading } from "../../store/actions/actions";
import { storeWeather } from "../../store/actions/actions";
import { fetchWeather } from "../../utilities/smhi";
import { RenderTomorrow } from "../RenderTomorrow/RenderTomorrow";
import { RenderToday } from "../RenderToday/RenderToday";
import "./RenderWeather.css";

const formatData = (data) => {
  const weatherObject = {};
  for (let i = 0; i < data.length; i++) {
    weatherObject[data[i].name] = data[i];
  }
  return weatherObject;
};

export const RenderWeather = (props) => {
  const selectedDay = useSelector(state => state.selectedDay);
  const selectedLocation = useSelector(state => state.selectedLocation);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const weatherData = useSelector(state => state.weatherData);

  useEffect(() => {
    if(!selectedLocation) return;
    dispatch(isItLoading(true));
    fetchWeather(selectedLocation.lon, selectedLocation.lat).then((response) => {
      dispatch(isItLoading(false));
      const tempData = response;
      const sortedData = {};
      if (tempData === 'error') return;
      for (let i = 0; i < tempData.timeSeries.length; i++) {
        const value = {
          validTime: tempData.timeSeries[i].validTime,
          parameters: formatData(tempData.timeSeries[i]["parameters"]),
        };
        const date = value.validTime.slice(0, value.validTime.indexOf("T"));
        if (sortedData[date]) {
          sortedData[date].push(value);
        } else {
          sortedData[date] = [value];
        }
      }
      tempData.futureData = sortedData;
      dispatch(storeWeather(tempData.futureData));
    });
    
  }, [selectedLocation, dispatch]);

  const renderComponent = () => {
    if (isLoading || !selectedLocation) return "Loading...";
    return (
      <>
        {selectedDay === "today" && (
          <RenderToday weatherData={weatherData} />
        )}
        {selectedDay === "forecast" && (
          <RenderTomorrow weatherData={weatherData} />
        )}
      </>
    );
  };

  if(!selectedLocation) return (
    <div>
    <div className="spacer"></div>
    <h3 style={{textAlign: "center"}}>Väder</h3>
    <br></br>
    <h4 style={{textAlign: "center"}}>Var god sök på valfri ort i sökrutan</h4>
    <h5 style={{textAlign: "center"}}>(inom Sverige)</h5>
    <div className="spacer"></div>
    </div>
  );
  return (
    <div className="render-weather-wrap">
      <h3>Väderprognos för {selectedLocation.location} {selectedDay === 'forecast' ? 'i veckan' : 'idag'}</h3>
      {renderComponent()}
    </div>
  );
};
