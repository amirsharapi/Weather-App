<template>
  <div class="custom h-14 bg-gradient-to-r from-purple-500 to-pink-500">
    <NuxtLink class="text-center" to="/">Basic</NuxtLink>
    <h1 class="text-center font-medium leading-tight text-5xl mt-0 mb-2 text-blue-700">Weather Forecast</h1>
    <!-- <button @click="retrieveLoaction">Get Current location</button> -->
    <!-- <p>Curent Location Latitude: {{ latitude }}</p>
    <p>Curent Location Longitude: {{ longitude }}</p> -->
    <p class="text-center">Current Location: {{ location }}</p>

    <button @click="fiveDaysForecast()">Five Days forecast</button>

    <!-- <div class="mt-10">
      <p class="text-center">Temperature: {{ temperature }} °C</p>
      <p class="text-center">Humidity: {{ humidity }} %</p>
      <p class="text-center">Weather: {{ description }}</p>
      <p class="text-center">Wind Speed: {{ wind }} m/s</p>
      <div class="flex justify-center">
          <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" >
      </div>  
    </div> -->

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AnotherTemplate',
  data() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      location: this.location,
    }
  },
  created() {
    let latitude
    let longitude
    const coordinates= []

    const success = (position) => {
      latitude = position.coords.latitude
      longitude = position.coords.longitude

      coordinates.push(latitude) 
      coordinates.push(longitude)

      getLocationName(coordinates)

      console.log(position)

      this.latitude = latitude
      this.longitude = longitude
    }

    const error = (err) => {
      console.log(err)
    }

    // This will open permission popup
    navigator.geolocation.getCurrentPosition(success, error)

    // call api to know location name
    async function getLocationName(coordinates) {
      const apikey = '32677ee19befecaf9ab388ff8a368c23'
      const latitude = coordinates[0]
      const longitude = coordinates[1]
      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apikey}`
      )
      const location = data[0].name
      console.log(location)
      // this.location = location
    }
  },
  methods: {
    async fiveDaysForecast() {
      const apikey = '32677ee19befecaf9ab388ff8a368c23'
      const lat = this.latitude
      const lon = this.longitude

      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`
      )
      console.log(data)
      console.log(data.list)
      // assign forecast data list
      const forecastData = data.list
      //  get first dt
      // console.log(data.list[0].dt)
      let unixtime = data.list[0].dt
      const items = []
      for(let i=0; i<forecastData.length; i+8){
        const item = {
            temperature: data.list[i].main.temp,
            // readable_date: data.list[i].dt_txt,
            // weather: data.list[i].weather[0].description,
            // icon: data.list[i].weather[0].icon,
            // humidity: data.list[i].main.humidity,
            // wind: data.list[i].wind.speed
          }
        items.push(item)
      }

      console.log(items)
          
      // let readable_date = data.list[0].dt_txt

      // const forecastItems = {
      //   temperature: data.list[0].main.temp,
      //   readable_date: data.list[0].dt_txt,
      //   description: data.list[0].weather[0].description,
      // }
      // console.log(forecastItems)

      // Option 2

      // const intervalInSeconds = 24 * 60 * 60

      // forecastData.forEach((item) => {
      //   console.log(unixtime)
      //   unixtime = unixtime + intervalInSeconds
      //   const index = Object.keys(forecastData).findIndex((key) => forecastData.dt === unixtime)
      //   console.log(index)
      // })

      // Option 3

      // const intervalInSeconds = 24 * 60 * 60
      // let total = 1

      // Object.entries(forecastData).forEach(([key, value]) => {
      //   console.log(unixtime)
      //   total = total + 1
      //   unixtime = unixtime + intervalInSeconds
      //   if (
      //     total < 5 &&
      //     Object.keys(forecastData).find((key) => forecastData.dt === unixtime)
      //   ) {
      //     console.log(forecastData.findIndex(unixtime))
      //   }
      // })

      // Option 1

      console.log('2nd', data.list[8].dt)

      let i = 0
      const dtList = []

      do {
        i = i + 1
        console.log(unixtime)
        const index = Object.keys(forecastData).findIndex(
          (key) => forecastData.dt === unixtime
        )
        console.log(index)
        dtList.push(unixtime)
        const intervalInSeconds = 24 * 60 * 60
        unixtime = unixtime + intervalInSeconds
      } while (i < 5)

      console.log(dtList)
    },
  },
}
</script>

<style></style>
