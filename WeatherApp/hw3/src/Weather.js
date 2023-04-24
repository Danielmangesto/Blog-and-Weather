import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || 'london',
            weather: {},
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = (cityName) => {
        const city = cityName || this.state.name;
        const WEATHER_API_KEY = '';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
        axios.get(url).then((res) => {
            console.log(res);
            if (res.status === 200) {
                const weather = res.data;
                this.setState({ name: city, weather });
            }
        });
    };

    setWeather = () => {
        const temp = this.state.weather.main.temp;
        return this.checktemp(temp);
    };

    checktemp = (temp) => {
        if (temp < 10) {
            return 'Freezing';
        }
        if (temp >= 10 && temp < 24) {
            return 'Cloudy';
        }
        if (temp >= 24) {
            return 'Sunny';
        }
    };

    render() {
        const { name, weather } = this.state;
        if (weather.main) {
            return (
                <>
                    <h1>City :{name} , Country: {weather.sys.country}</h1>
                    <div>Temperature is {weather.main.temp}</div>
                    <div>Feels like {weather.main.feels_like}</div>
                </>
            );
        }
        return <div>Loading...</div>;
    }
}

export default Weather;
