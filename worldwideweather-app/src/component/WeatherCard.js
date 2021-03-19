import React, { useState } from "react";

function WeatherCard({ city, setRefresh }) {
  const [weather, setWeather] = useState(null);
  function deletebtn() {
    fetch(`https://calm-taiga-37805.herokuapp.com/weather/${city._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefresh(data);
      });
  }
  function searchbtn(query) {
    const api = {
      key: "530b11041ae7122bb446e0de7e72efca",
      base: "https://api.openweathermap.org/data/2.5/",
    };
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        // setRefresh(data);
        console.log(result);
      });
  }
  function celToFer(input) {
    return input * (9 / 5) + 32;
  }
  return (
    <div className="flex justify-around">
      <div className="flex flex-col">
        <h2 className="text-2xl font-mono " key={city._id}>
          {city.location}
        </h2>
        <div>
          <button
            className="btn bg-green-500 mx-2 text-white rounded-md"
            onClick={() => searchbtn(city.location)}
          >
            View Temp
          </button>
          <button
            className="btn bg-red-500 text-white rounded-md my-2"
            onClick={() => deletebtn(city._id)}
          >
            delete
          </button>
        </div>
      </div>
      <div className="flex justify-between border-black border-1 w-3/4">
        {weather && (
          <>
            <div>
              <p className="text-xl p-2">
                <h1 className="p-2 text-red-800">Temp</h1>
                {Math.round(celToFer(weather.main.temp))}˚f
              </p>
            </div>
            <div>
              <p className="text-md p-2">
                <h1 className="p-2 text-red-800">MIN Temp</h1>
                {Math.round(celToFer(weather.main.temp_min))}˚f
              </p>
            </div>
            <div>
              <p className="text-md p-2">
                <h1 className="p-2 text-red-800">Max Temp</h1>
                {Math.round(celToFer(weather.main.temp_max))}˚f
              </p>
            </div>
            <div>
              <p className="text-md p-2">
                <h1 className="p-2 text-red-800">Feels-like</h1>
                {Math.round(celToFer(weather.main.feels_like))}˚f
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
