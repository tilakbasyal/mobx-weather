import React, { Component } from "react";

import WeatherStore from "./WeatherStore";
import Weather from "./Weather";

class App extends Component {
  render() {
    return (
      <div style={{marginTop: '60px'}}>
        <Weather store={WeatherStore} />
      </div>
    );
  }
}

export default App;
