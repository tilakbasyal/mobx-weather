import { runInAction, extendObservable, action } from "mobx";

export default extendObservable(this, {
  weather: [],
  loading: true,
  freshObject: {},
  convertCelcius: null,
  convertFahrenheit: null,
  isFahrenheit: true,
  date: [],
  temperature: [],
  loadWeather: action(async () => {
    this.loading = true;
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&units=imperial&APPID=c7910a3f13b2a102322929da4f00d2ab&cnt=40"
    );
    const json = await response.json();
    runInAction(() => {
      this.weather = json.list;
      this.loading = false;
      let timeSegments = json.list
        .map(({ dt_txt }) => {
          let slicedDateArray = dt_txt.slice(0, 10);
          return slicedDateArray;
        })
        .reduce(
          (acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
          }),
          {}
        );

      let dates = json.list
        .map(({ dt_txt, main }) => {
          let slicedDateArray = dt_txt.slice(0, 10);
          let newObj = {};
          newObj[slicedDateArray] = main.temp;
          return newObj;
        })
        .reduce((acc, val, index) => {
          acc[Object.keys(val)] =
            acc[Object.keys(val)] + Number(Object.values(val)) ||
            Number(Object.values(val));
          return acc;
        }, {});
        
      this.freshObject = Object.assign(
        ...Object.keys(dates).map((v, i) => ({
          [v]: Object.values(dates)[i] / Object.values(timeSegments)[i]
        }))
      );

      this.convertCelcius = () => {
        this.isFahrenheit = false;
        this.freshObject = Object.assign(
          ...Object.keys(dates).map((v, i) => ({
            [v]:
              ((Number(
                Object.values(dates)[i] / Object.values(timeSegments)[i]
              ) -
                32) *
                5) /
              9
          }))
        );
      };
      this.convertFahrenheit = () => {
        this.isFahrenheit = true;
        this.freshObject = Object.assign(
          ...Object.keys(dates).map((v, i) => ({
            [v]: Object.values(dates)[i] / Object.values(timeSegments)[i]
          }))
        );
      };
    });
  }),
  displayChart: action((mapper, i) => {
      runInAction(() => {
        let dateAndTempArray = this.weather.map(({ dt_txt, main }) => {
          if(dt_txt.slice(0, 10) === mapper[i]) {
          let slicedDateArray = dt_txt.slice(11, 16);
          let newObj = {};
          newObj[slicedDateArray] = main.temp;
          return newObj;
          }
          return dateAndTempArray;
        })
        .filter(item => item !== undefined);
        this.date = Object.keys(Object.assign({}, ...dateAndTempArray));
        this.temperature = Object.values(Object.assign({}, ...dateAndTempArray));
        console.log(this.temperature, "display chart")
      })
    })
});
