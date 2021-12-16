import React from "react";
import "./RenderToday.css";
import tempIcon from "../../images/temp-icon.svg";
import windIcon from "../../images/wind-icon.svg";
import windArrow from "../../images/wind-arrow.svg";
import moment from 'moment';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    return (<div className="loading"><div>Loading...</div></div>);
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
                    <div 
                    className="flex-outer-container" 
                    key={"values-" + _index}
                    >
                      <Stack spacing={2}>
                      <Item
                      className="items"
                      sx={_index % 2 === 0 ? {
                        width: "100%",
                        borderRadius: "0px",
                      } : {
                        width: "100%",
                        borderRadius: "0px",
                        backgroundColor: "rgba(240, 240, 240, 1)",
                      } }
                      >
                      <div className="time">
                        {_index === 0 ? moment().format('LT') : formattedDate}
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
                      </Item>
                      </Stack>
                    </div>
                  );
                })}
                <div className="spacer"></div>
              </React.Fragment>
            ) : null;
          })}
    </div>
  );
};
