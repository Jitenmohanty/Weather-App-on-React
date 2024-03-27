import React from "react";
import data from "../utils/constant.json";
import image from "../assets/clearSky.png"


const WeatherOnCity = ({ weather }) => {
    
  return (
    <div>
      {weather &&
        data.map((elem) => (
          <div key={elem.weatherCode}>
            {weather.weatherCode === Number(elem.weatherCode) && (
              <div>
                <img src={elem.image} alt={elem.description} />
                <p> {elem.description}</p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default WeatherOnCity;
