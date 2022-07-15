import { useState, useEffect } from "react";
import getGames from "../Code/getData/getGames";
import getPlayerName from "../Code/getData/getPlayerName"


const url = "https://gruppe5.toni-barth.com/";

function ActiveGames(props) {
    return <li>Owner Name: {props.name} GameID: {props.game_id} </li>;
}



export default function RenderGameList() {
    const[activeGames,updateActiveGames] = useState([{id:"",game_id:"",name:""}]);
    const [count, setCount] = useState(0);

    async function AddActiveGames() {
        
        let games = await getGames();
        

        //needs to refresh ?
        if (games.length > activeGames.length - 1) {
        
            //add games
            for(var i in games){
                if(games[i] instanceof Object){
                    var can_add = true;
                    for(var i2 = 1; i2 < activeGames.length;i2++) {
                        if (games[i].id === activeGames[i2].game_id) {
                            can_add = false;
                        }
                    }
                    //Not anywhere in the list
                    if (can_add === true) {
                        var owner_id = await games[i].owner;
                        var owner_name = await getPlayerName(owner_id);
                        updateActiveGames(activeGames.concat({id:games[i].id,name: owner_name,game_id:games[i].id}));
                        //One at a time
                        break;
                    }
                }
            }
            
            //delete if not in the list
            /*
            for(var i = 1; i < activeGames.length;i++) {
                var can_delete = true;
                for(i2 in games) {
                    if (activeGames[i].game_id === games[i2].id) {
                        can_delete = false;
                    }
                }
                if (can_delete === true) {
                    console.log(activeGames[i].game_id + " deleted");
                }
            }
            */
        }
}

    useEffect(() => {
        setTimeout(async () => {
            setCount((count) => count + 1);
            await AddActiveGames();
          }, 1000);

        
      });

    return (
        <div className='RenderGameList'>

            <h1>active games</h1>
        	    <div className="active_games">
                    <ul>
                        {activeGames.map((game) => <ActiveGames key={game.id} game_id = {game.game_id} name={game.name} />)}
                    </ul>
                </div>
                
                
                
        </div>
 
    )
}