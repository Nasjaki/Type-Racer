import './App.css';

import GamePlay from "./GamePlay";
import GameMain from "./GameMain";

import { useState } from "react";

const url = "https://gruppe5.toni-barth.com/";

//join
async function joinGame() {


    var game_id = document.getElementById("input_game_id").value;
    var player_id = window.player_id;
    //TODO game_id = 0, Game not found
    let response= await fetch(url + "games/"+game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify ({
            "playerId": player_id,
            "action": "join"
        })

    });

        console.log("Joined Game");
        //TODO if joined game then:
        window.game_id = game_id;

        let json = await response.json();
        console.log(json.players);

    return json;
  
}

//create
async function createGame() {
    
    var id = window.player_id;
    //TODO id = 0
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
    
    return json.id;
}






function Game() {
    
    const [isToggled, setIsToggled] = useState(0);

        //play handle
        async function playHandleJoin() {
            await joinGame();
            setIsToggled(1); 
        }

        //Create handle
        async function playHandleCreate() {
            await createGame();
            setIsToggled(1);
        }

    return ( 
        <div className='GameClass'>
            <h1>
                Create A Room or Join a Player
            </h1>

            <div className='GameButtons'>
                <div className='form_nextTo'>
                    <button className = "overlay_button" id = "button_create_game" onClick = {playHandleCreate}> Create Game </button>
                    <button className = "overlay_button" id = "button_join_game" onClick = {playHandleJoin}> Join Game </button>
                    <input id="input_game_id" type="text" placeholder="Game ID"></input>
                </div>
                
            </div>    


            {isToggled === 0 && <GameMain/>}
            {isToggled === 1 && <GamePlay/>}

            
            

        </div>

    );
    

}

export default Game;