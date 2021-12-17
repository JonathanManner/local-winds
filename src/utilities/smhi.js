export const fetchWeather = async (lon, lat) => {
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } return 'error, did not retrieve weatherdata';
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocations = async (userInput) => {
  const url = `https://www.smhi.se/wpt-a/backend_startpage_nextgen/geo/autocomplete/${userInput}`;
  if (userInput) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } return 'error, did not retrieve locations';
  } catch (error) {
    console.log(error);
  }
} console.log('no user input');
} 