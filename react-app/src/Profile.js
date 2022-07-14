import getPlayerId from "./Code/getPlayerId";
import playerExists from "./Code/playerExists";

const url = "https://gruppe5.toni-barth.com/";

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

function Profile() {

    return ( 
        <div className='ProfileClass'>

            <h1>
                Profile
            </h1>

            <p> {window.player_name} {window.player_id} </p>
            <p> Highscore: </p>
            <p> Best Speed: </p>

            <div className="form_nextTo">
                <input id="text_player_info" type="text" placeholder="Player Info"></input>
                <button onClick={getPlayerInfo}> Player Info </button>
            </div>
            
        </div>

    );
    

}

export default Profile;