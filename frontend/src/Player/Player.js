import './Player.css'
import HealthIcon from './health-icon.png'
import ArmorIcon from './armor-icon.png'

function get_weapon(weapon) {
  switch(weapon) {
    case 'weapon_usp_silencer':
      return 'USP'
    
    case 'weapon_deagle':
      return 'DEAGLE'

    default:
      return ''
  }
}

function Player(props) {
  let player = props.playerObject

  let health = player.player_status.health
  let armor = player.player_status.armor

  let direction = props.align == 'left' ? 'to-left' : 'to-right'
  let weapon_index = player.weapons.length == 2 ? 1 : 0
  weapon_index = player.weapons.length >= 3 ? 2 : 1
  


  let weapon_name

  if(player.weapons[weapon_index] != undefined) {
    let weapon = player.weapons[weapon_index]

    if(player.weapons[weapon_index + 1] != undefined) {
      if(weapon.name == 'weapon_c4') {
        weapon = player.weapons[weapon_index + 1]
      }
    }

    weapon_name = weapon.name
    weapon_name = weapon_name.replace(/weapon_/g, '')
    weapon_name = weapon_name.replace(/hk/g, '')
    weapon_name = weapon_name.toUpperCase()
  }

  function Healthbar() {
    let hpHeight = 15 
    if(props.align == 'left') {
      return (
        <div style={{
            width: `${health}%`,
            height: hpHeight,
            backgroundColor: props.color,
        }}/>
      ) 
    }
    else {
      return (
        <div style={{
            width: `${health}%`,
            marginLeft: `${100 - health}%`,
            height: hpHeight,
            backgroundColor: props.color,
        }}/>
      )
    }
  }    
  
  const height = 65

  let armorHud = player.player_status.armor > 0 ? ( <img src={ArmorIcon} width={20} height={20}/>) : null
 

  return (
    <div style={{width: 525, color: "white", height: height}} className="player">
        <div className={`flex ${direction}`}>

          <img src={"https://nadeko.bot/static/media/nadeko-top.ad6cc06a.png"} width={height} height={height}/>
          <div className='flex flex-down' style={{width: '100%'}}>
            <Healthbar/>

            <div className={`flex ${direction} inside-player`}>
              <span className={'game-variables'}>{player.name}</span>
              <span className={'game-variables'}>
                {health}
                <img src={HealthIcon} width={20} height={20}/>
                {armorHud}
              </span>
              
              
              
              <span className={'game-variables'}>
                {player.player_stats.kills}/{player.player_stats.deaths}/{player.player_stats.assists}
              </span>
              <span className={'game-variables money'}>${player.player_status.money}</span>
              <span className={'game-variables weapon'}>{weapon_name}</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export {
    Player as default
}