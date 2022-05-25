import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Player from './Player'

function App() {
  const [gameState, setGameState] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://127.0.0.1:4000').then((response) => {
        response.json().then((body) => {
          setGameState(body)
        })
      })

      return () => {
        clearInterval(interval)
      }
    }, 100)
  }, []) 

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
      <div style={{marginLeft: 25}}>
        <div className={"lowerright player-list"}>
          {gameState.terrorists.map(player => <Player playerObject={player} color="orange" align="right"/>) }
        </div>
        <div className={"lowerleft player-list"}>
          {gameState.counterterrorists.map(player => <Player playerObject={player} color="lightblue" align="left"/>) }
        </div>
      </div>
    </div>
  );
}

export default App;
