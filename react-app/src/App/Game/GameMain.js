import '../../Css/App.css';


import getGameInfo from '../../Code/getData/getGameInfo';

import RenderGameList from '../../Renders/RenderGameList';





export default function GameMain() {

    

    return ( 
        <div className='GameMainClass'>

             

            <div className='GameInfo'>
                
                <button className = "body_buttons" id = "button_game_data" onClick = {getGameInfo}> Show Game Info </button>
                
            </div>
            
            <RenderGameList></RenderGameList>

            
            
        </div>

    );
    

}

// <button className = "overlay_button" id = "button_games_delete" onClick = {deleteAllGames}> Delete Games </button>