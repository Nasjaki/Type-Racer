import './App.css';

const url = "https://gruppe5.toni-barth.com/";

async function getPlayers() {
  let response = await fetch(url + "players/", {
      method: 'GET',
      headers: {
          'Content-Type':'application/json',
      }
  });

  let json = await response.json();
  //console.log(json);

  let str = "";
  var i = 0;
  for(i in json){
      if(json[i]instanceof Object){
        str += json[i].name + " " + json[i].id + "\n";
      }
  }

  document.getElementById("current_players").value = str;

  return json;
}

async function getWords() {
    let response = await fetch(url + "words/", {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
    let json = await response.json();
    //console.log(json);
    let str = "";
    var i = 0;
    for(i in json){
        if(json[i]instanceof Object){
          str += json[i].word + "\n";
        }
    }
    //console.log(str);
    return json;
}


function Main() {
    
    return ( 
        <div className='MainClass'>
            
            <h1>Welcome to Typeracer!</h1>
            <p>Crush your Enemies with your speed.</p>

            <div className="form_window_right">
                <button onClick={getPlayers}> show Players </button>
                <textarea id="current_players" rows={10} columns={3} readOnly={true} value=""> </textarea>
            </div>


        </div>
    );

}

export default Main;