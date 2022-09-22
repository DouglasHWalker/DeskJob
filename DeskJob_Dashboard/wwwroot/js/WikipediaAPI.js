// WIKIPEDIA ------------------------------------------------------------------------
var wikiBase = "https://api.wikimedia.org/feed/v1/wikipedia/en/featured/";

function getWikiRequest() {
    var now = new Date();
    now.setHours(now.getHours() - 10);
    //now.setMinutes(now.getMinutes() - 30);
    var month = now.getMonth() + 1;
    if (month.toString().length == 1) { month = "0" + month; }
    var day = now.getDate().toString();
    if (day.length == 1) { day = "0" + day; }

    var url = wikiBase + now.getFullYear() + "/" + month + "/" + day;
    const request = new Request(url);

    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            showFeatured(data);
            showImageOfTheDay(data);
        })
        .catch(console.error);
}

function showImageOfTheDay(data) {
    document.getElementById("iotdCell").innerHTML = "<a href=" + data.image.file_page + "><img style='max-width: 300px; max-height: 300px;' src=" + data.image.image.source + " /></a>";
    let datatext = data.image.description.text;
    if (datatext.length > 80) { datatext = datatext.slice(0, 75) + "..." }
    document.getElementById("iotdCreditCell").innerHTML = datatext;
}

function showFeatured(data) {
    var wikiTable = document.getElementById("wikipedia");
    console.log(data);

    var mostread = data["mostread"];
    var onthisday = data["onthisday"];
    var news = data["news"];

    // header
    var thead = document.createElement("tr");

    var mrh = document.createElement("th");
    let title = "Wikipedia API is offline, sorry";
    if (mostread) { title = "Popular today" }
    else if (onthisday) {
        const date = new Date();

        const formattedDate = date.toLocaleString("en-AU", {
            day: "numeric",
            month: "long",
        });
        title = "On this day - " + formattedDate;
    }
    else if (news) { title = "News from Wikipedia" }
    mrh.innerHTML = title;
    thead.appendChild(mrh);

    //var nh = document.createElement("th");
    //nh.innerHTML = "In the News";
    //thead.appendld(nh);

    wikiTable.appendChild(thead);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement("tr");

        // most read
        var mr = document.createElement("td");
        let content = "";

        if (mostread) {
            let article = mostread["articles"][i];
            content = "<a href=" + article["content_urls"]["desktop"]["page"] + ">" + article["displaytitle"] + "</a>" + " - " + article["description"];
        }
        else if (onthisday) { content = onthisday[i]["year"] + " - " + onthisday[i]["text"]; }
        else if (news) { content = news[i]["story"].replace("(pictured)", ""); }

        mr.innerHTML = content;
        tr.appendChild(mr);

        // news
        //var n = document.createElement("td");
        //n.innerHTML =
        //tr.appendChild(n);

        // on this day
        //var otd = document.createElement("td");
        //otd.innerHTML =
        //tr.appendChild(otd);

        wikiTable.appendChild(tr);
    }

    // meme row
    //var tr = document.createElement("tr");
    //var n = document.createElement("td");
    //n.innerHTML = "UniSA students make a big impact at DXC. Students <a class='seea' href='https://www.youtube.com/watch?v=LjrcW-sDVM4'>Jack Beales</a>, <a class='seea' href='https://www.youtube.com/watch?v=35yj8u6oE_g'>Matt Caust</a>, and <a class='seea' href='https://www.youtube.com/watch?v=iik25wqIuFo'>Patrick Beevor</a> have stolen the show.";
    //tr.appendChild(n);
    //wikiTable.appendChild(tr);


}