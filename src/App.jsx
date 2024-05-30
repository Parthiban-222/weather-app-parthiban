import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

const KEY = '59a8598188956c3ff037e576ee1f90e9';

const App = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
      setData(response.data);
      console.log(response.data);
      console.log(response.data);
    } catch (err) {
      alert('Please Enter the City Name Correctly');
    }
  };
  const convertToCelsius = (kelvin) => {
    return (kelvin - 273.15 ).toFixed(4).substring(0, 4);
  };
  const getWindDirection = (degree) => {
    if (degree >= 337.5 || degree < 22.5) {
      return 'North';
    } else if (degree >= 22.5 && degree < 67.5) {
      return 'Northeast';
    } else if (degree >= 67.5 && degree < 112.5) {
      return 'East';
    } else if (degree >= 112.5 && degree < 157.5) {
      return 'Southeast';
    } else if (degree >= 157.5 && degree < 202.5) {
      return 'South';
    } else if (degree >= 202.5 && degree < 247.5) {
      return 'Southwest';
    } else if (degree >= 247.5 && degree < 292.5) {
      return 'West';
    } else {
      return 'Northwest';
    }
  };
  return (
    <div className='APP'>
      <h1 className='title'>Weather App</h1>
      <div className='input-container'>
        <input
          type='text'
          className='input'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter the City Name'
        />
        <button className='button' onClick={fetchData}>Fetch</button>
      </div>
      <div>
        {data && (
          <div className='container'>
            <h1>{data.name}, {data.sys.country}</h1>
            <div className='weather-info'>
              <div className='box temp'>{convertToCelsius(data.main.temp)} °C</div>
              <div className='box coordinates'>Latitude - {data.coord.lat}<br />Longitude - {data.coord.lon}</div>
              <div className='box wind-speed'>Wind Speed - {data.wind.speed} m/s</div>
              <div className='box wind-direction'>Wind Direction   {getWindDirection(data.wind.deg)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
