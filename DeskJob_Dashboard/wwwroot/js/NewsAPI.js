// NEWS API ---------------------------------------------------------------------------------------
function newsAPI() {
    // 3b1cb599605f414bbceda8bfd2c8a3c3 - Test API
    // c3af4696522d486fb53b41c55939e9a6
    // 0bfbb23253ca4b41a14b1afc23e0dd8b
    // 513c776403bd40da97d145edbe0652a8
    var apis = ['c3af4696522d486fb53b41c55939e9a6', '0bfbb23253ca4b41a14b1afc23e0dd8b', '513c776403bd40da97d145edbe0652a8'];
    var API_KEY = apis[randomIntBetween(0, 2)];
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=au&' +
        // 'lanen&' +
        'pageSize100&' +
        'apiKey=' +
        API_KEY;

    var req = new Request(url);

    fetch(req)
        .then((response) => response.json())
        .then((data) => {
            showTopHeadlines(data);
        })
        .catch(console.error);
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function showTopHeadlines(data) {
    console.log(data);
    let newsTable = document.getElementById("news");
    let news = data["articles"];
    // header
    //let thead = document.createElement("tr");
    //let mrh = document.createElement("th");
    //mrh.innerHTML = "In the News";
    //thead.appendChild(mrh);

    //newsTable.appendChild(thead);

    for (let i = 0; i < news.length; i++) {
        let tr = document.createElement("tr");
        let mr = document.createElement("td");
        let article = news[i];
        mr.innerHTML = article["title"] + " - " + "<a href=" + article["url"] + ">View</a>";
        tr.appendChild(mr);

        newsTable.appendChild(tr);
    }
}

function refreshNews() {
    // refresh the news table every 30 minutes
}