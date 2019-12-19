import { runInAction, extendObservable, action } from "mobx";

export default extendObservable(this, {
  weather: [],
  loading: true,
  loadWeather: action(async() => {
    this.loading = true;
    const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Kathmandu&units=imperial&APPID=c7910a3f13b2a102322929da4f00d2ab&cnt=40');
    const json = await response.json();
    runInAction(() => {
      this.weather = json.list;
      this.loading = false;
      
      let dateArray = json.list.map(({dt_txt, main}) => {
        let slicedDateArray = dt_txt.slice(0,10);
        // let counts = [slicedDateArray]
        // console.log(slicedDateArray, 'slices')
        let newObj = {};
        newObj[slicedDateArray] = main.temp
        return newObj;
      })
      // .reduce((acc, val, index, array) => {
      //   acc[(Object.keys(val))] = acc[(Object.keys(val))] + Number(Object.values(val)) || Number(Object.values(val));
      //   console.log(index,(Object.keys(val)), "Acc and val")
      //   // console.log(String(Object.keys(val)),Number(Object.values(val)) , "Acc and val")
      //   return acc
      // },{})


      let reduced = dateArray.reduce((acc, val, index) => {

        acc[(Object.keys(val))] = acc[(Object.keys(val))] + Number(Object.values(val)) || Number(Object.values(val));
        // console.log(index,(Object.keys(val)[0]),(Object.values(val)[0]), "Acc and val")
        // console.log(String(Object.keys(val)),Number(Object.values(val)) , "Acc and val")
        return acc
      },{})

        console.log([...dateArray], "Acc and it")
    }); 
  }),


  convertCelcius: action(() => {
    // const {} = this.weather;
    // console.log('i am celcius')
  }
  )
});
