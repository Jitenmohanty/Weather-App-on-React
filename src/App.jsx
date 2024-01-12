import { useEffect, useState } from 'react'
import hotBg from './assets/Hot2.jpg'
import './App.css'
import Description from './components/Description'
import { getDataFromWeatherApi } from './Services/WeatherService'

function App() {

  const [weather,setWeather] = useState(null);
  const [units,setUnits] = useState("imperal");

  useEffect(()=>{
   const fetchWeatherData = async()=>{
    const data = await getDataFromWeatherApi("Delhi",units)
    setWeather(data)
   }
   fetchWeatherData();
  },[units])

  const handleUnits = ()=>{
    setUnits(units === "metric"?"imperal":"metric")
  }

  return (
    <div className='app' style={{backgroundImage:`url(${hotBg})`}}>
      <div className="navbar">
        {
          weather && <div className="container">
          <div className="section section_input">
                <input type="text" placeholder='Enter city name' name='city'/>
                <button onClick={handleUnits}>°{units === "metric"?"C":"F"}</button>
          </div>
          <div className="section section_weatherdata">
              <div className="icon">
                <h3>{weather.name},{weather.country}</h3>
                <img src={weather.iconUrl} alt="weatherIcon" />
                <h3>{weather.description} </h3>
              </div>
              
              <div className="tempreture">
                <h1>{weather.temp.toFixed()} °{units === "metric"?"C":"F"}</h1>
              </div>
          </div>
              {/* {Chart representaition} */}
              {/* {Description Components} */}
              <Description weather={weather} units={units}/>
        </div>
        }
      </div>
    </div>
  )
}

export default App
