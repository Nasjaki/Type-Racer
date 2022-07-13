import './App.css';
import React from 'react';   
import getGames from './Code/getGames';
import gameExists from './Code/gameExists';
import { useState } from 'react';


const url = "https://gruppe5.toni-barth.com/";


async function getGameInfo(game_id) {
    var game_id = window.game_id;

    if (await gameExists(game_id)) {
        let response= await fetch(url + "games/"+game_id, {
            method: 'GET',
        });
    
        let json = await response.json();

        return json;
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
    return <li>Owner Name: {props.name} GameID: {props.game_id} </li>;
}

function GameMain() {

    const[activeGames,updateActiveGames] = useState([{id:0,game_id:0,name:0}]);

    async function AddActiveGames() {

        let games = await getGames();
        
        
        var i;
        for(i in games){
            if(games[i] instanceof Object){
                var can_add = true;
                for(var i2 = 1; i2 < activeGames.length;i2++) {
                    if (games[i].id == activeGames[i2].game_id) {
                        can_add = false;
                    }
                }
                //Not anywhere in the list

                if (can_add == true) {
                    //Doesent update in loop TODO
                    updateActiveGames(activeGames.concat({id:games[i].id,name: await getGameInfo(games[i].id).owner,game_id:games[i].id}));
                    console.log(activeGames);
                }
            }
        }
    
    }

    return ( 
        <div className='GameMainClass'>

            
            <div className='GameInfo'>
                
                <button className = "overlay_button" id = "button_games_data" onClick = {AddActiveGames}> Refresh Games </button>
                <button className = "overlay_button" id = "button_game_data" onClick = {getGameInfo}> Show Game Info </button>
                <button className = "overlay_button" id = "button_games_delete" onClick = {deleteAllGames}> Delete Games </button>

            </div>
            
            <ul>
                {activeGames.map((game) => <ActiveGames key={game.id} game_id = {game.game_id} name={game.name} />)}
            </ul>
            
        </div>

    );
    

}

export default GameMain;