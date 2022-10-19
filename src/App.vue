<template>
  <div id="app">
    <main>
    <div class="searchbox">
      <input type="text" class="search-bar" placeholder="Search..."/>
    </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
    return {
      api_key: '8690c3d68f5af087d8daad88c04c4fcd'
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
  background-image: url('./assests/cold-weather.png');

}
</style>
