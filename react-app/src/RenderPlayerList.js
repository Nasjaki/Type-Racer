import { useState, useEffect } from "react";
import getGameInfo from "./Code/getGameInfo";
import getPlayerName from "./Code/getPlayerName"


const url = "https://gruppe5.toni-barth.com/";

function JoinedPlayers(props) {
    return <li>{props.name}_{props.id} Score: {props.score}</li>;
}



export default function RenderPlayerList() {
    const[joinedPlayers,updateJoinedPlayers] = useState([{id:window.player_id,name:window.player_name,score:"0"}]);
    const [count, setCount] = useState(0);

    async function AddJoinedPlayers() {
        
        let json = await getGameInfo();
        let players = json.players; //automatically the id
        

        //needs to refresh ?
        if (players.length > joinedPlayers.length) {
        
            //add Players
            for(var i in players){
                var player_id = players[i];
                var can_add = true;
                for(var i2 = 0; i2 < joinedPlayers.length;i2++) {
                    if (player_id === joinedPlayers[i2].id) {
                        can_add = false;
                    }
                }
                //Not anywhere in the list
                if (can_add === true) {
                    var player_name = await getPlayerName(player_id);
                    updateJoinedPlayers(joinedPlayers.concat({id: player_id,name: player_name,score: 0}));
                    //One at a time
                    break;
                }
                
            }
            
            //delete if not in the list
            
        }
}

    useEffect(() => {
        setTimeout(async () => {
            setCount((count) => count + 1);
            await AddJoinedPlayers();
          }, 1000);
      });

    return (
        <div className='RenderPlayerList'>

            <h1>active games</h1>
        	    <div className="active_players">
                    <ul>
                        {joinedPlayers.map((player) => <JoinedPlayers key={player.id} id = {player.id} name={player.name} score={player.score} />)}
                    </ul>
                </div>
                
                
                
        </div>
 
    )
}