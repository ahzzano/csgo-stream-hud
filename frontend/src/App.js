import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

function App() {
  const [gameState, setGameState] = useState()

  useEffect(() => {
    const interval = setInterval(async () => {
      let apiReq = await fetch('http://localhost:4000')
      let body = await apiReq.json()
      setGameState(body)

      console.log(body)
    }, 1000)
  }, [])

  console.log(gameState)

  return (
    <div className="App">
      CT: {gameState.ct_score}
      T: {gameState.tscore}
    </div>
  );
}

export default App;
