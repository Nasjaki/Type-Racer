import gameExists from "./bool/gameExists";

const url = "https://gruppe5.toni-barth.com/";


//stops a game
export default async function stopGame() {
    
    var game_id = window.game_id; 

    if (await gameExists(game_id) === true) {
        let response= await fetch(url + "games/"+ game_id, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify ({
                "playerId": window.player_id,
                "action" : "end"
            })

        });

        let json = await response.json();



        return json.running;
    } else {
        return false;
    }
    
}