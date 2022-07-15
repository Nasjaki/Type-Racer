import "../Css/App.css";
import getPlayerId from "../Code/getData/getPlayerId";
import playerExists from "../Code/bool/playerExists";

import RenderLeaderboard from "../Renders/RenderLeaderbord";


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

            <div className='profile_survey'>

                <div className='profile_rows'>
                    <b>Name:</b>
                    <p className='profile_stats'> {window.player_name} {window.player_id} </p>
                </div>
                <div className='profile_rows'>
                    <b> Highscore: </b>
                    <p className='profile_stats'>Platzhalter</p>
                </div>
                <div className='profile_rows'>
                    <b> Best Speed: </b>
                    <p className='profile_stats'>Platzhalter</p>
                </div>

            </div>

            

            
        </div>

    );
    

}

export default Profile;

/*
<div className="form_nextTo">
                <input id="text_player_info" type="text" placeholder="Player Info"></input>
                <button onClick={getPlayerInfo}> Player Info </button>
            </div>


*/