import './Player.css'

function Player(props) {
  let player = props.playerObject

  let health = player.player_status.health

  return (
    <div style={{width: 400, backgroundColor: "black", color: "white", height: 60, borderRadius: 5}}>
        <div className='flex'>

          <img src={"https://nadeko.bot/static/media/nadeko-top.ad6cc06a.png"} width={50} height={50}/>
          <div className='flex flex-down' style={{width: '100%'}}>

            <div style={{
                width: `${health}%`,
                height: 20,
                backgroundColor: "orange"
            }}>
            </div>
            <div className='flex'>
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