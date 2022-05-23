
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

export {
    create_state,
    create_player, 
    create_player_status,
    create_player_stats
}