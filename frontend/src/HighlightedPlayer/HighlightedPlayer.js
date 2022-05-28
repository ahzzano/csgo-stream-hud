import './HighlightedPlayer.css'

function HighlightedPlayer(props) {
    return (
        <div className={'center'}>
           <div className={'focus flex flex-down'}>
                <div style={{
                    backgroundColor: '#505050',
                    width: `${props.player.player_status.health}%`,
                    height: 15,
                }}>
                </div>
                <div className={'flex inner-stats'}>
                    <span>
                        {props.player.player_status.health}
                    </span> 
                    <span>
                        {props.player.name} 
                    </span>
                </div>
            </div> 
        </div>
    )
}

export default HighlightedPlayer;