import { useState, useEffect } from "react";
import getGames from "../Code/getData/getGames";
import getPlayerInfo from "../Code/getData/getPlayerInfo";
import getPlayerName from "../Code/getData/getPlayerName"
import getPlayers from "../Code/getData/getPlayers";


const url = "https://gruppe5.toni-barth.com/";

function BestPlayers(props) {
    return <li>{props.name} {props.bestCPS} </li>;
}



export default function RenderLeaderboard() {
    const[bestPlayers,updateBestPlayers] = useState([{keyID:1,id:"",name:"",bestCPS:""}]);

    //updateBestPlayers(bestPlayers.concat({keyID:1,id:"",name:"",bestCPS:""}));
    //updateBestPlayers(bestPlayers.concat({keyID:2,id:"",name:"",bestCPS:""}));
    //updateBestPlayers(bestPlayers.concat({keyID:3,id:"",name:"",bestCPS:""}));

    const [count, setCount] = useState(0);

    async function updateLeaderboard() {

            //var leaderboard = ["id","name","bestCPS"][i];
            
            let players = await getPlayers();

            //initialisieren
            const leaderboard = [];
            for(var i = 0; i < players.length; i++) {
                leaderboard[i,1] = 0;
                leaderboard[i,2] = 0;
                leaderboard[i,3] = 0;
            }

            //hol die besten 10
            for(var i = 0; i < players.length; i++) {

                let playerInfo = await getPlayerInfo(players[i].id); 

                leaderboard[i,1] = players[i].id;
                leaderboard[i,2] = players[i].name;
                leaderboard[i,3] = playerInfo.bestCharsPerSecond;

            }

            console.log(leaderboard);
        return leaderboard;
    }

    function setLeaderboardList(player_id, player_name, player_bestCPS, i) {
        //console.log(player_id + " " +  player_name + " " +  player_bestCPS + " " + i);

        //Update Map
        /*
        const newList = bestPlayers.map((listElement) => {

            if (i === listElement.keyID) {
                const updatedElement = {
                    ...listElement,
                    id: player_id,
                    name: player_name,
                    bestCPS: player_bestCPS
                };

                return updatedElement;
            }
            return listElement;
        });
        //Updates the new ListElement

        updateBestPlayers(newList);
        */
    }

    function getBestPlayers(arr) {
        
            var first_id = 0;
            var first_val = 0;

            var second_id = 0;
            var second_val = 0;

            var third_id = 0;
            var third_val = 0;

            for(var i = 0; i < arr.length; i++) {
                var curr_val = arr[i,3];
                var curr_id = arr[i,1];

                if(curr_val > first_val) {
                    first_val = curr_val;
                    first_id = curr_id;
                } else if (curr_val > second_val) {
                    second_val = curr_val;
                    second_id = curr_id;
                } else if (curr_val >= third_val) {
                    third_val = curr_val;
                    third_id = curr_id;
                }
            }


            setLeaderboardList(first_id, arr[first_id,2], arr[first_id, 3], 1);
            setLeaderboardList(second_id, arr[second_id,2], arr[second_id, 3], 2);
            setLeaderboardList(third_id, arr[third_id,2], arr[third_id, 3], 3);
    }


    useEffect(() => {
        setTimeout(async () => {
            setCount((count) => count + 1);
            
            let lb = await updateLeaderboard();

            getBestPlayers(lb);

          }, 1000);

        
      });

    return (
        <div className='RenderLeaderboard'>

            <h1>Best Players</h1>
        	    <div className="leaderboard_list">
                    <ul>
                        {bestPlayers.map((player) => <BestPlayers key={player.keyID} id = {player.id} name={player.name} bestCPS={player.bestCPS} />)}
                    </ul>
                </div>
                
                
                
        </div>
 
    )
}