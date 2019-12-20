import { runInAction, extendObservable, action } from "mobx";

export default extendObservable(this, {
  weather: [],
  loading: true,
  dateObject: [],
  reducedObject: {},
  loadWeather: action(async() => {
    this.loading = true;
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&units=imperial&APPID=c7910a3f13b2a102322929da4f00d2ab&cnt=40');
    const json = await response.json();
    runInAction(() => {
      this.weather = json.list;
      this.loading = false;

      // let dateArray = json.list.map(({dt_txt}) => {
      //   let slicedDateArray = dt_txt.slice(0,10);
      //   // slicedDateArray.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map())
      //   return slicedDateArray;
      // })
      
      this.dateObject = json.list.map(({dt_txt, main}) => {
        let slicedDateArray = dt_txt.slice(0,10);
        let newObj = {};
        newObj[slicedDateArray] = main.temp
        return newObj;
      }).reduce((acc, val, index) => {
        acc[(Object.keys(val))] = acc[(Object.keys(val))] + Number(Object.values(val)) || Number(Object.values(val));
        return acc
      },{})
      
      // this.reducedObject = dateObject.reduce((acc, val, index) => {
      //   acc[(Object.keys(val))] = acc[(Object.keys(val))] + Number(Object.values(val)) || Number(Object.values(val));
      //   return acc
      // },{})

      // console.log(dateArray, "date array");
      // console.log(dateObject, "date Object");
      // console.log(reduced, "reduced");
    }); 
  }),


  convertCelcius: action(() => {
    // const {} = this.weather;
    // console.log('i am celcius')
  }
  )
});
