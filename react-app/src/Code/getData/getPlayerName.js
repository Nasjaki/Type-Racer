import getPlayers from "../getData/getPlayers";


//Get PlayerName by player id
async function getPlayerName(player_id) {

    let players = await getPlayers();

    var i;
    for(i in players) {
        if(players[i] instanceof Object){
            
            if (players[i].id == player_id) {
                return players[i].name;
            }
        }
    }
    console.log("Player not found");
    return -1;
    
}

export default getPlayerName;