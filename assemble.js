import array from './script.js'

function assembleTable(data){
    const table = document.getElementById('most_streams');
    for(let song of data){
        //title
        const row = document.createElement('tr');
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
assembleTable(array);