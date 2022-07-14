import './App.css';
import React, { useEffect } from 'react';   
import getGames from './Code/getGames';
import gameExists from './Code/gameExists';

import getGameInfo from './Code/getGameInfo';

import RenderGameList from './Code/RenderGameList';



const url = "https://gruppe5.toni-barth.com/";




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


export default function GameMain() {


    return ( 
        <div className='GameMainClass'>

            
            <div className='GameInfo'>
                
                <button className = "overlay_button" id = "button_game_data" onClick = {getGameInfo}> Show Game Info </button>
                

            </div>
            
            <RenderGameList></RenderGameList>
            
        </div>

    );
    

}

//47 <button className = "overlay_button" id = "button_games_delete" onClick = {deleteAllGames}> Delete Games </button>