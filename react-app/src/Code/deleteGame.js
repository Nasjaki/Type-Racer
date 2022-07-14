const url = "https://gruppe5.toni-barth.com/";

export default async function deleteGame(game_id) {
    await fetch(url + "games/" + game_id, {
        method: 'DELETE',
    });
    return true;
}