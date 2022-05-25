import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Player from './Player'
import Counter from './ScoreCounter';

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

  let teamData = {
    ct_score: gameState.ct_score,
    t_score: gameState.tscore,
    ct_name: "Counter-Terrorists",
    t_name: "Terrorists"
  }

  let isBombPlanted = gameState.bomb != undefined

  return (
    <div className="App">
      <div>
        <Counter teams={teamData} phase={gameState.phase}/>
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
