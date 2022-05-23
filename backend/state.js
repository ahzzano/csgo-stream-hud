
function create_state(tplayers, ctplayers, map, ctscore, tscore, round_state, ct_util, t_util) {
    let state = {
        terrorists: tplayers,
        counterterrorists: ctplayers,
        map: map,
        ct_score: ctscore,
        tscore: tscore,
        round_state: round_state,
        ct_util: ct_util,
        t_util: t_util
    }

    return state
}

function create_player(name, steamid, player_status, player_stats, weapons) {
    let player = {
        name: name,
        steamid: steamid,
        player_status: player_status,
        player_stats: player_stats,
        weapons: weapons
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

function create_util_state(grenade, smokes, flashes, molotovs) {
    let state = {
        grenade: grenade,
        smokes: smokes,
        flashes: flashes,
        molotovs: molotovs
    }

    return state
}

function create_player_stats(kills, assists, deaths) {
    let kdr = kills / deaths

    if(deaths == 0) {
        kdr = 0
    }

    let stats = {
        kills: kills,
        deaths: deaths,
        assists: assists,
        kdr: kdr
    }

    return stats
}

function get_util_state(players) {
    let number_of_flashes = 0
    let number_of_smokes = 0
    let number_of_molotovs = 0
    let number_of_grenades = 0

    for(const player of players) {
        let weapons = []

        for(const [slot, weapon] of Object.entries(player.weapons)){
            weapons.push(weapon)
        }

        weapons = weapons.filter((weapon) => weapon.type == 'Grenade')
        
        for(const weapon of weapons) {
            let lowercase_name = weapon.name.toLowerCase()
            if(lowercase_name.contains('flash'))
                number_of_flashes++
            
            if(lowercase_name.contains('smoke'))
                number_of_smokes++
            
            if(lowercase_name.contains('molotov') || lowercase_name.contains('inc'))
                number_of_molotovs++
            
            if(lowercase_name.contains('he'))
                number_of_grenades++
        }

    }

    return create_util_state(number_of_grenades, number_of_smokes, number_of_flashes, number_of_molotovs)
}

export {
    create_state,
    create_player, 
    create_player_status,
    create_player_stats,
    get_util_state
}