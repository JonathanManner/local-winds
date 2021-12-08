export const fetchWeather = async (lon, lat) => {
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } return 'error';
  } catch (error) {
    console.log(error);
  }
};