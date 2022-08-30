import { useState  } from "react"
import socket from "../socket.js"
import rock from "../images/rock.png"
import paper from "../images/paper.jpg"
import scissors from "../images/scissors.png"
import { useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"





function Room() {
  const history = useHistory()
  console.log(history)
  function submitAction(action){
    socket.emit('action', action, player, history.location.state)
  }

  const [ready, setReady] = useState(false)
  const [player, setPlayer] = useState("")

  socket.on('ready', () => {
    setReady(true)
  })

  socket.on('player1', () => {
    console.log("Set Client to Player 1")
    setPlayer("Player1")
  })

  socket.on('player2', () => {
    if(!player){
      console.log("Set Client to Player 2")
      setPlayer("Player2")
    }
  })

  socket.on('winner', action => {
    alert(action)
  })
  

  return (
    <div>
      {ready ? (
      <>
      <h1>Pick your action {player}</h1>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("Rock")}><img src={rock} alt="Rock" width="100px" height="100px"/></button>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("Paper")}><img src={paper} alt="Paper" width="100px" height="100px"/></button>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("Scissors")}><img src={scissors} alt="Scissors" width="100px" height="100px"/></button>
      </>)
     :
     (<>
      <h1>Waiting for player 2</h1>
     </>)
      }
     
    </div>
  );
}

export default Room;
