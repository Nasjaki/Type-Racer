import getPlayerId from "./getPlayerId";

const url = "https://gruppe5.toni-barth.com/";


//Neuen Spieler erstellen
export default async function newPlayer() {

    //String aus Textbox holen
    var name_str = document.getElementById("text_name").value; 

    var name_free = await getPlayerId(name_str) === -1;
    console.log(name_free);

    //Name länger als 2 und Name noch nicht vorhanden
    if (name_str.length > 2 && name_free) {
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

            

            return true;
        } catch (ex) {
            console.error(ex);
        }
    } else {
        //"Exception"
        if (name_free === false) {
            alert("Name already taken");
        } else {
            alert("Not a valid name");
        }
        document.getElementById("text_name").value = "";
        return false;
    }

    
}
