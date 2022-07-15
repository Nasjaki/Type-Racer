import getGames from "./getGames";


//game exists
async function gameExists(game_id) {

if (game_id > 0) {
    const json = await getGames();
    var i;
    for(i in json) {
        if(json[i] instanceof Object){
            if (json[i].id == game_id) {
                return true;
            }
        }
    }

    //doesnt exist
    return false;
} else {
    //Error
}
}

export default gameExists;