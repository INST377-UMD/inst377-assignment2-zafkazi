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
        populateRedditTable(top5Stocks);
    })
}
function populateRedditTable(stocks){
    const tBody = document.querySelector("#redditTable tBody");
    tBody.innerHTML = "";

    stocks.forEach(stock => {
        const tr = document.createElement("tr");
        const tdTicker = document.createElement("td");
        const a = document.createElement("a");

        a.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        a.textContent = stock.ticker;
        a.target = "_blank";
        tdTicker.appendChild(a);

        const tdCommentCount = document.createElement("td");
        tdCommentCount.textContent = stock.comment_count;

        const tdSentiment = document.createElement("id");
        if (stock.sentiment.toLowerCase() === "bullish"){
            tdSentiment.textContent = "Bullish 🚀";
        }
        else if (stock.sentiment.toLowerCase() === "bearish"){
            tdSentiment.textContent = "Bearish 🐻";
        }
        else {
            tdSentiment.textContent = stock.sentiment;
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