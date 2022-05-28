import './HighlightedPlayer.css'
import HealthIcon from './health-icon.png'
import ArmorIcon from './armor-icon.png'

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
                        <span style={{
                            display:'flex',
                            gap: '7px'
                        }}>
                            <img src={HealthIcon} width={20} height={20}/>
                            {props.player.player_status.health}
                            <img src={ArmorIcon} width={20} height={20}/>
                            {props.player.player_status.armor}
                        </span> 
                        <span>
                            {props.player.name} 
                        </span>
                        <div className={'kda'}>
                            <span><b>K</b>: {props.player.player_stats.kills}</span>
                            <span><b>D</b>: {props.player.player_stats.deaths}</span>
                            <span><b>A</b>: {props.player.player_stats.assists}</span>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default HighlightedPlayer;