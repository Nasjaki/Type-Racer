import "../Css/App.css";
import getPlayers from "../Code/getData/getPlayers";

const url = "https://gruppe5.toni-barth.com/";



async function showPlayers() {
    let players = await getPlayers();

    //Initialize String
    let str = "";
    for(var i in players){
        if(players[i]instanceof Object){
            str += players[i].name + " " + players[i].id + "\n";
        }
    }

    //Add string to textbox
    document.getElementById("current_players").value = str;

    return players;
}




function Main() {
    
    return ( 
        <div className='MainClass'>
            
            <h1>Welcome to Typeracer!</h1>
            <p>Crush your Enemies with your speed.</p>

            <div className="form_window_right">
                <button onClick={showPlayers}> show Players </button>
                <textarea id="current_players" rows={10} columns={3} readOnly={true} value=""> </textarea>
            </div>


        </div>
    );

}

export default Main;