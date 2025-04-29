//Quote of the day
if(document.getElementById("quote")){
    fetch("https://zenquotes.io/api/random")
        .then(res => res.json())
        .then(data =>{
            document.getElementById("quote").textContent = ' "' + data[0].q + '"' + " - " + data[0].a;

        })
}
//Voice functions
function startVoice(){
    if (annyang){
        const commands = {
            'hello': () => alert('Hello World'),
            'change color to *color': (color) => document.body.style.backgroundColor = color,
            'navigate to *page': (page) => {
                const target = page.toLowerCase();
                if (target === 'home') window.location.href = 'Kazi_Assignment2_Home.html';
                else if (target === 'stocks') window.location.href = 'Kazi_Assignment2_Stocks.html';
                else if (target === 'dogs') window.location.href = 'Kazi_Assignment2_Dogs.html';
            }
        }
        annyang.addCommands(commands);
        annyang.start();
    }
}
function stopVoice(){
    if(annyang){
        annyang.abort();
    }
}
//Stock Functions
function lookupStock(){
    const ticker = document.getElementById("stock_ticker").value.trim();
    if(!ticker){
        alert("Please enter a ticker symbol.");
        return;
    }
    const days = document.querySelector('input[name="days"]:checked').value;

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - parseInt(days));

    const toStr = toDate.toISOString().split('T')[0];
    const fromStr = fromDate.toISOString().split('T')[0];

    const API_KEY = "POLYGON_API_KEY";

    fetch("https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromStr}/${toStr}?apiKey=${API_KEY}")
        .then(res => res.json())
        .then(data => {
            
        })

}
//Dog Functions
function loadDogPics(){
    fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
        
    })
}