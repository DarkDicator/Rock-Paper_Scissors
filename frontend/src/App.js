import socket from "./socket.js"
import { useState, useRef } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useHistory, Switch, Route } from "react-router-dom"
import Room from "./components/room.js"



//const socket = io('http://localhost:4000')



function App() {
  const [showButton, setShowButton] = useState(true)
  const [ready, setReady] = useState(false)
  const [room, setRoom] = useState("")
  const inputRef = useRef()
  const history = useHistory()
  

  const handleInputChange = event => {
    setRoom(event.target.value)
  }
  
  function submitAction(action){
    socket.emit('action', action, socket.id)
  }

  function createJoinRoom(){
    socket.emit('join-create', room, socket.id)
    setShowButton(false)
    history.push(room, room)
  }

  socket.on('join-game', () => {  
    alert("A player has joined")    
  })
  socket.on('game-start', () => {
    setReady(true)
  })


  return (
    <div className="App">
      {showButton && <>
        <input
        type="text"
        id="roomId"
        required
        value={room}
        onChange={handleInputChange}
        name="roomId"
       />
      <br/>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => createJoinRoom()}>Join or create Room</button>
      </>}      
     <Switch>
      <Route
        path="/:id"
        render={(props) => (
          <Room {...props} />
        )}
       />      
     </Switch>
    </div>
  );
}

export default App;
