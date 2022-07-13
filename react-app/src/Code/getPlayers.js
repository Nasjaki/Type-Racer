
const url = "https://gruppe5.toni-barth.com/";

async function getPlayers() {

    let response = await fetch(url + "players/", {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });

    let json = await response.json();

    return json;
}

export default getPlayers;