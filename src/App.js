import React, { Component } from "react";

import WeatherStore from "./WeatherStore";
import Weather from "./Weather";

import styles from "./MainCss";
import { withStyles } from "@material-ui/core";


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appMainDiv}>
        <Weather store={WeatherStore} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
