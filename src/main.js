import axios from 'axios'
import './css/index.css'

const key = 'EEdaa5zsUkNWc9jSzSfBSn1mOqAYiZGG'

document.querySelector('#search-city').addEventListener('submit', (event) => {
  event.preventDefault()

  const location = document.querySelector('#location').value
  getCity(location)
  document.querySelector('#location').value = ''
})

function getCity (city) {
  axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}&language=pt-br`)
  .then(response => {
    const city = response.data[0]
    const locationKey = city.Key

    const cityName = document.querySelector('#city-name')
    cityName.innerHTML = `<h2>Clima em ${city.LocalizedName},</h2> <h3>${city.AdministrativeArea.LocalizedName}, ${city.Country.ID}</h3>`

    return locationKey
  })
  .then(locationKey => getWeather(locationKey))
  .catch(error => console.log(error))
} 

function getWeather(locationKey) {
  axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${key}&language=pt-br`)
  .then( response => {
    const cityWeather = response.data[0]
    const iconWeather = cityWeather.WeatherIcon

    const tempCity = document.querySelector('#temp')
    tempCity.innerHTML = `${parseInt(cityWeather.Temperature.Metric.Value)}  <sup>°C</sup>`

    const weatherConditionCity = document.querySelector('#weather-condition')
    weatherConditionCity.innerHTML = `${cityWeather.WeatherText} <img src="./public/${iconWeather}.svg" alt="Icone">`
  })
  .catch(error => console.log(error))
 }
