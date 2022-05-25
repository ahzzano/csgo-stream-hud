import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'
import {create_player, create_player_stats, create_player_status, create_state, get_util_state} from './gamestate.js'
import { create_match } from './matchstate.js'
import path from 'path'
import {URL} from 'url'

const app = express()
const __dirname = new URL('.', import.meta.url).pathname

app.use(cors())
app.use(bodyParser.json())

let game_state = undefined 
let match_state = undefined
let last_update = 0

let team_a = undefined
let team_b = undefined

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../backend/views/'))

app.get('/controller', (req, res) => {
    res.render('index', {
        game_state: game_state,
        match_state: match_state
    })
})

app.post('/controller', (req, res) => {
    res.redirect('/controller')
})

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

        let position = player.position
        let player_object = create_player(player.name, steamid, player_status, player_stats, weapons, null, position)

        if(player.team == 'T') {
            terrorists.push(player_object) 
        }
        else {
            counterterrorists.push(player_object)
        }
    }

    if(team_a == undefined) {
        team_a = counterterrorists
    }
    else {
        if(!counterterrorists.includes(team_a[0]) || !terrorists.includes(team_a[0])) {
            team_a = counterterrorists
        }
    }

    if(team_b == undefined) {
        team_b = terrorists 
    }
    else {
        if(!counterterrorists.includes(team_b[0]) || !terrorists.includes(team_b[0])) {
            team_b = terrorists
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

    let phase = raw_game_state.phase_countdowns

    // Create the new state and save it to the global state
    let new_state = create_state(team_b, team_a, map, ct_score, t_score, round_state, ctside_util, tside_util, phase)
    
    game_state = new_state

    res.send('sent')
})

app.get('/', (req, res) => {
    res.json(game_state)
})

app.get('/match_state', (req, res) => {
    res.json(match_state)
})

export {
    app as app
}