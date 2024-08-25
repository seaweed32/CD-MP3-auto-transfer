let songData = JSON.parse(sessionStorage.getItem('song-data'));

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
        timeMs += song.ms_played;
    }
    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
      
        return `${hrs}hrs ${min}min ${secs}sec`;
    }
    document.getElementById('time_spent').querySelector('disp_body').innerText = msToTime(timeMs);
}

getTime(songData)

assembleTable(songData);