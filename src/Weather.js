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
  Button,
  Divider
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
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
    constructor(props) {
      super(props);
      this.state = {
        start: 0,
        end: 3,
        elemId: '',
        hover: false
      };
      this.handleNext = this.handleNext.bind(this);
      this.handlePrevious = this.handlePrevious.bind(this);
      this.handleCardClick = this.handleCardClick.bind(this);
    }

    componentDidMount() {
      this.props.store.loadWeather();
    }
    handleCardClick = (index) => {
      console.log(index, "isdie card")
    }
    handleMouseEnter = (index) => {
      // console.log(index, "index")
      this.setState({ ...this.state,elemId: index, hover: true });
    };
  
    handleMouseLeave = (index) => {
      this.setState({ ...this.state,elemId: '', hover: false });
    };
    handleNext = () => {
      // console.log(this.state, "previous");
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
      // const arrayLength = Object.keys(this.props.store.freshObject).length;
      const mapper = Object.keys(this.props.store.freshObject).slice(
        this.state.start,
        this.state.end
      );
      // console.log([...this.props.store.weather], "weather");
      const { start, end, hover, elemId } = this.state;
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
                <FormLabel component='legend' style={{width: '100%', textAlign:'center', fontSize:'2rem'}}>Select Your Metric</FormLabel>
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
              <Divider style={{ margin: '1rem 0'}} />
              <Grid
                container
                justify='space-between'
                style={{ marginBottom: "16px" }}
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
              <Grid container spacing={2} justify="space-evenly">
                {/* <div> */}
                {mapper.map((item,i) => (
                  <Grid
                    style={{ maxWidth: '320px' }}
                    item
                    xs={12}
                    md={4}
                    key={item}
                    onClick={(i) => this.handleCardClick(i)}
                  >
                    <Card 
                    onMouseLeave={() => this.handleMouseLeave(i)}
                    onMouseEnter={() => this.handleMouseEnter(i)}
                    raised={hover && elemId === i}
                    style={{padding: '16px'}}
                    >
                      <Typography>
                        Date :<br /> {item}
                      </Typography>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography>Average Temprature:</Typography>
                        <Typography variant='h3'>
                          {Number(this.props.store.freshObject[item]).toFixed(2)}
                          {this.props.store.isFahrenheit ? "°F" : "°C"}
                        </Typography>
                      </div>
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
