// WEATHER -------------------------------------------------------------------
let api_dict = {
    current: 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/5070?apikey=rKaK96uaLSxDh1NGZHZsGa1GRkhHkpGv&details=true&metric=true',
    five_day: 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/5070?apikey=rKaK96uaLSxDh1NGZHZsGa1GRkhHkpGv&details=true&metric=true',
    twelve_hour: 'https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/19423?apikey=rKaK96uaLSxDh1NGZHZsGa1GRkhHkpGv&details=true&metric=true'
};

function getRequest(url) {
    const request = new Request(url);

    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            getCurrentWeather(data);
        })
        .catch(console.error);
}

function getCurrentWeather(data) {
    weatherCurrentTableHeader = document.getElementById("weather");
    weatherCurrentTableRow = document.getElementById("temp");
    weatherCurrentTableRain = document.getElementById("rain");

    let numHours = 6
    for (var i = 0; i < numHours; i++) {
        // TIME - HEADER
        var th = document.createElement('th');
        time = new Date(data[i]['DateTime']);
        th.innerHTML = ConvertTime(time);
        // TEMP
        var temp = document.createElement('td');
        temp.innerHTML = data[i]['RealFeelTemperature']["Value"] + '\u00B0' + "C";
        // rain chance
        var rain = document.createElement('td');
        rain.innerHTML = data[i]['RainProbability'] + "%";


        weatherCurrentTableHeader.appendChild(th);
        weatherCurrentTableRow.appendChild(temp);
        weatherCurrentTableRain.appendChild(rain);
    }
}

function ConvertTime(time) {
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ' ' + ampm;
    return strTime;
}