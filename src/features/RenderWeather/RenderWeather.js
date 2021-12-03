import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../utilities/smhi";
import { coordinates } from "../../utilities/coordinates";
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
  const { lon, lat } = coordinates[props.location];
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchWeather(lon, lat).then((response) => {
      setIsLoading(false);
      const tempData = response;
      const sortedData = {};
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
      setWeatherData(tempData.futureData);
    });
  }, [lon, lat]);

  const renderComponent = (location) => {
    if (isLoading) return "Loading...";
    return (
      <>
        {props.interval === "today" && (
          <RenderToday weatherData={weatherData} />
        )}
        {props.interval === "forecast" && (
          <RenderTomorrow weatherData={weatherData} />
        )}
      </>
    );
  };

  return (
    <div className="render-weather-wrap">
      <h2>Väderprognos för: </h2>

      <h3>{coordinates[props.location]["location"]}</h3>
      {renderComponent(props.location)}
    </div>
  );
};
