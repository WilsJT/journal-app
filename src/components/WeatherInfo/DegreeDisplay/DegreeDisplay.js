import React, {useState, useEffect} from "react"
import "./DegreeDisplay.css"

const DegreeDisplay = (props) => {

  const kToC = (deg) => {
    return (Math.round(deg - 273.15))
  }

  const kToF = (deg) => {
    return (Math.round(((deg - 273.15)*9/5)+32))
  }

  const convertC = () => {
    return ({
      temp: kToC(props.info.main.temp),
      feels: kToC(props.info.main.feels_like),
      min: kToC(props.info.main.temp_min),
      max: kToC(props.info.main.temp_max),
      desc: props.info.weather.description
    })
  }

  const convertF = () => {
    return ({
      temp: kToF(props.info.main.temp),
      feels: kToF(props.info.main.feels_like),
      min: kToF(props.info.main.temp_min),
      max: kToF(props.info.main.temp_max),
      desc: props.info.weather.description
    })
  }

  let celsius = convertC()
  let farenheit = convertF()
  const [degree, setDegree] = useState(celsius)
  const [measurement, setMeasurement] = useState('C')

  // Handle temperature conversions
  const handleClick = () => {
    if (measurement === 'C') {
      setDegree(farenheit)
      setMeasurement('F')
    } else {
      setDegree(celsius)
      setMeasurement('C')
    }
  }

  useEffect(() => {
    celsius = convertC()
    farenheit = convertF()
    if (measurement === 'C') {
      setDegree(celsius)
    } else {
      setDegree(farenheit)
    }
  }, [props])

  return (
    <div className={"degree-container"}>
      <div className={"temp"}>
        {degree.temp}
        <sup style={{fontSize: "25px"}}>
          <sup>o</sup>{measurement}|
          <button className={"button"} onClick={handleClick}>{measurement === 'C' ? 'F' : 'C'}</button>
        </sup>
      </div>
      <div>
        <div className={"feels"}>FEELS LIKE: {degree.feels}</div>
        HIGH: {degree.max}, LOW: {degree.min}
        <br/>
        {degree.desc.toUpperCase()}
      </div>
    </div>
  )
}

export default DegreeDisplay
