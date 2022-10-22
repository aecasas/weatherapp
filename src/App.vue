<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
    <div class="search-box">
      <input type="text" 
      class="search-bar" 
      placeholder="Search..."
      v-model="query"
      @keypress="getWeather"
      />
    </div>

        <div class="location-box">
          <div class="location">{{ weather.name }}, {{  }}</div>
        <div class="date">Today</div>
      </div>
    <div class="weather-box">
      <div class="temp">weather.</div>
        <div class="weather">{{weather.name}}</div>
        <div class="coordinates">{{coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</div></div>

<p>please allow location services</p>
    <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
    <p>Please allow location services</p>
        <div class="location-box">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
        <div class="date">{{dateBuilder()}}</div>
      </div>
    <div class="weather-box">
      <div class="temp">{{ Math.round(weather.main.temp) }}°c </div>
        <div class="weather">{{weather.weather[0].main}}</div>
        <div class="coordinates">{{coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</div>
      <!-- Rounded switch -->

      <div class="slider-wrap">
<label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
</div>


    </div>
    </div>

    </main>
    <myLocation></myLocation>
  </div>
</template>

<script>

import myLocation from './components/myLocation'



export default {
  name: 'App',
  components: {
    myLocation
  },
  //weather api 
  data (){
    return {
      api_key: '8690c3d68f5af087d8daad88c04c4fcd',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather:{},
      coordinates:{
        lat: 0,
        long: 0
      }
    }
  },
  //fetch geolocation
  created(){

    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates
    })
    .catch(error => alert(error))
  },
  //testing pressing enter to fetch data
  methods: {

    getWeather(){


    this.$getLocation({})
    .then(coordinates => {
      this.coordinates = coordinates
    })

    
    fetch(`${this.url_base}weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&units=metric&APPID=${this.api_key}`)
    
        .then(res => {
          return res.json();
        }).then(this.setResults);



    },




/*     fetchWeather(e){
      if (e.key == "Enter") {
        //I need to be able to fetch the api using this: 
        
        //fetch(`${this.url_base}weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&units=metric&APPID=${this.api_key}`)
        fetch(`${this.url_base}weather?q=${this.query}}&units=metric&APPID=${this.api_key}`)
        .then(res => {
          return res.json();
        }).then(this.setResults);
      }
    },
 */
    setResults (results){
      this.weather = results;
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
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  font-family: 'monserrat', sans-serif;
}

#app{
  background-image: url('./assets/cold-weather.jpg');
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  
}

#app.warm{
  background-image: url('./assets/warm-weather.jpg');
}

main {
  min-height: 100vh;
  padding: 25px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}

.location-box .location{
  color:#FFFF;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}


.location-box .date{
  color:#FFF;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}

.weather-box{
  text-align: center;

}

.weather-box .temp{
  display: inline-block;
  padding: 10px 25px;
  color:#FFFF;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(255,255,255,0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;


  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}


.weather-box .weather{
  color:#FFF;
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
