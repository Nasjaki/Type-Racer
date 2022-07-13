import getGames from "./getGames";


//game exists
async function gameExists(game_id) {
    const json = await getGames();
    var i;
    for(i in json) {
        if(json[i] instanceof Object){
            if (json[i].id == game_id) {
                return true;
            }
        }
    }
    return false;
}

export default gameExists;