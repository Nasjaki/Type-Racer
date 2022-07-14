

import './App.css';
import getPlayers from './Code/getPlayers';
import getPlayerId from './Code/getPlayerId';
import playerExists from './Code/playerExists';

const url = "https://gruppe5.toni-barth.com/";

//delete all Players
async function deleteAllPlayers() {
    //gets the players
    let json = await getPlayers();

    var i;
    for(i in json){
        if(json[i] instanceof Object){
            //Schickt delete anfrage
            await fetch(url + "players/" + json[i].id, {
                method: 'DELETE',
            });

        }
    }

  
}

async function getPlayerInfo () {

    //Holt den eingegebenen Namen 
    var player_name = document.getElementById("text_player_info").value;
    //Holt die zugehörige ID
    var player_id = await getPlayerId(player_name);

    //Wenn der Spieler existiert
    if (await playerExists(player_name)) {

            let response = await fetch(url + "players/" + player_id, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                }
            });

            let json = await response.json();
            document.getElementById("text_player_info").value = "";
            console.log(json);

            return json;
    }
    
}

//Neuen Spieler erstellen
async function newPlayer() {

    //String aus Textbox holen
    var name_str = document.getElementById("text_name").value; 

    //Name länger als 2
    if (name_str.length > 2) {
        try {
            //Fetch Funktion um Namen auf URL hochzuladen
            let response = await fetch(url + "players/", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    "name" : name_str
                })
            });
            
            let json = await response.json();

            //Festlegen der globalen Variablen
            window.player_id = json.id;
            window.player_name = name_str;
            console.log("player created: " + name_str);
            
            //Textbox leeren
            document.getElementById("text_name").value = "";

            return json;
        } catch (ex) {
            console.error(ex);
        }
    } else {
        //"Exception"
        alert("Not a valid name");
    }

    
}


function Login() {

    return ( 
        <div className='LoginClass'>

            <h1>
                Login to Typeracer
            </h1>

            <div className="CreateAccount">
                <input id="text_name" type="text" placeholder="Name" maxLength={10}></input>
                <button onClick={newPlayer}> Create Account </button>
            </div>
            

            
            
            
            
        </div>

    );
    

}

export default Login;

//115 <button onClick={deleteAllPlayers}> Delete All Players </button> 