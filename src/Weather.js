import React from "react";
import { observer } from "mobx-react";

export default observer(
  class People extends React.Component {
    componentWillMount() {
      this.props.store.loadWeather();
    }
    singleWeather = ({main, weather, dt_txt}) => 
      <div key={dt_txt}>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="face" />
        <p>Feels Like: {weather[0].main}</p>
        <p>Avg Temprature: {main.temp}</p>
        <p>Date: {dt_txt}</p>
        <hr/>

      </div>


    render() {
      console.log(this.props.store.weather, 'props')
      return (
        <div >
          <button 
          // onClick={this.props.store.loadPeople}
          onClick={this.props.store.convertCelcius}
          >Celcius</button>
          <button 
          // onClick={this.props.store.loadPeople}
          >Farenheiht</button>
          {this.props.store.loading? "Loading..." : this.props.store.weather.map(this.singleWeather)}
        </div>
      )
    }
  }
)