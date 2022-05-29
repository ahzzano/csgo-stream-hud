import './Player.css'
import HealthIcon from './health-icon.png'
import ArmorIcon from './armor-icon.png'

function Player(props) {
  let player = props.playerObject

  let health = player.player_status.health
  let armor = player.player_status.armor

  let direction = props.align == 'left' ? 'to-left' : 'to-right'

  function Healthbar() {
    if(props.align == 'left') {
      return (
        <div style={{
            width: `${health}%`,
            height: 20,
            backgroundColor: props.color,
        }}/>
      ) 
    }
    else {
      return (
        <div style={{
            width: `${health}%`,
            marginLeft: `${100 - health}%`,
            height: 20,
            backgroundColor: props.color,
        }}/>
      )
    }
  }    
  
  return (
    <div style={{width: 450, color: "white", height: 60}} className="player">
        <div className={`flex ${direction}`}>

          <img src={"https://nadeko.bot/static/media/nadeko-top.ad6cc06a.png"} width={60} height={60}/>
          <div className='flex flex-down' style={{width: '100%'}}>
            <Healthbar/>

            <div className={`flex ${direction} inside-player`}>
              <span className={'game-variables'}>
                {health}
                <img src={HealthIcon} width={20} height={20}/>
              </span>
              <span className={'game-variables'}>
                {armor}
                <img src={ArmorIcon} width={20} height={20}/>
              </span>
              <span className={'game-variables'}>{player.name}</span>

              <span className={'game-variables money'}>${player.player_status.money}</span>
              <span className={'game-variables'}>
                {player.player_stats.kills}/{player.player_stats.deaths}/{player.player_stats.assists}
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}

export {
    Player as default
}