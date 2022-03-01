<template>
  <div class="custom h-14 bg-gradient-to-r from-purple-500 to-pink-500">
    <h1
      class="text-center font-medium leading-tight text-5xl mt-0 mb-2 text-blue-700"
    >
      Weather App
    </h1>

    <h4
      class="text-center text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight"
    >
      Current weather
    </h4>

    <div class="flex justify-center">
      <select
        v-model="selected"
        class="dropdown-toggle content-center px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap text-center"
        @change="search($event)"
      >
        <option value="Kuala Lumpur">Kuala Lumpur</option>
        <option value="Putrajaya">Putrajaya</option>
        <option value="Klang">Klang</option>
        <option value="Ipoh">Ipoh</option>
        <option value="Butterworth">Butterworth</option>
        <option value="Johor Bahru">Johor Bahru</option>
        <option value="George Town">George Town</option>
        <option value="Petaling Jaya">Petaling Jaya</option>
        <option value="Kuantan">Kuantan</option>
        <option value="Shah Alam">Shah Alam</option>
        <option value="Kota Bharu">Kota Bharu</option>
        <option value="Kota Kinabalu">Kota Kinabalu</option>
        <option value="Seremban">Seremban</option>
        <option value="Sandakan">Sandakan</option>
        <option value="Sungai Petani">Sungai Petani</option>
        <option value="Kuching">Kuching</option>
        <option value="Kuala Terengganu">Kuala Terengganu</option>
        <option value="Alor Setar">Alor Setar</option>
        <option value="Kangar">Kangar</option>
        <option value="Labuan">Labuan</option>
        <option value="Pasir Mas">Pasir Mas</option>
        <option value="Tumpat">Tumpat</option>
        <option value="Ketereh">Ketereh</option>
        <option value="Melaka">Melaka</option>
        <option value="Langkawi">Langkawi</option>
        <option value="Taiping">Taiping</option>
        <option value="Putrajaya">Putrajaya</option>
        <option value="Kuala Kangsar">Kuala Kangsar</option>
        <option value="Kuching">Kuching</option>
        <option value="Sibu">Sibu</option>
      </select>
    </div>

    <div class="mt-10">
      <p class="text-center">Temperature: {{ temperature }} °C</p>
      <p class="text-center">Humidity: {{ humidity }} %</p>
      <p class="text-center">Weather: {{ description }}</p>
      <p class="text-center">Wind Speed: {{ wind }} m/s</p>
      <div class="flex justify-center">
          <img :src="`https://openweathermap.org/img/wn/${icon}@2x.png`" >
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TestTemplate',
  data() {
    return {
      city: this.city,
      temperature: this.temperature,
      humidity: this.humidity,
      description: this.description,
      wind: this.wind,
      icon: this.icon,
      selected: 'Kuala Lumpur',
    }
  },
  methods: {
    async search(event) {
      // console.info('START')
      const location = event.target.value
      const apikey = '32677ee19befecaf9ab388ff8a368c23'

      const { data } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apikey}`
      )

      const lat = data[0].lat
      const lon = data[0].lon

      const items = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
      )

      console.info(items.data)
      const temperature = (items.data.main.temp - 273.15).toFixed(0)
      // const temperature = items.data.main.temp
      const humidity = items.data.main.humidity
      const rawDescription = items.data.weather[0].description
      const wind = items.data.wind.speed
      const icon = items.data.weather[0].icon
      const item = rawDescription.split(' ')

      // loop through each element of the array and capitalize the first letter.

      for (let i = 0; i < item.length; i++) {
        item[i] = item[i].charAt(0).toUpperCase() + item[i].slice(1)
      }
      // Join all the elements of the array back into a string
      // using a blankspace as a separator
      const description = item.join(' ')

      console.info(temperature + ' °C')
      console.info(humidity + '  % humidity')
      console.info(description)

      this.temperature = temperature
      this.humidity = humidity
      this.description = description
      this.wind = wind
      this.icon = icon
    },
  },
}
</script>

<style>
h1 {
  padding: 0.5em;
}

.block,
li {
  border: 2px solid blue;
  padding: 0.5em;
}

ul {
  display: flex;
  list-style: none;
}
</style>
