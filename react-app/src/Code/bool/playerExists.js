import getPlayerId from "../getData/getPlayerId";

const url = "https://gruppe5.toni-barth.com/";

//Player exists ?
async function playerExists(player_name) {
    return (await getPlayerId(player_name) > 0);
}

export default playerExists;