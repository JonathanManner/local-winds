import React from "react";
import "./RenderToday.css";
import tempIcon from "../../images/temp-icon.svg";
import windIcon from "../../images/wind-icon.svg";
import windArrow from "../../images/wind-arrow.svg";

export const RenderToday = (props) => {
  const weather = props.weatherData;
  const dates = Object.keys(props.weatherData).slice(0, 1);

  if (
    !weather ||
    !dates ||
    typeof weather !== "object" ||
    weather.length === 0 ||
    dates.length === 0
  ) {
    return "Loading...";
  }

  return (
    <div className="render-today">
          {dates.map((weatherDate, index) => {
            return weather[weatherDate] && weather[weatherDate].length !== 0 ? (
              <React.Fragment key={"todayList-" + index}>
                {weather[weatherDate].map((weatherHour, _index) => {
                  const formattedDate = weatherHour.validTime.slice(
                    weatherHour.validTime.indexOf("T") + 1,
                    weatherHour.validTime.length - 4
                  );
                  return (
                    <div className="flex-outer-container" key={"values-" + _index}>
                      <div className="time">
                        {_index === 0 ? "Now" : formattedDate}
                      </div>
                      <div className="values">
                        <React.Fragment key={_index}>
                          <span>
                            <img src={tempIcon} alt="tempIcon" />{" "}
                            {weatherHour.parameters.t.values}° {"  "}
                          </span>
                          <span>
                            <img src={windIcon} alt="windIcon" />{" "}
                            {weatherHour.parameters.ws.values} (
                            {weatherHour.parameters.gust.values}) m/s{" "}
                          </span>
                          <span>
                            <img
                              src={windArrow}
                              alt="windArrow"
                              style={{
                                transform: `rotate(${weatherHour.parameters.wd.values}deg) scale(-1, -1)`,
                              }}
                            />{" "}
                          </span>
                        </React.Fragment>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : null;
          })}
    </div>
  );
};
