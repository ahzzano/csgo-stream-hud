import './HighlightedPlayer.css'

function HighlightedPlayer(props) {
    let pfp = "https://64.media.tumblr.com/a8f05051320e58925e3cf0ae00d5e2a5/5ca7dde3beecc473-4b/s540x810/808484802630442374ea128e081dd598f361c7fd.pnj" 
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
                <img src={pfp} width={100} height={100} className={'pfp'}></img>
        </div>
    )
}

export default HighlightedPlayer;