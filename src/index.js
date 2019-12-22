import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import WeatherStore from "./WeatherStore";


ReactDOM.render(
  <Provider>
    <App store={WeatherStore} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
