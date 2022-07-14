


function Profile() {

    return ( 
        <div className='ProfileClass'>

            <h1>
                Profile
            </h1>

            <p> {window.player_name} {window.player_id} </p>
            <p> Highscore: </p>
            <p> Best Speed: </p>

            
            
        </div>

    );
    

}

export default Profile;