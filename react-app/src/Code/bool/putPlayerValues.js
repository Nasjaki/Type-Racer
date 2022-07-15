

const url = "https://gruppe5.toni-barth.com/";

//create
export default async function putPlayerValues(player_id,name, cps) {

        let response= await fetch(url + "players/"+player_id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify ({
                "id": player_id,
                "name" : name,
                "bestPoints" : 0,
                "bestCharsPerSecond" : cps
            })

        });


        let json = await response.json();

        console.log(json);
        
        return true;
    
}