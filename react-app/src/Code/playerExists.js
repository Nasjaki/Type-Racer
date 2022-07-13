import getPlayerId from "./getPlayerId";

const url = "https://gruppe5.toni-barth.com/";

async function playerExists(player_name) {
    return (await getPlayerId(player_name) > 0);
}

export default playerExists;