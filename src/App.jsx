import { useEffect, useRef, useState } from "react";
import Description from "./components/Description";
import { getDataFromWeatherApi } from "./Services/WeatherService";
import hotBg from "./assets/Hot2.jpg";
import coldBg from "./assets/Cold2.jpg";
import WeatherOnCity from "./components/WeatherOnCity";
import LocationTracker from "./components/LocationTracker";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("celcious");
  const [inputs, setInputs] = useState("Delhi");
  const [frValue, setFrValue] = useState(0);
  const [bg, setBg] = useState(hotBg);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getDataFromWeatherApi(inputs);
      if (!data) {
        console.log("Error");
      }
      setWeather(data);

      //Dyanamic background image.
      const threshold = units === "celcious" ? 20 : 60;
      
      if (data.weatherDetails.temperature <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };
    if (inputs.length > 0) {
      fetchWeatherData();
    }
  }, [units, inputs]);

  useEffect(() => {
    //Outside click then city weather report  shows
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setInputs(inputRef.current.value);
      }
    };
    
    document.body.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const locationLoad = (latitude,longitude)=>{
    //Add latitude and longitude
    let data = (latitude).toString()+" "+(longitude).toString();
    setInputs(data)
  }
  
  const handleUnits = () => {
    //Celsius to Fahrenheit | °C to °F
    setFrValue(() => {
      return ((weather.weatherDetails.temperature * 9) / 5 + 32).toFixed(2);
    });
    setUnits(units === "celcious" ? "fharenite" : "celcious");
  };
  const handleInputs = (e) => {
    //After enter the city name and click enter to search
    if (e.keyCode === 13) {
      setInputs(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="navbar">
        {weather && (
          <div className="container">
            <div className="section section_input">
              <div className="inner">
                <input
                  type="text"
                  ref={inputRef}
                  onKeyDown={handleInputs}
                  placeholder="Enter city name"
                  name="city"
                />
                <LocationTracker onLoadLocation={locationLoad}/>
              </div>

              <button onClick={handleUnits}>
                °{units === "metric" ? "F" : "C"}
              </button>
            </div>
            <div className="section section_weatherdata">
              <div className="icon">
                <h3>{weather.city.name}</h3>
                <WeatherOnCity weather={weather.weatherDetails} />
              </div>

              <div className="tempreture">
                <h2>
                  {units === "celcious"
                    ? weather.weatherDetails.temperature
                    : frValue}{" "}
                  °{units === "celcious" ? "C" : "F"}
                </h2>
              </div>
            </div>

            <Description weather={weather.weatherDetails} units={units} />
          </div>
        )}
      </div>
      {/* TODO */}
      {/* {Chart representaition} */}
      {/* {Description Components} */}
    </div>
  );
}

export default App;
