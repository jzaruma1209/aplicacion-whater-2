import { useState } from "react";
import "./styles/WeatherCard.css";
const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const changeDedrees = (second) => {
    setIsCelsius(!isCelsius); //
  };
  console.log(weather, "estoy dentro del card");
  return (
    <section className="card flex-container">
      <h1 className="card__title">Weather App</h1>
      <h2 className="card__country">
        {weather?.name},{weather?.sys.country}{" "}
        {/*aqui se usa el encadenamiento opcional  ose el ? */}
      </h2>
      <article className="card__body grid-container">
        <div className="card__image-container">
          <img
            className="card__image"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt={weather?.weather[0].main}
          />
        </div>
        <article className="info grid-container">
          <h3 className="info__title">{weather?.weather[0].description}</h3>
          <ul className="info__list grid_container">
            <li className="info__item grid-container">
              <span className="info__label">Wind speed </span>
              <span className="info__value">{weather?.wind.speed}m/s</span>
            </li>
            <li className="info__item grid-container">
              <span className="info__label">Couds</span>
              <span className="info__value">{weather?.clouds.all}%</span>
            </li>
            <li className="info__item grid-container">
              <span className="info__label">Pressure</span>
              <span className="info__value">{weather?.main.pressure}hPa</span>
            </li>
          </ul>
        </article>
      </article>

      <h2 className="card_temp">
        {isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrengeit} °F`}
      </h2>
      {console.log(temp, "este es el valor de temp")}
      {/*encadenamiento opcional o operador terciario mas tecnico */}

      <button className="card__btn" onClick={changeDedrees}>
        Change to {isCelsius ? "°F" : "°C"}
      </button>
    </section>
  );
};

export default WeatherCard;
