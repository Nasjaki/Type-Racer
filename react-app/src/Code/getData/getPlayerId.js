import getPlayers from "../getData/getPlayers";


//Gets the player id by name
async function getPlayerId(player_name) {

    let players = await getPlayers();

    var i;
    for(i in players) {
        if(players[i] instanceof Object){
            if (players[i].name == player_name) {
                return players[i].id;
            }
        }
    }
    return -1;
}

export default getPlayerId;