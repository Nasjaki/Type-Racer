import gameExists from "./gameExists";


const url = "https://gruppe5.toni-barth.com/";

//join
export default async function joinGame() {

    var game_id = document.getElementById("input_game_id").value;
    

if (game_id !== "" && await gameExists(game_id) === true && window.player_id !== 0) {
    
    var player_id = window.player_id;
    //TODO game_id = 0, Game not found


    let response= await fetch(url + "games/"+game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify ({
            "playerId": player_id,
            "action": "join"
        })

    });

        console.log("Joined Game");
        //TODO if joined game then:
        window.game_id = game_id;

        let json = await response.json();
        console.log(json.players);

    return true;
} else {
    if (window.player_id === 0) {
        alert("Please Login before joining a game.");
    } else alert("Please Enter a valid Game ID");
    return false;
}

}