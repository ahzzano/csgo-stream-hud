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
    }, 5)
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
      <div style={{marginLeft: 50}}>
        {gameState.terrorists.map(player => <Player playerObject={player}/>) }
        <br/>
        {gameState.counterterrorists.map(player => <Player playerObject={player}/>) }
      </div>
    </div>
  );
}

export default App;
