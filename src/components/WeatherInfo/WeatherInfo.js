import React, {useState, useEffect} from "react"
import DegreeDisplay from "./DegreeDisplay/DegreeDisplay"
import "./WeatherInfo.css"

const WeatherInfo = (props) => {

  const [city, setCity] = useState("La Jolla")
  const [prev, setPrev] = useState("La Jolla")
  const [name, setName] = useState(city.toUpperCase())
  const [icon, setIcon] = useState("https://openweathermap.org/img/wn/10d@2x.png")
  const [deg, setDeg] = useState(false)
  const [info, setInfo] = useState(false)
  const key = process.env.REACT_APP_API_KEY

  // Handle fetch from openweathermap api
  const handleFetch = (data) => {
    setTimeout(() => {
      if (Object.keys(data).length == 2) {
        setCity(prev)
        setName("INVALID CITY, TRY AGAIN")
      } else {
        let info = {
          name: data.name,
          main: data.main,
          weather: data.weather[0],
          wind: data.wind
        }

        setTimeout(() => {
          setInfo(info)
          setIcon(`https://openweathermap.org/img/wn/${info.weather.icon}@2x.png`)
          setDeg(<DegreeDisplay info={info}/>)
          setName(city.toUpperCase())
        }, 500)
      }
    }, 250)
  }

  // Display additional info
  const displayInfo = () => {
    return (
      <div className={"info"}>
        <div className={"location"}>
          {name}
        </div>
        WIND: {info.wind.speed}m/s, {info.wind.deg}<sup>o</sup>
        <br/>
        HUMIDITY: {info.main.humidity}%
        <br/>
        PRESSURE: {info.main.pressure}hPa
      </div>
    )
  }

  const search = () => {
    setPrev(city)
    setCity(document.getElementById("search").value)
    document.getElementById("search").value = ""
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search()
      e.preventDefault()
    }
  }

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      .then(response => response.json())
      .then(data => {
        handleFetch(data)
        console.log(data)
      })
  }, [city])

  // View loading screen until data is read
  if (!deg || !info) {
    return (
      <div className={"info-container"}>
        <div className={"loading"}>
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className={"info-container"}>
      <div className={"img-deg"}>
        <div>
          <img src={icon} className={"weather-image"} alt="sun" />
        </div>
        {deg}
      </div>
      <div className={"location-info"}>
        <div className={"search-bar"}>
          <input id="search" type={"text"} onKeyDown={(e) => handleKeyPress(e)} />
          <button onClick={() => search()}>SEARCH</button>
        </div>
        <div>
          {displayInfo()}
        </div>
      </div>
    </div>
  )
}

export default WeatherInfo
