<template>
  <div id="app" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''">
    <main>
    <div class="search-box">
      <input type="text" 
      class="search-bar" 
      placeholder="Search..."
      @click="getWeather"
      
      />
    </div>

    <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
      <div class="weather-box">
      <div class="banner">
      <center><h2>Current Weather</h2></center>
      </div>

      <div class="location-box">
        <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
      <div class="date">{{dateBuilder()}}</div>
    </div>
    <div class="temp">{{ Math.round(weather.main.temp) }}°c </div>
    <div class="weather">{{weather.weather[0].main}} | {{weather.weather[0].description}} </div>
    <div class="humidity"> Humidity: {{weather.main.humidity}} </div>
    <div class="wind">{{weather.wind.speed}} M/S</div>
    <div class="sunrise">Sunrise: {{weather.sys.sunrise}}</div>
    <div class="sunset">Sunset: {{weather.sys.sunset}}</div>

      
    
       
      <!-- Rounded switch -->

      <div class="slider-wrap">
<label class="switch"  @click="toggle">
  <input type="checkbox">
  <span class="slider round"></span>
</label>
</div>


    </div>
    </div>
    
    </main>
  </div>
</template>

<script>



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


},


  //weather api 
  data (){
    return {
      api_key: '8690c3d68f5af087d8daad88c04c4fcd',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather:{},
      coordinates:{
        lat: 22,
        lon: -66,
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

  
    setTimeout(() => {  console.log(this.coordinates); }, 5000);
    
     
    fetch(`${this.url_base}weather?lat=${this.coordinates.lat}&lon=${this.coordinates.lon}&units=metric&APPID=${this.api_key}`)
    
    .then(res => {
      
      console.log(res)
      
      this.weather = res;
      return res.json();
    }).then(this.setResults);

  },

  //testing pressing enter to fetch data


  methods: {


     toggle(){
      
      console.log(this.weather.main.temp * 1.8 + 32)
      this.weather.main.temp = this.weather.main.temp * 1.8 + 32
      return (this.weather.main.temp)
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

.banner{
  text-align: center;
  color: #FFF;
  font-size: 40px;
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
