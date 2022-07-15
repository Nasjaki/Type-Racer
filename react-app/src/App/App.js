import "../Css/App.css";

import Main from "./Main";
import Game from "./Game/Game";
import Profile from "./Profile";
import newPlayer from "../Code/newPlayer"

import { useState } from "react";
import { useEffect } from "react";
import playerExists from '../Code/bool/playerExists';
import getPlayerId from '../Code/getData/getPlayerId';

//API Link
const url = "https://gruppe5.toni-barth.com/";

//Globale Variablen
window.player_id = 0;
window.game_id = 0;
window.player_name = "Profile";




function App() {

  //Hide TopBar when:
  const [count, setCount] = useState(0);
  const [showBar, setShowBar] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
        setCount((count) => count + 1);

        //When ingame
        if (window.game_id === 0) {
          setShowBar(true);
        } else {
          setShowBar(false);
        }
      }, 1000);
     return () => clearTimeout(timer);
  });

  async function newPlayerHandle() {
    if (await newPlayer() === true) {
      document.getElementById("button_toggle_profile").innerHTML = window.player_name + " " + window.player_id;
    }
  }
  async function loginHandle() {
    var login_name = document.getElementById("text_name_login").value;
    if (await playerExists(login_name)) {
      window.player_name = login_name;
      window.player_id = await getPlayerId(login_name);

      document.getElementById("button_toggle_profile").innerHTML = window.player_name + " " + window.player_id;
    } else {
      console.log("Player does not exist");
    }
    document.getElementById("text_name_login").value = "";
  }

  //State -> welche Seite gezeigt wird
  const [isToggled, setIsToggled] = useState(0);

  return ( 
    <div className="App">

      <header className="App-header">
        
        {showBar?<div className='top_bar'>

          <button className = "top_bar_button" id = "button_toggle_main" onClick = {() => setIsToggled(0)}> Startpage </button>
          <button className = "top_bar_button" id = "button_toggle_Login" onClick = {() => setIsToggled(1)}> Login </button>
          <button className = "top_bar_button" id = "button_toggle_Game" onClick = {() => setIsToggled(2)}> Play </button>
          <button className = 'top_bar_button' id = "button_toggle_profile" onClick={() => setIsToggled(3)}>{window.player_name} {window.player_id} </button>

        </div>:null}
      </header>
        
        <div className='AppBody'>
            {isToggled === 0 && <Main/>}
            {isToggled === 2 && <Game/>}
            {isToggled === 3 && <Profile/>}

            {(isToggled === 1)?<div className='LoginClass'>

              <h1>
                  Login to Typeracer
              </h1>

              <div className="CreateAccount">
                  <input class = "text_name" id="text_name" type="text" placeholder="Name" maxLength={10}></input>
                  <button className ='body_buttons' id = "button_login"onClick={newPlayerHandle}> Create Account </button> 

              </div>

              <div className='LoginAccount'>
                <input class = "text_name" id="text_name_login" type="text" placeholder="Account Name" maxLength={10}></input>
                <button className="body_buttons" onClick={loginHandle}> Login </button>
              </div>

            </div>:null}
        </div>

        

        <div className='footer_container'>
          <footer>
            <p>Projekt von: Nils Jonack, Jiaying He und Niklas Stoll</p>
            <p>Unter Aufsicht von Toni Barth</p>
          </footer>
        </div>
      </div>
 
      
  );
}

export default App;
