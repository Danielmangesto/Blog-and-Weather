import React from 'react';
import Weather from './Weather';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        };
    }

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.weatherComponent.getWeather(this.state.searchQuery);
    };

    render() {
        return (
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="search">Search:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={this.state.searchQuery}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Go</button>
                </form>
                <Weather
                    ref={(weatherComponent) => {
                        this.weatherComponent = weatherComponent;
                    }}
                />
            </div>
        );
    }
}

export default App;