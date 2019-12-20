import React from "react";
import { observer } from "mobx-react";

export default observer(
  class People extends React.Component {
    componentWillMount() {
      this.props.store.loadWeather();
    }
    // singleWeather = ({date, temp}) =>
    //   <div key={temp}>
    //     {/* <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="face" /> */}
    //     {/* <p>Feels Like: {weather[0].main}</p> */}
    //     <p>Avg Temprature: {temp}</p>
    //     <p>Date: {date}</p>
    //     <hr/>

    //   </div>

    render() {
      console.log(Object.keys(this.props.store.dateObject), "props");
      return (
        <div>
          <button
            // onClick={this.props.store.loadPeople}
            onClick={this.props.store.convertCelcius}
          >
            Celcius
          </button>
          <button
          // onClick={this.props.store.loadPeople}
          >
            Farenheiht
          </button>
          {/* {this.props.store.loading? "Loading..." : this.props.store.weather.map(this.singleWeather)} */}
          {this.props.store.loading
            ? "Loading..."
            : Object.keys(this.props.store.dateObject).map(item => (
                <div key={item}>
                  <p>Date : {item}</p>
                  <p>Average Temprature: {this.props.store.dateObject[item]}</p>
                  <hr />
                </div>
              ))}
        </div>
      );
    }
  }
);
