const url = "https://gruppe5.toni-barth.com/";

async function getGames() {

    let response= await fetch(url + "games/", {
        method: 'GET',
    });
    //console.log(response);
    
    let json = await response.json();
    
    return json;
}

export default getGames;