let uncompSongData;
let songData;
let store;
const request = indexedDB.open("songHistoryDatabase", 2);
request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

request.onsuccess = function () {
    console.log("Database opened successfully");
    const db = request.result;
    const transaction = db.transaction("songDataStorage", "readwrite");  
    store = transaction.objectStore("songDataStorage");
    const getUncomp = store.get(1);
    getUncomp.onsuccess = () => uncompSongData = getUncomp.result.uncompData;
    const getComp = store.get(2);
    getComp.onsuccess = () => songData = getComp.result.uncompData;
    transaction.oncomplete = function () {
        db.close();
        var req = indexedDB.deleteDatabase(db);
        req.onsuccess = function () {
            console.log("Deleted database successfully");
        };
        req.onerror = function () {
            console.log("Couldn't delete database");
        };
    };
};

let searchBox = document.getElementById('search_box');
document.addEventListener('click',function (event){
    if(event.target.className != 'result' && event.target.id != 'search_box'){
        document.getElementById('search_results_box').style.display = 'none';
    }
});
let showSearch = () => document.getElementById('search_results_box').style.display = 'block';
searchBox.addEventListener('focus',showSearch);
/*function assembleData(){
    let dataChunks = sessionStorage.getItem('dataChunks');
    let uncompressedData = [];
    for(let i=0;i<dataChunks;i++){
        uncompressedData.concat(JSON.parse(sessionStorage.getItem(`uncompressed-song-data-${curChunk}`)));
    }
    console.log(uncompressedData)
}*/

function assembleTable(data){
    const table = document.getElementById('most_streams');
    for(let song of data){
        const row = document.createElement('tr');
        //number
        const numRow = document.createElement('td');
        numRow.innerText = data.indexOf(song)+1;
        row.appendChild(numRow);
        //title
        const titleRow = document.createElement('td');
        titleRow.innerText = song.title;
        row.appendChild(titleRow);
        //artist
        const artistRow = document.createElement('td');
        artistRow.innerText = song.artist;
        row.appendChild(artistRow);
        //streams
        const streamRow = document.createElement('td');
        streamRow.innerText = song.streams;
        row.appendChild(streamRow);
        //add the row
        table.appendChild(row);
    }
}

function getTime(data){
    let timeMs = 0;
    for(let song of songData){
        timeMs += song.ms_played*song.streams;
    }
    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return `${hrs}hrs ${mins}min ${secs}sec`;
    }
    document.getElementById('time').innerText = msToTime(timeMs);
}

function moreFive(data){
    let numOfSongs = 0;
    for(let song of data) if(song.streams>=10) numOfSongs++;
    document.getElementById('more_streams').innerText = numOfSongs+' songs';
}
/*
function mostInDay(data){
    let days = {};
    console.log(uncompressedData)
    for(let song of data){
        let date = new Date(song.ts);
        date = date.toLocaleDateString();
        days[date] = typeof days[song.ts] == Number ? days[date]+1 : 1;
    }
    let mostDay = {gregg:0};
    for(let day in days){
        if(days[day] > mostDay[Object.keys(mostDay)[0]]){
            mostDay = {};
            mostDay[day] = days[day]
        };
    }
    console.log(days)
    document.getElementById('most').innerText = `${mostDay[Object.keys(mostDay)[0]]} - ${Object.keys(mostDay)[0]}`;
}*/

document.getElementById('search_box').addEventListener('input', search);
function search(){
    let searchText = document.getElementById('search_box').value.toLowerCase();
    if(searchText != ''){
        let results = [];
        let box = document.getElementById('search_results_box');
        box.innerHTML = '';
        for(let song of songData){
            if(song.title.toLowerCase().includes(searchText) || song.artist.toLowerCase().includes(searchText)){
                results.push(song);
            }
        }
        for(let song of results){
            let newRow = document.createElement('div');
            newRow.setAttribute('class','result');
            newRow.innerText = song.title+' - '+song.artist;
            newRow.addEventListener('click',function (){songDisplay(song)});
            box.style.display = 'block';
            box.appendChild(newRow);
        }
    } else {
        document.getElementById('search_results_box').style.display = 'none';
    }
}

function songDisplay(song){
    console.log(song);
}

document.getElementById('unique').innerText = songData.length+ ' songs';

//mostInDay(uncompressedData);

moreFive(songData);

getTime(songData);

assembleTable(songData);