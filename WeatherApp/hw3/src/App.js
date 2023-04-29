import React from 'react';
import Weather from './Weather';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            city: 'london',
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ city: this.state.searchQuery });
    };

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
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
                <Weather cityName={this.state.city} />
            </div>
        );
    }
}

export default App;
