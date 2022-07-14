import './App.css';

import Login from "./Login";
import Main from "./Main";
import Game from "./Game";
import Profile from "./Profile";

import { useState } from "react";

//API Link
const url = "https://gruppe5.toni-barth.com/";

//Globale Variablen
window.player_id = 0;
window.game_id = 0;
window.player_name = "Profile";

function App() {

  //State -> welche Seite gezeigt wird
  const [isToggled, setIsToggled] = useState(0);

  return ( 
    <div className="App">

        <header className="App-header">

      <div className='top_bar'>

        <button className = "top_bar_button" id = "button_toggle_main" onClick = {() => setIsToggled(0)}> Startpage </button>
        <button className = "top_bar_button" id = "button_toggle_Login" onClick = {() => setIsToggled(1)}> Login </button>
        <button className = "top_bar_button" id = "button_toggle_Game" onClick = {() => setIsToggled(2)}> Play </button>
        <button className = 'top_bar_button' id = "button_toggle_profile" onClick={() => setIsToggled(3)}>{window.player_name} {window.player_id} </button>
        

        {isToggled === 0 && <Main/>}
        {isToggled === 1 && <Login/>}
        {isToggled === 2 && <Game/>}
        {isToggled === 3 && <Profile/>}

      </div>

        </header>

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
