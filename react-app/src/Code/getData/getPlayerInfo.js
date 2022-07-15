const url = "https://gruppe5.toni-barth.com/";


//returns a json file with player info
export default async function getPlayerInfo(player_id = 0) {

    if (player_id !== 0) {
        let response= await fetch(url + "players/"+player_id, {
            method: 'GET',
        });
    
        let json = await response.json();
        
        return json;
    }
    
}
