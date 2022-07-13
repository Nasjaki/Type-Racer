
import App from './App';
import './App.css';


const url = "https://gruppe5.toni-barth.com/";


async function deleteAllPlayers() {

    let response = await fetch(url + "players/", {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
  
    let json = await response.json();

    var i;
    for(i in json){
        console.log(json[i].id);
        if(json[i] instanceof Object){
            
            await fetch(url + "players/" + json[i].id, {
                method: 'DELETE',
            });

        }
    }

  
}

async function getPlayerInfo () {

    var player_id = document.getElementById("text_player_info").value;

    let response = await fetch(url + "players/" + player_id, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });

    let json = await response.json();
    console.log(json);

    return json;
}

async function newPlayer() {

    var name_str = document.getElementById("text_name").value;
    console.log(name_str);
    

    if (name_str.length > 0) {
        try {
            let response = await fetch(url + "players/", {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    "name" : name_str
                })
            });
            
            let json = await response.json();

            window.player_id = json.id;
            window.player_name = name_str;

            return json;
        } catch (ex) {
            console.error(ex);
        }
    } 

    
}


function Login() {

    return ( 
        <div className='LoginClass'>

            <h1>
                Login to Typeracer
            </h1>

            <div className="form_nextTo">
                <input id="text_name" type="text" placeholder="Name"></input>
                <button onClick={newPlayer}> Create Account </button>
            </div>

            <div className="form_nextTo">
                <input id="text_player_info" type="text" placeholder="Player Info"></input>
                <button onClick={getPlayerInfo}> Player Info </button>
            </div>

            
            
            <button onClick={deleteAllPlayers}> Delete All Players </button>
            
        </div>

    );
    

}

export default Login;

