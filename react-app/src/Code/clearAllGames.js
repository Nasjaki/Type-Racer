import getGames from "./getGames";

const url = "https://gruppe5.toni-barth.com/";

export default async function deleteAllGames() {
    let json = await getGames();

    var i;
    for(i in json){
        console.log(json[i].id);
        if(json[i] instanceof Object){
            
            await fetch(url + "games/" + json[i].id, {
                method: 'DELETE',
            });

        }
    } 
    console.log("Cleared");
}