const data = {
    words: []
}

const getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
};

const getRandomLetter = function() {
    return String.fromCharCode(97 + getRandomInt(25)); //97 = lowercase 'a'
}

const makeURL = function(letter) {
    return 'https://api.datamuse.com/words?sp=' + letter + '????*&md=p';
}

const getRequest = function ( url, callback ) {
    xhr = new XMLHttpRequest();

    xhr.addEventListener('loadend', callback);
    xhr.open('GET', url);
    xhr.send();

};

const filter = function (arr, fn) {
    newArr = [];

    for( let i = 0; i < arr.length; i++){
        if ( arr[i] !== undefined && fn( arr[i] )) {
            newArr.push( arr[i] );
        }
    }

    return newArr
}

const clearBody = function() {
    document.body.innerHTML = "";
}

const render = function() {
    document.body.innerText = data.words.join(" ");
}

const writeWord = function(word, tag){
    if (tag === "v") {
        data.words[0] = word;
    } else {
        data.words[1] = word;
    }

    render();
}

// getting a word from the API.
// tag should be one of:
// "n" means noun, "v" means verb, "adj" means adjective, "adv" means adverb, and "u"other
const getWord = function(tag) {
    const letter = getRandomLetter();
    const url = makeURL(letter);

    getRequest(url, function(response) {
        const responseData = JSON.parse(response.target.responseText);
        const words = filter(responseData, function( obj ) {
            return obj.tags === undefined ? false : obj.tags.includes(tag);
        });

        const theWord = words[ getRandomInt(words.length-1) ].word;

        writeWord(theWord, tag);
    });
}

const getName = function() {
    //clearBody(); // just in case I want to add a button

    getWord('v');
    getWord('n');
};

document.addEventListener('DOMContentLoaded', getName, false);