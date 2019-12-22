import React from "react";
import { observer } from "mobx-react";
import {
  CircularProgress,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Typography,
  Button,
  Divider,
  withStyles,
  CardMedia,
  CardHeader,
  Card,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import clsx from "clsx";
import useStyles from "./RadioButtonStyles";
import Chart from "./Chart";
import WeatherStore from "./WeatherStore";
import styles from "./MainCss";
import Header from "./Header";
import weather from "./assets/weather.png";

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

export default withStyles(styles) (observer(
  class People extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        start: 0,
        end: 3,
        elemId: "",
        hover: false,
        chartShow: false
      };
      this.handleNext = this.handleNext.bind(this);
      this.handlePrevious = this.handlePrevious.bind(this);
      this.handleCardClick = this.handleCardClick.bind(this);
    }

    componentDidMount() {
      this.props.store.loadWeather();
    }
    handleCardClick = (mapper, i) => {
      this.setState({ ...this.state, elemId: i, hover: true, chartShow: true });
      this.props.store.displayChart(mapper, i);
    };
    handleMouseEnter = index => {
      this.setState({ ...this.state, elemId: index, hover: true });
    };

    handleMouseLeave = index => {
      this.setState({ ...this.state, elemId: "", hover: false });
    };
    handleNext = () => {
      this.setState({
        ...this.state,
        start: this.state.start + 1,
        end: this.state.end + 1
      });
    };
    handlePrevious = () => {
      this.setState({
        ...this.state,
        start: this.state.start - 1,
        end: this.state.end - 1
      });
    };
    render() {
      const mapper = Object.keys(this.props.store.freshObject).slice(
        this.state.start,
        this.state.end
      );
      const { start, end, hover, elemId } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          {this.props.store.loading ? (
            <div className={classes.circularProgress}>
              <CircularProgress />
            </div>
          ) : (
            <React.Fragment>
              <Header />
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel
                  component='legend'
                  className={classes.formLabel}
                  disabled
                >
                  Select Your Metric
                </FormLabel>
                <RadioGroup
                  defaultValue='farenheiht'
                  aria-label='temperature'
                  name='customized-radios'
                  className={classes.radioGroup}
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
              <Divider className={classes.divider} />
              <Grid
                container
                justify='space-between'
                className={classes.buttonGridContainer}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.handlePrevious}
                  disabled={start < 1 ? true : false}
                >
                  <ArrowBackIosIcon />
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.handleNext}
                  disabled={end > 5 ? true : false}
                >
                  <ArrowForwardIosIcon />
                </Button>
              </Grid>
              <Grid
                container
                justify='space-evenly'
                className={classes.weatherCardGridContainer}
              >
                {mapper.map((item, i) => {
                  return (
                    <Grid
                      className={classes.singleWeatherGrid}
                      item
                      xs={12}
                      md={4}
                      key={item}
                      onClick={() => this.handleCardClick(mapper, i)}
                    >
                      <Card
                        onMouseLeave={() => this.handleMouseLeave(i)}
                        onMouseEnter={() => this.handleMouseEnter(i)}
                        raised={hover && elemId === i}
                        className={classes.singleWeatherGridCard}
                      >
                        <CardHeader
                        classes={{
                          title: classes.cardHeaderTitle
                        }}
                        title="Kathmandu, Nepal"
                        />
                        <CardMedia
                          className={classes.media}
                          image={weather}
                          title="Weather Image"
                        />
                        <div className={classes.averageTempratureDiv}>
                          <Typography variant="body2">Average Temperature</Typography>
                          <Typography variant='h3'>
                            {Number(this.props.store.freshObject[item]).toFixed(
                              2
                            )}
                            {this.props.store.isFahrenheit ? <sup className={classes.superScript}>°F</sup> : <sup className={classes.superScript}>°C</sup>}
                          </Typography>
                        </div>
                        <CardHeader
                        classes={{
                          title: classes.cardHeaderTitle
                        }}
                        title={item}
                        />

                        {/* <Typography align="center" gutterBottom>
                          {item}
                        </Typography> */}
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              <div className={classes.chartContainer}>
                <Typography className={`${classes.formLabel} ${classes.opacity} ${classes.divider}`}>Select a weather Card to see the Bar Chart</Typography>
              <Chart store={WeatherStore} />
              </div>

              
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
));
