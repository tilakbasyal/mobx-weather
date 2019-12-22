import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { observer } from "mobx-react";

export default observer(
  class Chart extends Component {
      constructor(props) {
          super(props);
      }
      
    render() {
        console.log(this.props.store.temperature.$mobx.values, "chart")        
      return (
        <div>
          <Bar
            data={{labels :this.props.store.date.$mobx.values,
            datasets: [{
                label: 'Temprature',
                data:this.props.store.temperature.$mobx.values ,
                backgroundColor: [
                    '#085ef7','#085ef7','#085ef7','#085ef7','#085ef7','#085ef7','#085ef7','#085ef7'
                ]
            }]}}
            width={80}
            height={500}
            options={{ 
              title: {
                display: true,
                text: "Select a weather Card to see the Bar Chart",
                fontSize: 25
              },
              maintainAspectRatio: false,
              legend: {
                position: 'bottom'
              }
             }}
          />
        </div>
      );
    }
  }
);
