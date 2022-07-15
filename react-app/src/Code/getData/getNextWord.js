import getWord from "../getData/getWord";

const url = "https://gruppe5.toni-barth.com/";

export default async function getNextWord() {

    var game_id = window.game_id; 
    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "playerId" : window.player_id,
            "action" : "word"
        })
    });
    
    
    let json = await response.json();
                        //Deutsch plötzlich
    var currId = json.currentWort;
    
    var next_word = await getWord(currId);

    return next_word;
}