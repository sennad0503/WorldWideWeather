import React, { useEffect, useState } from "react";
// import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function ViewPage() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [user, setUser] = useState({});
  const api = {
    key: "530b11041ae7122bb446e0de7e72efca",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  useEffect(() => {
    const tokenObj = {
      token: localStorage.getItem("token"),
    };
    if (tokenObj.token) {
      fetch("https://calm-taiga-37805.herokuapp.com/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tokenObj),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => setUser(data.profile))
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [history]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      // Get request to the API
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  function celToFer(input) {
    return input * (9 / 5) + 32;
  }
  function addWeather() {
    console.log(user);
    if (weather && user) {
      const obj = {
        location: weather.name,
        temp: weather.main.temp,
        userId: user._id,
      };
      fetch("https://calm-taiga-37805.herokuapp.com/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())

        .then((data) => history.push("/home"))
        .catch((err) => console.log(err));
    }
  }
  const dateBulider = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBulider(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.floor(celToFer(weather.main.temp))}˚ƒ
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <button
                className="bg-indigo-500 p-3 rounded-full border-3 text-white"
                onClick={() => addWeather()}
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default ViewPage;
// src = https://www.youtube.com/watch?v=GuA0_Z1llYU
