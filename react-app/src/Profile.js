


function Profile() {

    return ( 
        <div className='ProfileClass'>

            <h1>
                Profile
            </h1>

            <p> {window.player_name} {window.player_id} </p>
            <p> Highscore: </p>
            <p> Best Speed: </p>

            <div className="form_nextTo">
                <input id="text_player_info" type="text" placeholder="Player Info"></input>
                <button onClick={getPlayerInfo}> Player Info </button>
            </div>
            
        </div>

    );
    

}

export default Profile;