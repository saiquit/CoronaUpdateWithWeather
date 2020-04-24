import React from "react";
import imagWin from "../../assets/eezy_10.jpg";
import imagsim from "../../assets/eezy_1q.jpg";
import "./weather-out.css";
import { useSpring, animated } from "react-spring";
import Clock from "../../components/clock/Clock";

const Weather = ({ current, corona, error }) => {
  const { wind, weather, main, name, sys } = current;
  const fade = useSpring({ opacity: 1, top: 30, from: { opacity: 0, top: 0 } });
  const bgFade = useSpring({
    opacity: 1,
    scale: 1.3,
    from: { opacity: 0, scale: 0.5 },
  });
  const latestCoronaData = corona[corona.length - 1];
  const { Recovered, Deaths, Confirmed, Country } = latestCoronaData;

  const returnWeather = () => {
    if (main !== undefined) {
      return (
        <animated.div
          className="data background"
          style={
            (bgFade,
            Math.round(main.temp - 273) >= 10
              ? {
                  backgroundImage: `url(${imagsim})`,
                }
              : { backgroundImage: `url(${imagWin})` })
          }
        >
          <animated.div className="additional_data" style={fade}>
            <div className="wind">
              <span>
                <img
                  src="https://img.icons8.com/ios/24/000000/wind.png"
                  alt="windIcon"
                />
              </span>
              <span>{wind.speed}K.M.</span>
            </div>
            <Clock />
            <div className="humidity">
              <span>
                <img
                  src="https://img.icons8.com/wired/24/000000/hygrometer.png"
                  alt="hydrometer"
                />
              </span>
              <span>{main.humidity}</span>
            </div>
          </animated.div>
          <div className="weather_body">
            <animated.div className="temperature" style={fade}>
              {Math.round(main.temp - 273)}°<span>C</span>
            </animated.div>

            <div className="min_max">
              <span className="max fa fa-arrow-up">
                <span>{Math.round(main.temp_max - 273)}°c</span>
              </span>
              <span className="min fa fa-arrow-down">
                <span>{Math.round(main.temp_min - 273)}°c</span>
              </span>
            </div>
            <div className="city">
              {name},{sys.country}
            </div>
            <div className="weatherDes">
              {weather.map(({ main }) => {
                return main;
              })}
            </div>
            <div className="icon"></div>
          </div>
          <div className="corona_inf">
            {error ? (
              <marquee behavior="scroll" direction="left">
                {error}
              </marquee>
            ) : (
              <marquee
                behavior="scroll"
                direction="left"
                scrollamount="4"
                className="scrolling_text"
                // eslint-disable-next-line
              >
                In <strong>{Country}</strong> Total Death :{" "}
                <strong>{Deaths}</strong> , Confirmed:{" "}
                <strong>{Confirmed}</strong>, Recovered:{" "}
                <strong>{Recovered}</strong>
              </marquee>
            )}
          </div>
        </animated.div>
      ); // eslint-disable-next-line
    } else {
      return (
        <div>
          <h1>Accept The Location Permission Please</h1>
        </div>
      );
    }
  };

  return <>{returnWeather()}</>;
};

export default Weather;
