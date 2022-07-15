
const url = "https://gruppe5.toni-barth.com/";


//gets the string of the word by id
export default async function getWord(word_id) {
    let response = await fetch(url + "words/", {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
        }
    });
    let json = await response.json();

    var i = 0;
    for(i in json){
        if(json[i]instanceof Object){
          if (json[i].id == word_id) {
            return json[i].word;
          } 
        }
    }

}