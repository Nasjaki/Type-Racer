import '../../Css/App.css';
import { useState, useEffect } from "react";
import getNextWord from '../../Code/getData/getNextWord';
import startGame from '../../Code/startGame';
import RenderPlayerList from '../../Renders/RenderPlayerList';
import getGameInfo from '../../Code/getData/getGameInfo';
import getCurrentWord from '../../Code/getData/getCurrentWord';
import gameExists from '../../Code/bool/gameExists';




const url = "https://gruppe5.toni-barth.com/";



async function scoreWord(time = 0) {
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
    console.log("Scored");
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
    const [currWord, setCurrWord] = useState("Ready");
    const [gameActive, setGameActive] = useState("Not Started");

    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);

    async function testWord(input) {
        //Get official current word
        if (gameActive === "Started") {
            if (input == currWord) {
                //Score
                await scoreWord(time);
                console.log(time);
                var newWord = await getNextWord();

                setCurrWord(newWord);
                
                document.getElementById("text_words").placeholder = newWord;
                document.getElementById("text_typed").value = "";

                //timer reset
                setTime(0);
            } 
        }
    }

    async function startGameHandle() {
        if (await startGame() == true) {
            await setGameActive("Started");
        } 
    }

    
    useEffect(() => {
        const timer = setTimeout(async () => {
            setCount((count) => count + 1);
            setTime((time) => time + 1)
            
            //Shows if the game is active
            setGameActive(await getGameActive());


            var word = await getCurrentWord();
            
            if (word !== undefined) {
                setCurrWord(word);
                document.getElementById("text_words").placeholder = word;
            }

          }, 1000);
        return () => clearTimeout(timer);
    });

    return ( 

        
        <div className='GameClass'>
            
            
            <div className='Invis'>
                <button className = "overlay_button" id = "start_game_button" onClick = {startGameHandle}> Start Game</button>
                
                <p>Game ID: {window.game_id} {gameActive}</p>
            </div>
            
            <div className='Textbox_gameplay'>
                <input id="text_words" type="text" placeholder="Start the Game" readOnly = {true}></input>
                <input id = "text_typed" type = "text" onChange={e => testWord(e.target.value)}></input>
            </div>

            <RenderPlayerList></RenderPlayerList>
            
            
        </div>

    );
    

}

export default GamePlay;