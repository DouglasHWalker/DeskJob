// JavaScript source code

var interns = ["Maxwell Wearing", "Matthew Caust", "Douglas Hudson Walker", "Jack Beales", "Joshua Centofanti", "Aimee Mettke",
    "Patrick Beevor", "Jack Bloffwitch", "Vinh Duong", "Nicholas Howie", "O.J. Lagunay", "Kristy Nguyen", "Sean Phillips", "Harman Singh",
    "Niko Tayag", "Eric Wyten"];
var jobs = ["CEO", "Sandwich Artist", "Wikifeet Collaborator", "Donut Fetcher", "Unemployed", "Elon Musk", "Santa Claus"];
var titles = ["Prime Minister", "Queen", "President of the United States"];
var companies = ["Third Kind ICT", "Cyclops ICT Consulting", "JANKO", "Wikifeet", "JLNP IT Consulting", "DXC"];
var millionaires = ["Elon Musk", "Scott Morrison", "Kim Kardashion", "Donald Trump", "Steve Jobs", "Bill Gates", "Jeff Bezos",];
var sins = ["murder", "embezzling", "dealing of illicit substances", "possession of illicit substances", "Tax fraud", "communism", "having bad taste",
    "devil worship", "espionage", "treason", "multiple manslaughter", "driving under the influence", "internet piracy", "piracy (like in hit game 'Sea of Thieves')"];
var heroes = ["Superman", "Spiderman", "Batman", "The Punisher", "Doctor Strange", "Thor"];
var others = heroes.concat(millionaires);
var people = others.concat(interns);

var templates = [
    "@p was found dead! @i was arrested at the scene of the crime, covered in blood!",
    "@i was promoted within DXC to the role of @j",
    "Congratulations @i and @p on a beautiful wedding!",
    "Congratulations @i and @p on their newborn child, whom they have chosen to name '@p'!",
    "Happy @nth birthday @i! May you have many more happy years of life",
    "A $@nm lottery was just won by Adelaide's own @i! When asked what they would do with the money, they responded 'Meat Trays.'",
    "@i and @p were just arrested as part of a police sting on the Aussie Mafia!",
    "@i was just arrested for dealing illicit substances to @i!",
    "@i just died of old age, surrounded by loved ones. They are survived by their partner and their @n children.",
    "@i was just sworn in as the @t, after being voted into the position by @n% of the population!",
    "@m has just invested $@nm in small startup '@c'!",
    "@c has come under fire after the CEO was arrested for @s!",
    "@i was just arrested for @s!",
    "Our hearts go out to @i, who just reunited with their Nigerian Prince Grand-Uncle, @p",
    "Rumours abound that the incredible @p is actually just the mild mannered @i!",
    "Gold-digger or lovestruck fool?? @i has been photographed on a date with @m!",
    "@i is the prophecised hero?? Sloshed Seer spills secrets!",
    "@i is the prophecised World-Ender, Destroyer of Earth?? Stoned Warlock reveals Ancient Lore!",
    "@i, @p and @p embroiled in a vicious love triangle! Can they push through the drama and find true love??",
    "In a shocking turn of events, the jury has unanimously declared @i innocent of @s! Will this maniac be allowed to return to the streets???",
    "'Love, Lies and @s', @i tells all in their latest memoir.",
    "@i was fired from DXC for @s!",
];
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function insertValue(template, placeholderCode, valueArray) {
    while (template.includes(placeholderCode))
        template = template.replace(placeholderCode, valueArray[randomIntBetween(0, valueArray.length - 1)]);
    return template
}

function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function GoodNewsMeme() {
    setTimeout(getHeadline, 1000);
}

function getHeadline() {
    // get the table and insert a headline into a random location
    let table = document.getElementById("news");
    let randRowIndex = randomIntBetween(1, table.getElementsByTagName("tr").length -1);
    let row = table.insertRow(randRowIndex);
    let cell = row.insertCell(0);


    var arrays = [[...templates], [...interns], [...jobs], [...titles], [...companies],
    [...millionaires], [...sins], [...heroes], [...people], [...others]]
    //for (var array in arrays) {
    //    array = shuffle(array)
    //}
    template = arrays[0][randomIntBetween(0, templates.length -1)];

    headline = insertValue(template, "@i", arrays[1]);
    headline = insertValue(headline, "@j", arrays[2]);
    headline = insertValue(headline, "@t", arrays[3]);
    headline = insertValue(headline, "@c", arrays[4]);
    headline = insertValue(headline, "@m", arrays[5]);
    headline = insertValue(headline, "@s", arrays[6]);
    headline = insertValue(headline, "@h", arrays[7]);
    headline = insertValue(headline, "@p", arrays[8]);
    headline = insertValue(headline, "@o", arrays[9]);
    headline = insertValue(headline, "@n", [Math.round((Math.random() * 100))]);

    cell.innerHTML = "Breaking News! " + headline;
}

//for (x = 0; x < 20; x++)
//    Console.Log(getHeadline())