

const url = "https://gruppe5.toni-barth.com/";

//Put some Player values in
export default async function putPlayerValues(player_id,name, cps, bestPoints) {

        let response= await fetch(url + "players/"+player_id, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify ({
                "id": player_id,
                "name" : name,
                "bestPoints" : bestPoints,
                "bestCharsPerSecond" : cps
            })

        });


        let json = await response.json();

        console.log(json);
        
        return true;
    
}