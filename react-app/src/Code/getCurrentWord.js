import getWord from "./getWord";

const url = "https://gruppe5.toni-barth.com/";

export default async function getCurrentWord() {

    var game_id = window.game_id; 
    let response= await fetch(url + "games/"+ game_id, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
        
    });
    
    
    let json = await response.json();

    var currId = json.currentWort;
    
    var curr_word = await getWord(currId);

    return curr_word;
}