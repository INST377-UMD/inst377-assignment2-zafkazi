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
let myChart;
function stockData(ticker, from, today) {
    console.log("in the function");
    return fetch(
      "https://api.polygon.io/v2/aggs/ticker/" +
        ticker.toUpperCase() +
        "/range/1/day/" +
        from +
        "/" +
        today +
        "?apiKey=w7kSxJwDJLQmPqPziHhR6ZTt63DCbrKH"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data.results;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
async function lookupStock(){
    const ticker = document.getElementById("ticker").value;

    if(!ticker){
        alert("Please enter a ticker symbol.");
        return;
    }
    const days = document.getElementById('selectStock').value;
    console.log(days);
    console.log(ticker);
    const toDate = new Date();

    const toStr = toDate.getTime();
    const fromStr = toDate.getTime() - days*24*60*60*1000;

    const date1 = [];
    const cost1 = [];
    let data = await stockData(ticker, fromStr, toStr);
    data.forEach((item) => date1.push(new Date(item.t).toLocaleDateString()));
    data.forEach((item) => cost1.push(item.c));
        const ctx = document.getElementById("myChart");

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: "line",
            data: {
            labels: date1,
            datasets: [
                {
                label: "Price of stock",
                data: cost1,
                borderWidth: 1,
                },
            ],
            },
            options: {
            scales: {
                y: {
                beginAtZero: true,
                },
            },
            },
        });   

}


function fetchRedditStock(){
    fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
    .then(res => res.json())
    .then(data => {
        const top5Stocks = data.slice(0,5);
        console.log(top5Stocks);
        populateRedditTable(top5Stocks);
    })
}
function populateRedditTable(stocks){
    const tBody = document.getElementById("redditTable");

    stocks.forEach(stock => {
        const tr = document.createElement("tr");
        const tdTicker = document.createElement("td");
        const a = document.createElement("a");

        a.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        a.textContent = stock.ticker;
        a.target = "_blank";
        tdTicker.appendChild(a);

        const tdCommentCount = document.createElement("td");
        tdCommentCount.innerHTML = stock.no_of_comments;

        const tdSentiment = document.createElement("id");
        if (stock.sentiment.toLowerCase() === "bullish"){
            tdSentiment.innerHTML = "Bullish 🚀";
        }
        else if (stock.sentiment.toLowerCase() === "bearish"){
            tdSentiment.innerHTML = "Bearish 🐻";
        }
        else {
            tdSentiment.innerHTML = stock.sentiment;
        }

        tr.appendChild(tdTicker);
        tr.appendChild(tdCommentCount);
        tr.appendChild(tdSentiment);

        tBody.appendChild(tr);
    });
}

if (annyang){
    annyang.addCommands({
        'lookup *stock:': (stock) => {
            document.getElementById('ticker').value = stock.toUpperCase();
            lookupStock();
        }
    });
}
//Dog Functions
function loadDogImages(){
    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(res => res.json())
    .then(data => {
        if(data.status === "success"){
            displayDogImages(data.message);
        }
        else{
            alert("Error loading dog images.");
        }
    });
}
function displayDogImages(images){

}
function loadDogBreeds(){
    fetch(`https://dogapi.dog/api/v2/breeds`)
}
function createBreedButton(){
    const container = document.getElementById("breed_buttons");
    container.innerHTML="";
    breeds.forEach(breed => {
        const btn = document.createElement("button");
        btn.className = "custom-button";
        btn.textContent = breed;
        btn.addEventListener("click", ()=> fetchBreedInfo(breed));
        container.appendChild(btn);
    });
}
function fetchBreedInfo(){

}
if (annyang){
    annyang.addCommands({
        'load dog breed *breed': (breed) => {
            fetchBreedInfo(breed.trim()).toLowerCase();
        }
    });
}
window.onload = fetchRedditStock();
window.onload = loadDogImages();
window.onload = loadDogBreeds();