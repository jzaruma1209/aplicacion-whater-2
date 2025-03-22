import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
function App() {
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState();
  useEffect(() => {
    //aqui en vez de axios  usamos el getCurentPosition() porque axios es para peticiones http
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    //vamos pedir una localizacion
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  //useEfect para axios
  useEffect(() => {
    if (coords) {
      //lo que sucede es como esta renderizado porque el coords esta en valor null asi que es falsy asique va a atomar ocmo que no porque esta en nulll pero ya el cliente acepta los permiso da valor a coords mediate el useState da valores lo visulisa en useEffects asique ahy si entre
      //EL useEffect se inicializa una sola vez, por lo menos al inicio
      const API_KEY = "5166bb2621e186b15bb8cedadf9db7a1";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrengeit = ((celsius * 9) / 5 + 32).toFixed(1);
          setTemp({ celsius, fahrengeit });
        })
        .catch((err) => console.error(err));
    }
  }, [coords]); // hay que visualizar las coors or eso se hace
  console.log(weather);
  return (
    <div>
      <h1>Proyecto v2</h1>
      <WeatherCard weather={weather} temp={temp} />
    </div>
  );
}
export default App;
