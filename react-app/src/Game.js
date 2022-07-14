import './App.css';

import GamePlay from "./GamePlay";
import GameMain from "./GameMain";
import joinGame from './Code/joinGame';
import createGame from './Code/createGame';
import deleteGame from './Code/deleteGame';

import { useState } from "react";



function Game() {
    
    const [isToggled, setIsToggled] = useState(0);

    //play handle
    async function playHandleJoin() {
        if (await joinGame() === true) {
            setIsToggled(1); 
            
        }
    }

    //Create handle
    async function playHandleCreate() {
        if (await createGame() === true) {
            setIsToggled(1);
        }
    }
    //Leave handle
    async function leaveGameHandle() {
        //Set different owner
        await deleteGame(window.game_id);
        
        //go home
        setIsToggled(0);  
    }

    return ( 
        <div className='GameClass'>

        {!isToggled?<div>
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
        </div>:null} 

        {isToggled?<div className='GamePlayHidden'>
            <h1>
                Get Ready to Play!
            </h1>
            <button className = "overlay_button" id = "leave_game_button" onClick = {leaveGameHandle}> Leave Game</button>
        </div>:null}  

            {isToggled === 0 && <GameMain/>}
            {isToggled === 1 && <GamePlay/>}

        
            

        </div>

    );
    

}

export default Game;