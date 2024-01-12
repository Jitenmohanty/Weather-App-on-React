import { useState } from 'react'
import hotBg from './assets/Hot.jpg'
import './App.css'

function App() {

  return (
    <div className='app' style={{backgroundImage:`url(${hotBg})`}}>
      <div className="navbar">
        <div className="container">
          <div className="section section_input">
                <input type="text" placeholder='Enter city name' name='city'/>
                <button>F</button>
          </div>
          <div className="section section_weatherdata">
              <div className="icons">
                <h3>Delhi,IN</h3>
                <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="weatherIcon" />
                <h3>Cold</h3>
              </div>
              {/* {Chart representaition} */}
              {/* {Description Components} */}
              <div className="tempreture">
                <h1>34 °C</h1>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
