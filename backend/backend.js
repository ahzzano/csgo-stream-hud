import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'
import {create_player, create_player_stats, create_player_status, create_state} from './state.js'

const app = express()


let global_state = undefined 

app.use(cors())
app.use(bodyParser.json())

app.post('/' , (req, res) => {
    let raw_game_state = req.body
    
    let terrorists = []
    let counterterrorists = []

    // Check if in-game by checking if the map object exists
    if(raw_game_state.map == undefined)
        return

    // Check map state and return if not competitive
    if(raw_game_state.map.mode != 'competitive') 
        return; 

    // Get the players and add them to the state
    for(const [steamid, player] of Object.entries(raw_game_state.allplayers)) {
        let player_status = create_player_status(player.state.health, player.state.armor, player.state.helmet, player.state.money, player.weapon)
        let player_stats = create_player_stats(player.match_stats.kills, player.match_stats.assists, player.match_stats.deaths)
        let player_object = create_player(player.name, steamid, player_status, player_stats)

        if(player.team == 'T') {
            terrorists.push(player_object) 
        }
        else {
            counterterrorists.push(player_object)
        }
    }

    // Get the current map
    let map = raw_game_state.map.name

    // Get the CT and T side scores respectively
    let ct_score = raw_game_state.map.team_ct.score
    let t_score = raw_game_state.map.team_t.score

    // Get the current state of the round    
    let round_state = raw_game_state.round

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