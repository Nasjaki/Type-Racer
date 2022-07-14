

const url = "https://gruppe5.toni-barth.com/";

//create
export default async function createGame() {
    
    var id = window.player_id;

    if (id !== 0) {
        let response= await fetch(url + "games/", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify ({
                "owner": id
            })

        });
        //console.log(response);
        console.log("Game Created");

        let json = await response.json();
        window.game_id = json.id;
        
        return true;
    } else {
        alert("Please Login before you create a Lobby");
        return false;
    }
}