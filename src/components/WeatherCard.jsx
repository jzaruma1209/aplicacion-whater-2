import { useState } from "react";

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const changeDedrees = (second) => {
    setIsCelsius(!isCelsius); //
  };
  console.log(weather, "estoy dentro del card");
  return (
    <section>
      <div>
        <h1>Weather App</h1>
        <h2>
          {weather?.name},{weather?.sys.country}{" "}
          {/*aqui se usa el encadenamiento opcional  ose el ? */}
        </h2>
        <article>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt={weather?.weather[0].main}
            />
          </div>
          <article>
            <h3>{weather?.weather[0].description}</h3>
            <ul>
              <li>
                <span>Wind speed</span>
                <span>{weather?.wind.speed}m/s</span>
              </li>
              <li>
                <span>Couds</span>
                <span>{weather?.clouds.all}%</span>
              </li>
              <li>
                <span>Pressure</span>
                <span>{weather?.main.pressure}hPa</span>
              </li>
            </ul>
          </article>

          <h2>
            {isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrengeit} °F`}
          </h2>
          {console.log(temp, "este es el valor de temp")}
          {/*encadenamiento opcional o operador terciario mas tecnico */}

          <button onClick={changeDedrees}>
            Change to {isCelsius ? "°F" : "°C"}
          </button>
        </article>
      </div>
    </section>
  );
};

export default WeatherCard;
