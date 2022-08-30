import { useState  } from "react"
import { io } from "socket.io-client"
import rock from "../images/rock.png"
import paper from "../images/paper.jpg"
import scissors from "../images/scissors.png"
import { useHistory } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"





function Room() {
  const history = useHistory()
  console.log(history)
  function submitAction(action){
    //socket.emit('action', action)
  }

  const [ready, setReady] = useState(false)

  return (
    <div>
      {ready ? (
      <>
      <h1>Pick your action</h1>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("Rock")}><img src={rock} alt="Rock" width="100px" height="100px"/></button>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("Paper")}><img src={paper} alt="Paper" width="100px" height="100px"/></button>
      <button type="button" class="btn btn-primary btn-lg" onClick={() => submitAction("scissors")}><img src={scissors} alt="Scissors" width="100px" height="100px"/></button>
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
