import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

function create_state(tplayers, ctplayers, map, ctscore, tscore, round_state) {
    let state = {
        terrorists: tplayers,
        counterterrorists: ctplayers,
        map: map,
        ct_score: ctscore,
        tscore: tscore,
        round_state: round_state 
    }

    return state
}

function create_player(name, steamid, player_status, player_stats) {
    let player = {
        name: name,
        steamid: steamid,
        player_status: player_status,
        player_stats: player_stats
    }

    return player
}

function create_player_status(health, armor, has_helmet, money, weapon) {
    let status = {
        health: health,
        armor: armor,
        has_helmet: has_helmet,
        money: money,
        weapon: weapon
    }

    return status
}

function create_player_stats(kills, assists, deaths) {
    let stats = {
        kills: kills,
        deaths: deaths,
        assists: assists,
        kdr: kills / deaths
    }

    return stats
}

let global_state = undefined 

app.use(cors())
app.use(bodyParser.json())

app.post('/' , (req, res) => {
    let current_game_state = req.body
    
    let terrorists = []
    let counterterrorists = []

    // Check if in-game by checking if the map object exists
    if(current_game_state.map == undefined)
        return

    // Check map state and return if not competitive
    if(current_game_state.map.mode != 'competitive') 
        return; 

    // Get the players and add them to the state
    for(const [steamid, player] of Object.entries(current_game_state.allplayers)) {
        let player_status = create_player_status(player.state.health, player.state.armor, player.state.helmet, player.state.money, player.weapon)
        let player_stats = create_player_stats(player.match_stats.kills, player.match_stats.assists, player.match_stats.deaths)
        let player_object = create_player(player.name, steamid, player_status, player_stats)

        if(player.team == 'T') {
           terrorists.push(player_object) 
        }
        else {
            terrorists.push(player_object)
        }
    }

    // Get the current map
    let map = current_game_state.map.name

    // Get the CT and T side scores respectively
    let ct_score = current_game_state.map.team_ct.score
    let t_score = current_game_state.map.team_t.score

    // Get the current state of the round    
    let round_state = current_game_state.map.round_state

    // Create the new state and save it to the global state
    let new_state = create_state(terrorists, counterterrorists, map, ct_score, t_score, round_state)
    global_state = new_state

    console.log(global_state)
    res.send('hello')        
})

app.get('/', (req, res) => {
    res.json(global_state)
})

export {
    app as app
}