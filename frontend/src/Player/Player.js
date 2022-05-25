import './Player.css'

function Player(props) {
  let player = props.playerObject

  let health = player.player_status.health

  let direction = props.align == 'left' ? 'to-left' : 'to-right'

  return (
    <div style={{width: 400, backgroundColor: "black", color: "white", height: 60, borderRadius: 15}}>
        <div className={`flex ${direction}`}>

          <img src={"https://nadeko.bot/static/media/nadeko-top.ad6cc06a.png"} width={60} height={60}/>
          <div className='flex flex-down' style={{width: '100%'}}>

            <div style={{
                width: `${health}%`,
                height: 20,
                backgroundColor: props.color
            }}>
            </div>
            <div className={`flex ${direction} inside-player`}>
              {player.name}
            </div>
          </div>
        </div>
    </div>
  )
}

export {
    Player as default
}