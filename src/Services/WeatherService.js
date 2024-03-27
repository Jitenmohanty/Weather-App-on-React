import { toast } from "react-toastify";
import defaultImg from "../assets/clearSky.png";
import "react-toastify/dist/ReactToastify.css";
import.meta.env.REACT_APP_WEATHER_API_KEY;
const API_KEY = String(import.meta.env.VITE_WEATHER_API_KEY); // Use .env for API keys
export const WEATHER_API_KEY = "https://api.tomorrow.io/v4/weather/realtime";

const getDataFromWeatherApi = async (citys) => {
  try {
    const URL = `${WEATHER_API_KEY}?location=${citys}&apikey=${API_KEY}`;

    const response = await fetch(URL);
    if (!response.ok) {
      if (response.status === 429) {
        toast.error("Too many request");
        return
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const city = data.location;
    const weatherDetails = data.data.values;
    return { city, weatherDetails };
  } catch (error) {
    if (error.status === 429) {
      toast.error("Too many request!");
    } else {
      toast.error("Invalid City Name!");
    }
    console.error("Error fetching weather data:", error.message);
    throw error; // Re-throw the error to be caught by the calling code if needed
  }
};

export { getDataFromWeatherApi };
