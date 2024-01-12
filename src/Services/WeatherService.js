const API_KEY = "b75501e1b95c6907ccc3e2ec3f2b9d66";

const makeUrlIcon = (iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`



const getDataFromWeatherApi = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  const {
    weather,
    main: temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconUrl:makeUrlIcon(icon),
    temp,
    temp_max,
    temp_min,
    feels_like,
    pressure,
    humidity,
  };
  // console.log(data)
};

export { getDataFromWeatherApi };
