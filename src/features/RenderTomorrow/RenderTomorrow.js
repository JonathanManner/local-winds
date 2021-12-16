import React from "react";
import "./RenderTomorrow.css";
import moment from "moment";
import 'moment/locale/sv';
import tempIcon from "../../images/temp-icon.svg";
import windIcon from "../../images/wind-icon.svg";
import windArrow from "../../images/wind-arrow.svg";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TIMES_TO_SHOW = ["00:00", "06:00", "12:00", "18:00"];
moment.locale('sv')

export const RenderTomorrow = (props) => {
  const weather = props.weatherData;
  const isValidDate = (date) => weather[date].length >= 4;
  const dates = Object.keys(weather).slice(1).filter(isValidDate);

  // const weekday = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag",]
  // const getDayOfWeek = (daysToAdd = 0) => {
  //   let days = daysToAdd;
  //   const day = new Date().getDay();
  //   if (days + day > weekday.length) {
  //     days = days + day - weekday.length;
  //   } else {
  //     days = daysToAdd;
  //   }
  //   return weekday[days + day];
  // }

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
            <Stack spacing={2}>
              <Item
              sx={{
                backgroundColor: '#ffffff',
                color: 'black',
              }}>
              <div className="date">{moment().add(index + 1, 'days').format('dddd').charAt(0).toUpperCase() + moment().add(index + 1, 'days').format('dddd').slice(1)} {weatherDate}</div>
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
              </Item>
              </Stack>
            </div>
          </React.Fragment>
        ) : null;
      })}
      <div className="spacer"></div>
    </div>
  );
};
