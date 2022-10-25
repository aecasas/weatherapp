<template>
  
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
    
      <div class="search-box">
      <input type="button" 
      class="search-bar" 
      placeholder="Search..."
      @click="getWeather"
      />
    </div>

    <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
      <div class="weather-box">
      <div class="banner">
      <div class="current-weather"><h2>Current Weather</h2></div>
      </div>
      <div class="location-box">
        <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
      <div class="date">{{dateBuilder()}}</div>
    </div>
    <div class="temp">{{ Math.round(weather.main.temp) }} °{{indicator}} </div>
    <div class="weather">{{weather.weather[0].main}} | {{weather.weather[0].description}} </div>


      <!-- Rounded switch -->
      
      <div class="slider-wrap">        
        <label class="switch"  >
          <input id="converter" type="checkbox" @click="toggle">
          <span class="slider round"></span>
        </label>
        </div>


<!-- Separate Divs for details-->
<div class="weather-details">
<div id='parent_div_1'>
  <div class ='child_div_2'>Humidity</div>
  <div class ='child_div_2'>Wind</div>
  <div class ='child_div_2'>sunrise        </div>
  <div class ='child_div_2'>sunset</div>
  </div>

  <div id='parent_div_2'>
  <div class ='child_div_2'>
    <div class="humidity">{{weather.main.humidity}} </div>
  </div>

  <div class ='child_div_2'>
    <div class="wind"> {{weather.wind.speed}} M/S</div>
  </div>


  <div class ='child_div_2'>
    <div class="sunrise">{{weather.sys.sunrise}}</div>
  </div>

  <div class ='child_div_2'>
    <div class="sunset">{{weather.sys.sunset}}</div>
  </div>


  </div>
</div>
    

      
    </div>
    </div>
    
    </main>
  </div>
</template>

<script>
import "@/assets/style.css";

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

    this.weather.sys.sunrise = new Date(this.weather.sys.sunrise*1000)
    console.log(this.weather.sys.sunrise)
    this.weather.sys.sunset = new Date(this.weather.sys.sunset*1000)
    console.log(this.weather.sys.sunset)
    return this.weather.sys.sunrise,this.weather.sys.sunset
    },




    setResults (results){
    this.weather = results;
    console.log(this.results)

    //Sunrise Sunset conversion
    
    this.weather.sys.sunrise = new Date(this.weather.sys.sunrise*1000).toLocaleTimeString();
    console.log(this.weather.sys.sunrise)

    this.weather.sys.sunset = new Date(this.weather.sys.sunset*1000).toLocaleTimeString();
    console.log(this.weather.sys.sunset)

    return this.weather.sys.sunrise,this.weather.sys.sunset
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
    },


  

  }

}
</script>
@import './style.css';
<style>


</style>
