import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  const [weatherInfo, setWeatherInfo] = useState('');
  let [pending, setPending] = useState(false);
  let [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    console.log('Selected City: ', city);
    setPending(true);
    setError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7e4c8fb1dc78920ad3ab35f55d6a948&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          console.log(weatherData)
          setWeatherInfo(weatherData);
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  },[]);

  return (
    <section>
      <PickCity onSearch={handleCityChange} />
      { weatherInfo && !pending && !error && <WeatherSummary weather={weatherInfo} />}
      { pending && !error && <Loader/>}
      { error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;