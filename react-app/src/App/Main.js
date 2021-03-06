import "../Css/App.css";
import getPlayers from "../Code/getData/getPlayers";
import RenderPlayerList from "../Renders/RenderPlayerList";
import RenderLeaderboard from "../Renders/RenderLeaderbord";
import putPlayerValues from "../Code/bool/putPlayerValues";

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

    //return players;
}




function Main() {
    
    return ( 
        <div className='MainClass'>
            
            <h1>Welcome to Typeracer!</h1>
            <p>Crush your Enemies with your speed.</p>

            
            
            <div className="start_text">
                <p> Sie können mithilfe der Buttons in der oberen Leiste</p>
                <p> durch die verschiedenen Tabs steuern; wenn noch nicht </p>
                <p> geschehen, sollten Sie sich zunächst einmal einloggen :)</p>
                <p></p>
                <p>Danach können Sie beliebig Spielen beitreten oder selber welche erstellen.</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>|</p>
                <p>V</p>
            </div>

            


        </div>
    );

}

export default Main;