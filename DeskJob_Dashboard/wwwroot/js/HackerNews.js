// Hacker News -------------------------------------------------------------------------------------
let newsInitBase = "https://hacker-news.firebaseio.com/v0/topstories.json";
let newsBase = "https://hacker-news.firebaseio.com/v0/item/";

function getNewsRequest() {

    var url = newsInitBase;
    const request = new Request(url);

    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            showNews(data);
        })
        .catch(console.error);
}

function getNewsArticle(id) {

    var url = newsBase + id + ".json";
    const request = new Request(url);

    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            getArticleContent(data);
        })
        .catch(console.error);
}

async function showNews(data) {
    //var newsTable = document.getElementById("news");

    // header
    //var thead = document.createElement("tr");
    //var mrh = document.createElement("th");
    //let title = "Tech News";
    //mrh.innerHTML = title;
    //thead.appendChild(mrh);
    //newsTable.appendChild(thead);

    let ids = data.slice(0, 4);
    console.log(ids);
    for (let id of ids) {
        getNewsArticle(id);
    }
}

function getArticleContent(data) {
    var newsTable = document.getElementById("news");
    var tr = document.createElement("tr");
    var mr = document.createElement("td");

    let { id, deleted, type, by, time, dead, kids, text, url, title, score } = data;
    const date = new Date(time);
    const formattedDate = date.toLocaleString("en-AU", {
        hour: '2-digit',
        minute: "numeric",
    });

    let content = title + " - " + "<a href=" + url + ">View</a></br>";
    mr.innerHTML = content;

    tr.appendChild(mr);
    newsTable.appendChild(tr);
}