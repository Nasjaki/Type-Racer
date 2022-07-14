import './App.css';
import { useState } from "react";

const url = "https://gruppe5.toni-barth.com/";

async function getWord(word_id) {
    let response = await fetch(url + "words/", {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
    let json = await response.json();

    var i = 0;
    for(i in json){
        if(json[i]instanceof Object){
          if (json[i].id == word_id) {
            return json[i].word;
          } 
        }
    }

}

async function startGame() {
    
    var game_id = window.game_id; //Korrekt

    //TODO id = 0
    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify ({
            "playerId": window.player_id,
            "action" : "start"
        })

    });

    let json = await response.json();

    if (json.players.length === 1) {
        alert("You cant play alone... Sorry");
    }

    return json.running;
    
}

async function getNextWord() {

    var game_id = window.game_id; 
    let response= await fetch(url + "games/"+ game_id, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            "playerId" : window.player_id,
            "action" : "word"
        })
    });
    
    
    let json = await response.json();
                        //Deutsch plötzlich
    var currId = json.currentWort;
    
    var next_word = await getWord(currId);

    return next_word;
}

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
        if (startGame() === true) {
            setGameActive("Started");
        }
    }

    return ( 

        
        <div className='GameClass'>
            <h1>
                Get Ready to Play!
            </h1>
            
            <div className='Invis'>
                <button className = "overlay_button" id = "start_game_button" onClick = {startGameHandle}> Start Game</button>
                <p>Game ID: {window.game_id} {gameActive}</p>
            </div>
            
            <div className='Textbox'>
                <input id="text_words" type="text" placeholder="Ready"></input>
                <input id = "text_typed" type = "text" onChange={e => testWord(e.target.value)}></input>
            </div>

            <div className='PlayerList'>
                
            </div>
            
            
        </div>

    );
    

}

export default GamePlay;