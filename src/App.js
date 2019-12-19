import React, { Component } from "react";

import WeatherStore from "./WeatherStore";
import Weather from "./Weather";

class App extends Component {
  render() {
    return <Weather store={WeatherStore} />;
  }
}

export default App;
