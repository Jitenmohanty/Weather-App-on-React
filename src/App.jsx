import { useEffect, useState } from 'react'
import hotBg from './assets/Hot2.jpg'
import coldBg from './assets/Cold2.jpg'
import './App.css'
import Description from './components/Description'
import { getDataFromWeatherApi } from './Services/WeatherService'

function App() {

  const [weather,setWeather] = useState(null);
  const [units,setUnits] = useState("metric");
  const [inputs,setInputs] = useState("Delhi")
  const [bg,setBg] = useState(hotBg)

  useEffect(()=>{
   const fetchWeatherData = async()=>{
    const data = await getDataFromWeatherApi(inputs,units)
    if(!data){
      console.log("Error")
    }
    setWeather(data)

    //Dyanamic background image.
    const threshold = units ==="metric"?20:60;

    if(data.temp <= threshold) setBg(coldBg)
    else setBg(hotBg)
   }
   fetchWeatherData();
  },[units,inputs])

  const handleUnits = ()=>{
    setUnits(units === "metric"?"imperial":"metric")
  }
  const handleInputs = (e)=>{
    if(e.keyCode === 13){
      setInputs(e.currentTarget.value)
      e.currentTarget.blur();
    }
  }

  return (
    <div className='app' style={{backgroundImage:`url(${bg})`}}>
      <div className="navbar">
        {
          weather && <div className="container">
          <div className="section section_input">
                <input type="text" onKeyDown={handleInputs} placeholder='Enter city name' name='city'/>
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
