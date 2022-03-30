import React, {useState} from "react"
import Calendar from "react-calendar"
import ToDo from "./ToDo/ToDo"
import WeatherInfo from "./WeatherInfo/WeatherInfo"
import "./Calendar.css"
import "./App.css"

const App = () => {

  const currDate = new Date().toLocaleDateString("en-CA").slice(0, 11)
  const [date, setDate] = useState(<ToDo date={currDate} />)

  const onClickDay = (activeDate) => {
    setDate(<ToDo date={JSON.stringify(activeDate).substring(1,11)} />)
  }

  return (
    <div className={"app-container"}>
      <div className={"left"}>
        <WeatherInfo date={currDate}/>
      </div>

      <div className={"right"}>
        <Calendar onClickDay={onClickDay} />
        {date}
      </div>
    </div>

  )
}

export default App
