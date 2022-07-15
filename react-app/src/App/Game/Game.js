import '../../Css/App.css';

import GamePlay from "./GamePlay";
import GameMain from "./GameMain";
import joinGame from '../../Code/joinGame';
import createGame from '../../Code/Create and delete/createGame';
import deleteGame from '../../Code/Create and delete/deleteGame';
import gameExists from '../../Code/bool/gameExists';

import { useState } from "react";
import { useEffect } from 'react';




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
        //delete Game
        await deleteGame(window.game_id);
        
        //go home
        setIsToggled(0);  
        window.game_id = 0;
    }

    const [count, setCount] = useState(0);
    //Check if game is still active else leave game
    useEffect(() => {
        const timer = setTimeout(async () => {
            //called every second
            setCount((count) => count + 1);
            if (await gameExists(window.game_id) !== true && window.game_id !== 0) {
                console.log("game closed");
                console.log(count);
                //go home
                setIsToggled(0);
                //Start 10 Minutes from beginning
                setCount(0);
                window.game_id = 0;
            }

          }, 1000);
         return () => clearTimeout(timer);
    });

    return ( 
        <div className='GameClass'>

        {!isToggled?<div>
            <h1>
                Create A Room or Join a Player
            </h1>

            <div className='GameButtons'>
                <div className='form_nextTo'>
                    <button className = "body_buttons" id = "button_create_game" onClick = {playHandleCreate}> Create Game </button>
                    <button className = "body_buttons" id = "button_join_game" onClick = {playHandleJoin}> Join Game </button>
                    <input id="input_game_id" type="text" placeholder="Game ID"></input>
                </div>
                
            </div>
        </div>:null} 

        {isToggled?<div className='GamePlayHidden'>
            <h1>
                Get Ready to Play! {6000 - count} Seconds Left
            </h1>
            <button className = "body_buttons" id = "leave_game_button" onClick = {leaveGameHandle}> Leave Game</button> 
        </div>:null}  

            {isToggled === 0 && <GameMain/>}
            {isToggled === 1 && <GamePlay/>}


        </div>

    );
    

}

export default Game;