if(window.location.href.replace(/^.*[\\/]/, '') == 'index.html'){
    document.getElementById('file_input_button').addEventListener('click', () => fileHandler());
}

function saveToDB(uncompressedData,compressedData){
    const request = indexedDB.open("songDataDB", 1);
    //error
    request.onerror = function (event) {
      console.error("An error occurred with IndexedDB");
      console.error(event);
    };
    //on upgrade needed
    request.onupgradeneeded = function () {
      const db = request.result;
      db.createObjectStore("songDataStorage", { keyPath: "dataSet" });    
    };
    //success
    request.onsuccess = function () {
      console.log("Database opened successfully");
      const db = request.result;
      const transaction = db.transaction("songDataStorage", "readwrite");    
      const store = transaction.objectStore("songDataStorage");
      //save data
      store.put({ 'dataSet': 1, 'uncompData': uncompressedData});
      store.put({ 'dataSet': 2, 'compData': compressedData});
    
      transaction.oncomplete = function () {
          db.close();
          window.location = 'display.html';
      };
    };
}

function processJson(url){
    import(url,{with:{type: 'json'}}).then((mod) => {
        let data = mod.default;
        saveToDB(data,compressData(data));
    });
}

/*function splitData(data){
    sessionStorage.setItem('dataChunks',Math.ceil(data.length/2500));
    let curChunk = 0;
    let chunk = [];
    for(let song of data){
        if(!data.indexOf(song)+1 % 2500 === 0){
            chunk.push(song);
        } else {
            sessionStorage.setItem(`uncompressed-song-data-${curChunk}`,JSON.stringify(chunk));
            chunk = [];
            curChunk++;
        }
    }
}*/

function compressData(data){
    let compressedData = {};
    for(let song of data){
        song.title = song.master_metadata_track_name;
        song.artist = song.master_metadata_album_artist_name;
        if(song.title && song.artist){
            if(!Object.keys(compressedData).includes(`${song.title}_${song.artist}`)){
                song.streams = 1;
                compressedData[`${song.title}_${song.artist}`] = song;
            } else {
                compressedData[`${song.title}_${song.artist}`].streams++;
            }
        }
    }
    return createSortedArray(compressedData);
}

function createSortedArray(data){
    array = Object.values(data).sort((a,b) => {
        return b.streams - a.streams;
    });
    return array;
}


