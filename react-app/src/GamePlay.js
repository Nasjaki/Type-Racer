import './App.css';
import { useState } from "react";
import deleteGame from './Code/deleteGame';
import getNextWord from './Code/getNextWord';
import startGame from './Code/startGame';
import RenderPlayerList from './RenderPlayerList';


const url = "https://gruppe5.toni-barth.com/";



async function scoreWord() {

    var game_id = window.game_id; 
    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "playerId" : window.player_id,
            "time":200,
            "action" : "score"
        })
    });
    console.log("Scored");
}



function GamePlay() {
    const [currWord, setCurrWord] = useState("Ready");
    const [gameActive, setGameActive] = useState("Not Started");


    async function testWord(input) {
        //Get official current word
        if (gameActive === "Started") {
            if (input == currWord) {
                //Score
                scoreWord();

                var newWord = await getNextWord();

                setCurrWord(newWord);
                
                document.getElementById("text_words").placeholder = newWord;
                document.getElementById("text_typed").value = "";
            } 
        }
    }

    async function startGameHandle() {
        if (await startGame() == true) {
            await setGameActive("Started");
        } 
    }

    async function leaveGameHandle() {
        //Set different owner
        await deleteGame(window.game_id);
        
        //go home

        
    }

    return ( 

        
        <div className='GameClass'>
            
            
            <div className='Invis'>
                <button className = "overlay_button" id = "start_game_button" onClick = {startGameHandle}> Start Game</button>
                
                <p>Game ID: {window.game_id} {gameActive}</p>
            </div>
            
            <div className='Textbox'>
                <input id="text_words" type="text" placeholder="Ready" readOnly = {true}></input>
                <input id = "text_typed" type = "text" onChange={e => testWord(e.target.value)}></input>
            </div>

            <RenderPlayerList></RenderPlayerList>
            
            
        </div>

    );
    

}

export default GamePlay;