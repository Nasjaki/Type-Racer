import '../../Css/App.css';
import React, { useEffect } from 'react';   


import getGameInfo from '../../Code/getData/getGameInfo';

import RenderGameList from '../../Renders/RenderGameList';
import GamePlay from './GamePlay';



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