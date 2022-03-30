import React, {useState, useEffect, useRef} from "react"
import "./ToDo.css"

const ToDo = (props) => {

  const currDate = new Date().toLocaleDateString("en-CA").slice(0, 11)
  const [notes, setNotes] = useState(
    {
      text: []
    }
  )
  const [edit, setEdit] = useState(false)
  const [add, setAdd] = useState("")
  const [message, setMessage] = useState("Delete Past Notes")

  // Update when new date is selected
  useEffect(() => {
    setEdit(false)
    let storage = JSON.parse(localStorage.getItem(props.date))
    if (storage) {
      setNotes(storage)
    } else {
      setNotes({text: []})
    }
  }, [props, message])

  // Handle data storage
  useEffect(() => {
    // Load data from storage if data exists
    if (notes.text.length > 0) {
      localStorage.setItem(props.date, JSON.stringify(notes))
    } else {
      localStorage.removeItem(props.date)
    }
  }, [notes])

  const del = (note) => {
    setNotes({text: notes.text.filter(item => item !== note)})
  }

  // Handle edit and view pages
  const handleEdit = () => {
    if (notes.text.length > 0) {
      if (edit) {
        return(
          <div>{notes.text.map((note) =>
            <li key={note} className={"del-list"}>
              <div className={"individual-notes-del"}>
                <div className={"task"}>{note}</div>
                <button onClick={() => del(note)}>X</button>
              </div>
            </li>)}
          </div>)
      } else {
        return(
          <div>{notes.text.map((note) =>
            <li key={note} className="task">
              {note}
            </li>)}
          </div>)
      }
    } else {
      return(<div>Nothing planned for today!</div>)
    }
  }

  // Add text from textarea to notes
  const handleAdd = () => {
    let note = document.getElementById("add").value

    if (note.trim() == "") {
      document.getElementById("add").value = ""
      return
    }

    if (notes.text.includes(note)) {
      document.getElementById("add").value = "Already on list"
      setTimeout(() => {
        document.getElementById("add").value = ""
      }, 500)
    } else {
      let newNotes = notes.text
      newNotes.push(note)

      setNotes({text: newNotes})
      document.getElementById("add").value = ""
    }
  }

  // Clear text in textarea
  const clear = () => {
    document.getElementById("add").value = ""
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd()
      e.preventDefault()
    }
  }

  // Clear localStorage for past dates
  const deletePastDates = () => {
    let i = 0
    while (localStorage.key(i) != null) {
      if (localStorage.key(i) < currDate) {
        localStorage.removeItem(localStorage.key(i))
      } else {
        i += 1
      }
    }
    setMessage("Memeory Cleared")
    setTimeout(() => {
      setMessage("Delete Past Notes")
    }, 1000)
  }


  return (
    <div className={"todo-container"}>
      <div className={"header"}>{props.date}
        {edit ?
        <div>
          <button onClick={() => setEdit(false)}>Done</button>
        </div> :
        <div>
          <button onClick={() => setEdit(true)}>Edit</button>
          <button onClick={() => deletePastDates()}>{message}</button>
        </div>}
      </div>
      <div className="notes-container">
        {edit ?
        <div className={"add-area"}>
          <textarea id="add" type="text" defaultValue="" onKeyDown={(e) => handleKeyPress(e)}/>
          <div>
            <button onClick={() => clear()}>X</button>
            <button onClick={() => handleAdd()}>+</button>
          </div>
        </div>
        : null}
        {handleEdit()}
      </div>
    </div>
  )
}

export default ToDo
