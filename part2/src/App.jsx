import {useState, useEffect} from "react"
import countriesAPI from './services/countries.jsx'
import weatherAPI from './services/weather.jsx'

const App = () => {
	const [search, setSearch] = useState('')
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState(null)

	useEffect(() => {
		countriesAPI.getAll().then(list => {
			setCountries(list)
		})
	},[])

	const handleSearchChange = (event) => {
		if (country) {
			setCountry(null)
		}
		setSearch(event.target.value)
	}

	return (
	<div>
		<CountriesForm search={search} handleSearchChange={handleSearchChange} />
		<Countries countries={countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))} setCountry={setCountry} country={country}/>
		</div>
	)
}

const Countries = (props) => {
	const [weather, setWeather] = useState(null)

	if (props.country) {
		return <CountryInfo country={props.country} setWeather={setWeather} weather={weather}/>
	}
	if (props.countries.length > 10) {
		return <div>Search query too broad</div>
	}
	if (props.countries.length === 1) {
		const country = props.countries[0]
		return <CountryInfo country={country} setWeather={setWeather} weather={weather}/>
	}
	if (weather) {
		setWeather(null)
	}
	return props.countries.map(country => <div>{country.name.common} <button onClick={() => props.setCountry(country)}>show</button></div>)
}

const CountryInfo = ({country, setWeather, weather}) => {
	if (weather) {
	return (
			<div>
				<h1>{country.name.common}</h1>
				<div>Capital {country.capital[0]}</div>
				<div>Area {country.area}</div>
				<h2>Languages</h2>
				<ul>
				{Object.values(country.languages).map(name => <li>{name}</li>)}
				</ul>
				<img src={country.flags.png}/>
				<h2>Weather in {country.name.common}</h2>
				<WeatherInfo weather={weather}/>
			</div>
	)
	}
	weatherAPI.getWeather(country.latlng[0], country.latlng[1]).then(result => setWeather(result))
	return (<div>Loading...</div>)
}

const WeatherInfo = ({weather}) => {
	return (
	<div>
			<div>Temperature {weather.main.feels_like} Celsius</div> 
			<img src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}/>
			<div>Wind {weather.wind.speed} m/s</div>
		</div>
	)
}

const CountriesForm = (props) => {
	return (
		<form>
			find countries <input value={props.search} onChange={props.handleSearchChange} />
		</form>
	)
}

export default App
