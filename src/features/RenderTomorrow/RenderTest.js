import React from "react";
import "./RenderTomorrow.css";

const TIMES_TO_SHOW = ["00:00", "06:00", "12:00", "18:00"];

export const RenderTomorrow = (props) => {
  const weather = props.weatherData;
  const dates = Object.keys(props.weatherData);
  console.log("#Tomorrow weather data ", weather);
  if (
    !weather ||
    typeof weather !== "object" ||
    weather.length === 0 ||
    dates.length === 0
  )
    return "Loading...";

  return (
    <div className="flexContainer">
      <table>
        <tbody>
          <tr>
            <th className="date">Datum</th>
            <th className="time">Tid</th>
            <th className="values">Värden</th>
          </tr>
          {dates.map((weatherDate, index) => {
            
            return weather[weatherDate] && weather[weatherDate].length !== 0 ? (
              <React.Fragment key={"thisWeek-" + index}>
                <tr className="tr-content">
                  <td className="date">{weatherDate}</td>
                  <div className="timeStamps-grid">
                    {weather[weatherDate].map((weatherData, _index) => {
                      const time = weatherData.validTime.slice(
                        weatherData.validTime.indexOf("T") + 1,
                        weatherData.validTime.length - 4
                      );
                      if (TIMES_TO_SHOW.indexOf(time) === -1) return null;
                      return (
                        <React.Fragment key={"thisWeek-" + _index}>
                          <td className="time">
                            <div
                              className="timeStamp-grid-item"
                              key={"weather-data-" + _index}
                            >
                              {time}
                            </div>
                          </td>
                          <td className="values">
                            <React.Fragment key={_index}>
                              Temperatur: {weatherData.parameters.t.values}°
                              Vindstyrka: {weatherData.parameters.ws.values} m/s
                              Vindbyar: {weatherData.parameters.gust.values} m/s
                              Vindriktning: {weatherData.parameters.wd.values}°
                            </React.Fragment>
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </tr>
              </React.Fragment>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
};
