import gameExists from "./gameExists";

const url = "https://gruppe5.toni-barth.com/";

export default async function getGameInfo(game_id) {
    //TODO Test
    game_id = window.game_id;

    if (await gameExists(game_id)) {
        let response= await fetch(url + "games/"+game_id, {
            method: 'GET',
        });
    
        let json = await response.json();

        return json;
    } 
}