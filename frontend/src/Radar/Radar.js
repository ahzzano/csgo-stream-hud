import NukeUpper from './assets/de_nuke_upper.png'

const WIDTH = 400
const HEIGT = 400

function Radar(props) {
    let player = props.counterterrorists[0]
    let position = player.position.split(', ')
    let floatPositions = []
    let orthogonalPosition = []
    let radarPosition = []

    for(const i of position) {
        let val = parseFloat(i)
        floatPositions.push(val)
    }

    let magnitude = Math.sqrt(Math.pow(floatPositions[0], 2) + Math.pow(floatPositions[1], 2), + Math.pow(floatPositions[2])) 
    

    for(const i of floatPositions) {
        let orthogonal = i / magnitude
        orthogonalPosition.push(orthogonal)
    }

    let rx = orthogonalPosition[0] 
    let ry =  orthogonalPosition[1] 

    radarPosition = [rx, ry]

    console.log(radarPosition)

    return (
    <div style={{
        width: WIDTH,
        height: 400,
        top: 25,
        backgroundImage: `url(${NukeUpper})` ,
        backgroundSize: 'cover',
        left: 25,
        position: 'absolute'
    }}>
        <div style={{position: 'absolute', backgroundColor: '#FFFFFF', zIndex: 2, transform: `translate(${rx}%, ${ry}%)`}}>
            {player.name} 
        </div>
    </div>
    )
}

export default Radar