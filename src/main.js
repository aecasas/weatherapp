import Vue from 'vue'
import App from './App.vue'
import VueGeolocation from 'vue-browser-geolocation'
Vue.config.productionTip = false

Vue.use(VueGeolocation)

new Vue({
  render: h => h(App),
}).$mount('#app')




export default {
  name: 'App',
  components: {
   
  },
mounted(){

  
    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates
      console.log(coordinates)
    })

    
    fetch(`${this.url_base}weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&units=metric&APPID=${this.api_key}`)
    
    .then(res => {
      
      console.log(res)
      
      this.weather = res;
      return res.json();
    }).then(this.setResults);
  

},


  //weather api 
  data (){
    return {
      api_key: '8690c3d68f5af087d8daad88c04c4fcd',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      indicator: 'C',
      weather:{},
      coordinates:{
        lat: 0,
        lon: 0,
      }
    }
  },
  //fetch geolocation
  created(){


    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates
      console.log(coordinates)
    })

  },

  //testing pressing enter to fetch data


  methods: {


     toggle(){
     
      if (document.getElementById('converter').checked) {
          this.weather.main.temp =  this.weather.main.temp * 1.8 + 32
          this.indicator = "F"
          console.log(this.weather.main.temp + " F")


      return (this.weather.main.temp,this.indicator)
        } else {
          this.weather.main.temp = (this.weather.main.temp - 32) * 5 / 9
          this.indicator = "C"
          console.log(this.weather.main.temp + " C")
        }
      
    },

    getWeather(){


    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates
      console.log(coordinates)
    })

    
    fetch(`${this.url_base}weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lng}&units=metric&APPID=${this.api_key}`)
    
    .then(res => {
      
      console.log(res)
      return res.json();
    }).then(this.setResults);


    },


    setResults (results){
      this.weather = results;
      console.log(this.results)
    },




    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }

  }

}