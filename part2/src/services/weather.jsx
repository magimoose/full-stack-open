import axios from "axios"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const getWeather = (lat, lon) => {
	const api_key = import.meta.env.VITE_WEATHER_KEY
	console.log(api_key)
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  return request.then((response) => response.data)
}

export default {getWeather}
