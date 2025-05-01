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
    const ticker = document.getElementById("ticker").value;

    if(!ticker){
        alert("Please enter a ticker symbol.");
        return;
    }
    const days = document.getElementById('selectStock').value;

    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(toDate.getDate() - parseInt(days));

    const toStr = toDate.getTime();
    const fromStr = toDate.getTime() - days*24*60*60*1000;

    const API_KEY = "POLYGON_API_KEY";
    //https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromStr}/${toStr}?apiKey=${API_KEY}
    fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2025-01-09/2025-02-10?adjusted=true&sort=asc&limit=120&apiKey=w7kSxJwDJLQmPqPziHhR6ZTt63DCbrKH`)
        .then(res => res.json())
        .then(data => {
            if(data.results && data.results.length > 0){
                const labels = data.labels.map(items => {
                    let date = new Date(items.t);
                    return date.toLocaleDateString();
                });
                const prices = data.results.map(item => item.c);

                renderChart(labels, prices, ticker);
            }
            else{
                alert("No data found for this ticker" + ticker);
            }
        })

}
function renderChart(labels, dataPoints, ticker){
    const charting = document.getElementById('stockChart').getContext('2d');
    console.log(labels);
    console.log(dataPoints);
    console.log(ticker);
    if (stockChart) stockChart.destroy();
    stockChart = new Chart(charting, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: ticker + "Closing Prices",
                data: dataPoints,
                borderColor: 'red',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {display: true},
                y: {display: true}
            }
        }
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
function loadDogPics(){
    fetch("https://dog.ceo/api/breeds/image/random/10")
    .then(res => res.json())
    .then(data => {
        
    })
}

window.onload = fetchRedditStock();