import '../../Css/App.css';
import { useState, useEffect } from "react";
import getNextWord from '../../Code/getData/getNextWord';
import startGame from '../../Code/startGame';
import RenderPlayerList from '../../Renders/RenderPlayerList';
import getGameInfo from '../../Code/getData/getGameInfo';
import getCurrentWord from '../../Code/getData/getCurrentWord';
import gameExists from '../../Code/bool/gameExists';
import stopGame from '../../Code/stopGame';

import { ReactComponent as CrownAnimation } from "./Crown.svg";


const url = "https://gruppe5.toni-barth.com/";



async function scoreWord(time = 0) {

    //TODO Cant score the same word twice

    if (time === 0) return false;

    var game_id = window.game_id; 

    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "playerId" : window.player_id,
            "time": time,
            "action" : "score"
        })
    });
    //console.log("Scored");
}

async function getGameActive() {
    let json = await getGameInfo();

    if (json.running === true) {
        return "Started";
    } else {
        return "Not Started";
    }
}


function GamePlay() {
    //max timers
    const max_game_time_s = 60;
    const max_game_time_ms = max_game_time_s * 1000;

    //states
    const [currWord, setCurrWord] = useState("Ready");
    const [gameActive, setGameActive] = useState("Not Started");
    const [wonGame, setWonGame] = useState(false);

    const [word_time, set_word_time] = useState(0);
    const [game_time, set_game_time] = useState(0);

    //Test if word is correct
    async function testWord(input) {
        //Get official current word
        if (gameActive === "Started") {
            if (input == currWord) {
                //Score
                console.log("word_time: " + word_time);
                var time_val = Math.round(word_time * 100) / 100;
                await scoreWord(time_val);

                var newWord = await getNextWord();
                setCurrWord(newWord);
                
                //Reset boxes
                document.getElementById("text_words").placeholder = newWord;
                document.getElementById("text_typed").value = "";

                //word timer reset
                set_word_time(0);
            } 
        }
    }

    //Starts the game
    async function startGameHandle() {
        if (await startGame() === true) {
            setGameActive("Started");
            set_game_time(0);
            set_word_time(0);

            //Set scores 0
            
        } else {
            alert("You must be the Host to start the game");
        }
    }

    const [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setTimeout(async () => {
            setCount((count) => count + 1);


            setGameActive(await getGameActive());

            //Time is not up (Game Active)
            if ((max_game_time_s - game_time) >= 0 && gameActive === "Started") {
                //Timer Game and Word
                var str = document.getElementById("text_words").placeholder;
                if(str !== "Start the Game" && gameActive === "Started") {
                    set_game_time((game_time) => game_time + 1);
                    set_word_time((word_time) => word_time + 1);
                }

                
                //Set word
                if (gameActive === "Started") {
                    var word = await getCurrentWord();
                    if (word !== undefined) {
                        setCurrWord(word);
                        document.getElementById("text_words").placeholder = word;
                    }
                }

                setWonGame(false);

            } else {
                //Time is up

                //Reset Textbox
                var element = document.getElementById("text_words");
                if (element !== null) {
                    element.placeholder = "Start the Game";
                }

                //Stop game if game is still active
                if (await getGameActive() === "Started") {
                    await stopGame();
                } 

                //Results
                var winnerJson = await getGameInfo(window.game_id);
                if (window.player_id === winnerJson.winner) {
                    setWonGame(true);
                }

                //Reset Timer 
                set_game_time(0);

            }

        }, 500);
        return () => clearTimeout(timer);
    });


    //Effect for both timers bc they are not async
    const [count2, setCount2] = useState(0);

    return ( 

        
        <div className='GameClass'>
            
            
            <div className='Invis'>
                <button className = "body_buttons" id = "start_game_button" onClick = {startGameHandle}> Start Game</button>
                
                <p>Game ID: {window.game_id} {gameActive} {Math.round((max_game_time_s - game_time) * 10) / 10}s left</p>
            </div>
            
            <div className='Textbox_gameplay'>
                <input className = "text_name" id="text_words" type="text" placeholder="Start the Game" readOnly = {true}></input>
                <input className = "text_name" id = "text_typed" type = "text" onChange={e => testWord(e.target.value)}></input>
            </div>


            {wonGame?<div className='animation_container'>
                <CrownAnimation></CrownAnimation>
            </div>:null}


            <RenderPlayerList></RenderPlayerList>
            
            
        </div>

    );
    

}

export default GamePlay;