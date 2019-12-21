import React from "react";
import { observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import useStyles from "./styles";

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color='default'
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
          {this.props.store.loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <React.Fragment>
              <FormControl component='fieldset' style={{ width: "100%" }}>
                <FormLabel component='legend'>Select Your Metric</FormLabel>
                <RadioGroup
                  defaultValue='farenheiht'
                  aria-label='temperature'
                  name='customized-radios'
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
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
              <Grid container justify="space-between" style={{marginBottom: '16px'}}>
                <Button>Next</Button>
                <Button>Previous</Button>
              </Grid>
              <Grid container spacing={2}>
                {Object.keys(this.props.store.freshObject).map(item => (
                  <Grid item xs={12} md={4} key={item}>
                    <Card>
                      <Typography>
                        Date :<br /> {item}
                      </Typography>
                      <Typography>
                        Average Temprature: <br />
                        {Number(this.props.store.freshObject[item]).toFixed(2)}
                        {this.props.store.isFahrenheit ? "°F" : "°C"}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
);
