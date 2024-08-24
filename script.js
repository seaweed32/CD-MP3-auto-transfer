var fileInput = document.getElementById('file_input');

document.getElementById('file_input_button').addEventListener('click', () => fileHandler());

function fileHandler(file){
    if(!file){ //only do this if a file has not been input to the function. This is because when a file is input, it is because it has been dropped in instead of being chosen, and it can just go to be read
        //when a file is input, read it as text
        fileInput.addEventListener('change', function () {
            for(let i=0;i<fileInput.files.length;i++){
                let fileR = new FileReader();
                //send the read file to be processed when the read is completed; onload means it has been completed
                fileR.onload = () => {
                    //processText(fileR.result);
                    console.log(fileR.result);
                }
                let curFile = fileInput.files[i];
                fileR.readAsText(curFile);
            }
        })
        fileInput.click();
    } else {
        for(let i=0;i<fileInput.files.length;i++){
            let fileR = new FileReader();
            //send the read file to be processed when the read is completed; onload means it has been completed
            fileR.onload = () => {
                //processText(fileR.result);
                console.log(fileR.result);
            }
            let curFile = fileInput.files[i];
            fileR.readAsText(curFile);
        }
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
