//Quote of the day
if(document.getElementById("quote")){
    fetch("https://zenquotes.io/api/random")
        .then(res => res.json())
        .then(data =>{
            document.getElementById("quote").textContent = '"' + data[0].q + '"' + " - " + data[0].a;

        })
}
//Voice functions
function startVoice(){
    
}
function stopVoice(){

}
//Stock functions