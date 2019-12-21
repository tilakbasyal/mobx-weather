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
// import './App.css';

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
    constructor(props){
      super(props);
      this.state = {
        start : 0,
        end : 3
      };
      this.handleNext = this.handleNext.bind(this);
      this.handlePrevious = this.handlePrevious.bind(this);
      }

    componentWillMount() {
      this.props.store.loadWeather();
    }
    handleNext=() =>{
      console.log(this.state, 'previous')

      this.setState({
        start : this.state.start + 1,
        end: this.state.end + 1
      })
    }
    handlePrevious=() =>{
      this.setState({
        start : this.state.start - 1,
        end: this.state.end - 1
      })
    }
    render() {
      const arrayLength = Object.keys(this.props.store.freshObject).length;
      const mapper = Object.keys(this.props.store.freshObject).slice(this.state.start, this.state.end);
      console.log(arrayLength, 'length')
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
                <Button 
                variant = "contained"
                color = "primary"
                onClick={this.handlePrevious}
                disabled = {this.state.start < 1 ? true : false}

                >Previous</Button>
                <Button 
                variant = "contained"
                color = "primary"

                onClick={this.handleNext}
                disabled = {this.state.end > 5  ? true : false}
                >Next</Button>
              </Grid>
              <Grid container spacing={2}>
                {/* <div> */}
                  {mapper.map(item => (
                    <Grid style={{minWidth:220}} item xs={12} md={4} key={item}>
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
                {/* </div> */}
              </Grid>
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
);
