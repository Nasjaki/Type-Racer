
const url = "https://gruppe5.toni-barth.com/";


//Sets game running to true
export default async function startGame() {
    
    var game_id = window.game_id; 

    //TODO id = 0
    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify ({
            "playerId": window.player_id,
            "action" : "start"
        })

    });

    let json = await response.json();

    if (json.players.length === 1) {
        alert("You cant play alone... Sorry");
    }


    return json.running;
    
}