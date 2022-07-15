const url = "https://gruppe5.toni-barth.com/";


//gets all active games
async function getGames() {

    try {
        let response= await fetch(url + "games/", {
            method: 'GET',
        });
        //console.log(response);
        
        let json = await response.json();
        
        return json;
    } catch (ex) {
        
        //console.log("No active games found");
        return false;
        
    }
}

export default getGames;