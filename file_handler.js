var fileInput = document.getElementById('file_input');
function fileHandler(file){
    if(!file){ //only do this if a file has not been input to the function. This is because when a file is input, it is because it has been dropped in instead of being chosen, and it can just go to be read
        //when a file is input, read it as text
        fileInput.addEventListener('change', function () {
            for(let i=0;i<fileInput.files.length;i++){
                let fileR = new FileReader();
                //send the read file to be processed when the read is completed; onload means it has been completed
                fileR.onload = () => {
                    document.getElementById('choose').innerText = 'Processing...';
                    processJson(fileR.result);
                }
                let curFile = fileInput.files[i];
                fileR.readAsDataURL(curFile);
            }
        })
        fileInput.click();
    } else {
        let fileR = new FileReader();
        //send the read file to be processed when the read is completed; onload means it has been completed
        fileR.onload = () => {
            document.getElementById('choose').innerText = 'Processing...';
            processJson(fileR.result);
        }
        fileR.readAsDataURL(file);
    }
}

//stop the dropped file from opening like it normally would
function dragOver(event){
    event.preventDefault();
}
//send the dropped file to the file reader
function dropHandler(event){
    event.preventDefault();
    const file = event.dataTransfer.items[0].getAsFile();
    fileHandler(file);
}