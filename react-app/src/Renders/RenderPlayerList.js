import { useState, useEffect } from "react";
import getGameInfo from "../Code/getData/getGameInfo";
import getPlayerName from "../Code/getData/getPlayerName"


function JoinedPlayers(props) {
    return <li>{props.name}_{props.id} Score: {props.score}</li>;
}



export default function RenderPlayerList() {
    const[joinedPlayers,updateJoinedPlayers] = useState([{id:window.player_id,name:window.player_name,score:"0"}]);
    const [count, setCount] = useState(0);

    async function AddJoinedPlayers() {

        let json = await getGameInfo();
    
    if (json !== -1) {
        let players = json.players; //automatically the id
        let players_score = json.points;
      

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
                    var player_points = players_score[i];
                    updateJoinedPlayers(joinedPlayers.concat({id: player_id,name: player_name,score: player_points}));
                    //One at a time
                    break;
                }
                
            }
        }

        
        

            //Refresh score

            //for every list element
            for(i = 0; i < joinedPlayers.length;i++) {
                var listScore = parseInt(joinedPlayers[i].score);
                var onlineScore = parseInt(players_score[i]); 

                //console.log(listScore + " " + onlineScore + " " + i);
                if (onlineScore !== listScore) {

                    player_id = joinedPlayers[i].id; //No problem with order of list
                    //Update Map
                    const newList = joinedPlayers.map((listElement) => {
                        if (player_id === listElement.id) {
                            const updatedScore = {
                                ...listElement,
                                score: onlineScore,
                            };

                            return updatedScore;
                        }
                        return listElement;
                    });
                    //Updates the new ListElement
                    updateJoinedPlayers(newList);
                }
            }
        
    
    } else {
        //Error 
        //TODO
    }
        
}

    //Render every second
    useEffect(() => {
        const timer = setTimeout(async () => {
            setCount((count) => count + 1);
            await AddJoinedPlayers();
            //Has to be equal to upper class
          }, 100);
         return () => clearTimeout(timer);
      });

    return (
        <div className='RenderPlayerList'>

            <h1>Players</h1>
        	    <div className="active_players">
                    <ul>
                        {joinedPlayers.map((player) => <JoinedPlayers key={player.id} id = {player.id} name={player.name} score={player.score} />)}
                    </ul>
                </div>
                
                
                
        </div>
 
    )
}