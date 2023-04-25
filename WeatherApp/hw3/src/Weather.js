import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: {},
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cityName !== this.props.cityName) {
            this.getWeather();
        }
    }

    getWeather = () => {
        const city = this.props.cityName || 'london';
        const WEATHER_API_KEY = '';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
        axios.get(url).then((res) => {
            console.log(res);
            if (res.status === 200) {
                const weather = res.data;
                this.setState({ weather });
            }
        });
    };

    checktemp = (temp) => {
        if (temp < 10) {
            return 'Freezing';
        }
        if (temp >= 10 && temp < 18) {
            return 'Cloudy';
        }
        if (temp >= 18) {
            return 'Sunny';
        }
    };

    render() {
        const { weather } = this.state;
        if (weather.main) {
            return (
                <>
                    <h1>City :{weather.name} , Country: {weather.sys.country}</h1>
                    <div>The temperature is {weather.main.temp}</div>
                    <div>But it feels like {weather.main.feels_like}</div>
                    <div>It's a {this.checktemp(weather.main.temp)} day</div>
                </>
            );
        }
        return <div>Loading...</div>;
    }
}

export default Weather;
