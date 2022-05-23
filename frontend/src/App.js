import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Player from './Player'

function App() {
  const [gameState, setGameState] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:4000').then((response) => {
        response.json().then((body) => {
          setGameState(body)
        })
      })
    }, 5)
  }, []) 

  //let player = {"name":"Ridgway","steamid":"76561197960265731","player_status":{"health":100,"armor":0,"has_helmet":false,"money":800},"player_stats":{"kills":0,"deaths":0,"assists":0,"kdr":0},"weapons":[{"name":"weapon_knife","type":"Knife"},{"name":"weapon_hkp2000","type":"Pistol"}]}
  
  console.log(gameState)

  if(gameState === undefined) {
    return (
      <div>
        Hello
      </div>
    )
  }

  return (
    <div className="App">
      <div>
        Hello
      </div>
      <div style={{marginLeft: 50}}>
        {gameState.terrorists.map(player => <Player playerObject={player}/>) }
        <br/>
        {gameState.counterterrorists.map(player => <Player playerObject={player}/>) }
      </div>
    </div>
  );
}

export default App;
