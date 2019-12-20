import React from "react";
import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import clsx from "clsx";
import useStyles from './styles'


function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default observer(
  class People extends React.Component {
    componentWillMount() {
      this.props.store.loadWeather();
    }
    render() {
      return (
        <React.Fragment>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Select Your Metric</FormLabel>
            <RadioGroup
              defaultValue='farenheiht'
              aria-label='temperature'
              name='customized-radios'
            >
              <FormControlLabel
                value='farenheiht'
                control={<StyledRadio />}
                label='Farenheiht'
                onClick={this.props.store.convertFahrenheit}
              />
              <FormControlLabel
                value='celcius'
                control={<StyledRadio />}
                label='Celcius'
                onClick={this.props.store.convertCelcius}
              />
            </RadioGroup>
          </FormControl>
          {/* <button onClick={this.props.store.convertCelcius}>Celcius</button>
          <button onClick={this.props.store.convertFahrenheit}>
            Farenheiht
          </button> */}
          <div>
            {this.props.store.loading ? (
              <CircularProgress />
            ) : (
              Object.keys(this.props.store.freshObject).map(item => (
                <Card key={item} style={{ margin: "16px", padding: "8px" }}>
                  <p>Date : {item}</p>
                  <p>
                    Average Temprature:{" "}
                    {Number(this.props.store.freshObject[item]).toFixed(2)}
                    {this.props.store.isFahrenheit ? "°F" : "°C"}
                  </p>
                </Card>
              ))
            )}
          </div>
        </React.Fragment>
      );
    }
  }
);
