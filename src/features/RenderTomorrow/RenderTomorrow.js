import React from "react";
import "./RenderTomorrow.css";
import moment from "moment";
import 'moment/locale/sv';
import tempIcon from "../../images/temp-icon.svg";
import windIcon from "../../images/wind-icon.svg";
import windArrow from "../../images/wind-arrow.svg";

const TIMES_TO_SHOW = ["00:00", "06:00", "12:00", "18:00"];
moment.locale('sv')

export const RenderTomorrow = (props) => {
  const weather = props.weatherData;
  const isValidDate = (date) => weather[date].length >= 4;
  const dates = Object.keys(weather).slice(1).filter(isValidDate);

  if (
    !weather ||
    typeof weather !== "object" ||
    weather.length === 0 ||
    dates.length === 0
  )
    return "Loading...";

  return (
    <div className="render-tomorrow">
      {dates.map((weatherDate, index) => {
        return weather[weatherDate] && weather[weatherDate].length !== 0 ? (
          <React.Fragment key={"thisWeek-" + index}>
            <div className="flex-outer-container">
              <div className="date">{moment().add(index + 1, 'days').format('dddd')} {weatherDate}</div>
              {weather[weatherDate].map((weatherData, _index) => {
                const time = weatherData.validTime.slice(
                  weatherData.validTime.indexOf("T") + 1,
                  weatherData.validTime.length - 4
                );
                if (TIMES_TO_SHOW.indexOf(time) === -1) return null;
                return (
                  <React.Fragment key={"thisWeek-" + _index}>
                    <div className="flex-inner-container">
                      <div className="time">
                        <div key={"weather-data-" + _index}>{time}</div>
                      </div>
                      <div className="values">
                        <React.Fragment key={_index}>
                          <span className="iconsAndData">
                            <img src={tempIcon} alt="tempIcon" />{" "}
                            {weatherData.parameters.t.values}° {"  "}
                          </span>
                          <span className="iconsAndData" style={{flex: 1}}>
                            <img src={windIcon} alt="windIcon" />{" "}
                            {weatherData.parameters.ws.values} (
                            {weatherData.parameters.gust.values}) m/s{" "}
                          </span>
                          <span>
                            <img
                              src={windArrow}
                              alt="windArrow"
                              style={{
                                transform: `rotate(${weatherData.parameters.wd.values}deg) scale(-1, -1)`,
                              }}
                            />{" "}
                          </span>
                        </React.Fragment>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </React.Fragment>
        ) : null;
      })}
    </div>
  );
};
