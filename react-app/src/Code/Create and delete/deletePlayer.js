const url = "https://gruppe5.toni-barth.com/";


//deltes a single game
export default async function deleteGame(player_id) {
    await fetch(url + "players/" + player_id, {
        method: 'DELETE',
    });
    return true;
}