import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { observer } from "mobx-react";

export default observer(
  class Chart extends Component {      
    render() {
        // console.log(this.props.store.temperature.$mobx.values, "chart")        
      return (
        <div>
          <Bar
            data={{labels :this.props.store.date.$mobx.values,
            datasets: [{
                label: 'Temprature',
                data:this.props.store.temperature.$mobx.values ,
                backgroundColor: [
                    '#fe938c','#5a9367','#7a5c61','#88a0a8','#798071','#4c5c68 ','#1985a1 ','#f2c078'
                ]
            }]}}
            width={100}
            height={500}
            options={{ 
              title: {
                display: true,
                text: "Select a weather Card to see the Bar Chart",
                fontSize: 25
              },
              maintainAspectRatio: false,
              legend: {
                display: false,
                position: 'bottom'
              }
             }}
          />
        </div>
      );
    }
  }
);
