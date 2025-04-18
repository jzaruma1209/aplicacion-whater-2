import { use, useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);
    //aqui en vez de axios  usamos el getCurentPosition() porque axios es para peticiones http
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const error = () => {
      setHasError(true);
      setIsLoading(false);
    };

    //vamos pedir una localizacion
    navigator.geolocation.getCurrentPosition(success, error);
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
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [coords]); // hay que visualizar las coors or eso se hace
  console.log(weather);
  return (
    <div className="app flex-container">
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
          {
            showMessage && <p>Please activate location</p>
            /*Corto circuito trabajo */
          }
        </div>
      ) : hasError ? (
        <h1 className="app-flex-h1">
          To obtain the weather of your city you must accept the permissions
        </h1>
      ) : (
        <WeatherCard weather={weather} temp={temp} />
      )}
    </div>
  );
}
export default App;
