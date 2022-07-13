import './App.css';
import React from 'react';   
import getGames from './Code/getGames';
import gameExists from './Code/gameExists';


const url = "https://gruppe5.toni-barth.com/";


async function getGameInfo(game_id) {
    var game_id = window.game_id;

    if (await gameExists(game_id)) {
        let response= await fetch(url + "games/"+game_id, {
            method: 'GET',
        });
    
        let json = await response.json();
        console.log(json);

        return json;
    } else {
        alert("Please enter an ID of an existing game!")
    }
}

async function deleteAllGames() {
    let json = await getGames();

    var i;
    for(i in json){
        console.log(json[i].id);
        if(json[i] instanceof Object){
            
            await fetch(url + "games/" + json[i].id, {
                method: 'DELETE',
            });

        }
    } 
    console.log("Cleared");
}

//Nicht möglich alleine zu spielen wow
//playerId statt player zum Patchen -> falsche dokumentation
function ActiveGames(props) {
    return <li>GameID: {props.game_id} Owner Name: {props.name}</li>;
}

let activeGames = [];

async function AddActiveGames() {

    let json = await getGames();
    var i;
    for(i in json){
        if(json[i] instanceof Object){
            // not already is listed
            
            activeGames = activeGames.concat({id:json[i].id,name:'Test4',game_id:json[i].id});
            
        }
    }
}


function GameMain() {
    
    AddActiveGames();

    return ( 
        <div className='GameMainClass'>

            
            <div className='GameInfo'>
                
                <button className = "overlay_button" id = "button_games_data" onClick = {AddActiveGames}> Show Games </button>
                <button className = "overlay_button" id = "button_game_data" onClick = {getGameInfo}> Show Game Info </button>
                <button className = "overlay_button" id = "button_games_delete" onClick = {deleteAllGames}> Delete Games </button>

            </div>
            
            <ul>
                {activeGames.map((game) => <ActiveGames key={game.id} name={game.name} game_id = {game.game_id} />)}
            </ul>
            
        </div>

    );
    

}

export default GameMain;