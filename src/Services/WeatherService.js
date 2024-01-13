import { toast } from "react-toastify";
import defaultImg from "../assets/clearSky.png";
import 'react-toastify/dist/ReactToastify.css';
import.meta.env.REACT_APP_WEATHER_API_KEY;
const API_KEY = String(import.meta.env.VITE_WEATHER_API_KEY); // Use .env for API keys
export const WEATHER_API_KEY = "https://api.openweathermap.org/data/2.5";

const makeUrlIcon = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getDataFromWeatherApi = async (citys, units = "metric") => {
  try {
    const URL = `${WEATHER_API_KEY}/forecast?q=${citys}&appid=${API_KEY}&units=${units}`;

    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const { city, list } = data;
    const { weather, main, wind } = list[0];
    const { name, country } = city;

    const { temp, feels_like, temp_min, temp_max, pressure, humidity } = main;
    const { speed } = wind;

    const { description, icon } = weather[0];
    return {
      name,
      country,
      description,
      iconUrl: icon === "01n" ? defaultImg : makeUrlIcon(icon),
      temp,
      temp_max,
      temp_min,
      feels_like,
      pressure,
      humidity,
      speed,
    };
  } catch (error) {
    toast.error("Invalid City Name!")
    console.error("Error fetching weather data:", error.message);
    throw error; // Re-throw the error to be caught by the calling code if needed
  }
};

export { getDataFromWeatherApi };
