import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import WeatherCard from "../component/WeatherCard";

export default function Home() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [weatherList, setWeatherList] = useState([]);
  const [refresh, setRefresh] = useState("");

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
        .then((response) => response.json())
        .then((data) => setUser(data.profile))
        .catch((err) => console.log(err));
    } else {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    if (user) {
      fetch(`https://calm-taiga-37805.herokuapp.com/weather/${user._id}/all`)
        .then((res) => res.json())
        .then((data) => {
          setWeatherList(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [user, refresh]);

  return (
    <div className="Title">
      <ul>
        {weatherList.map((city, index) => {
          return (
            <WeatherCard
              setRefresh={setRefresh}
              city={city}
              key={city._id}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
}
