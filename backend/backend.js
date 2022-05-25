import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'
import {create_player, create_player_stats, create_player_status, create_state, get_util_state} from './state.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())

let global_state = undefined 
let last_update = 0

app.post('/' , (req, res) => {
    if(last_update == 0) {
        last_update = Date.now()
        console.log('state updating for the first time')
    }
    else {
        let now = Date.now()
        let ms_since_last_update = now - last_update
        console.log(`state updating [${ms_since_last_update / 1000}s]`) 

        last_update = now
    }

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
        
        let weapons = []
        for(const[weapon_slot, weapon] of Object.entries(player.weapons)) {
            let name = weapon.name
            let type = weapon.type

            let weapon_object = {
                name: name,
                type: type
            }

            weapons.push(weapon_object)
        }

        let player_object = create_player(player.name, steamid, player_status, player_stats, weapons)

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

    // Get the state of util for each team
    let tside_util = get_util_state(terrorists)
    let ctside_util = get_util_state(counterterrorists)

    // Create the new state and save it to the global state
    let new_state = create_state(terrorists, counterterrorists, map, ct_score, t_score, round_state, ctside_util, tside_util)

    global_state = new_state

    res.send('sent')
})

app.get('/', (req, res) => {
    res.json(global_state)
})

export {
    app as app
}