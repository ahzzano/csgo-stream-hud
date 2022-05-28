import './HighlightedPlayer.css'

function HighlightedPlayer(props) {
    return (
        <div className={'center'}>
           <div className={'focus'}>
                {props.player.name} 
            </div> 
        </div>
    )
}

export default HighlightedPlayer;