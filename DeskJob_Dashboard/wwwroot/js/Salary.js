// PAY --------------------------------------------------------------
function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

let elapsedToday, elapsedThisWeek, elapsedThisPaycycle, elapsedThisMonth, elapsedInTotal = 0;

function calculateElapsed() {
    var now = new Date();
    var startDate = new Date(2023, 2, 13, 9, 0);
    var startTime = new Date();
    startTime.setHours(9, 0, 0, 0);
    var endTime = new Date();
    endTime.setHours(16, 30, 0, 0);

    // today
    var totalSecondsInDay = (endTime - startTime) / 1000;
    // Calculate the number of seconds since start of day
    elapsedToday = (now - startTime) / 1000;
    // if not past 9am
    if (elapsedToday <= 0) {
        elapsedToday = 0;
    } else if (elapsedToday >= totalSecondsInDay) { // if beyond 4:30
        elapsedToday = totalSecondsInDay;
    }
    // check if sat or sun
    if (startTime.getDay() == 0 || startTime.getDay() == 6) {
        elapsedToday = 0;
    }

    // weekly, fornightly, monthly, and total
    var numberOfBusinessDays = getBusinessDatesCount(startDate, now); // since startdate
    elapsedThisWeek = elapsedToday + ((startTime.getDay() - 1) * 7.5 * 60 * 60);
    elapsedThisWeek = (elapsedThisWeek > 0) ? elapsedThisWeek : 0;
    elapsedThisPaycycle = isPayWeek() ? elapsedThisWeek + (5 * 7.5 * 60 * 60) : elapsedThisWeek;
    elapsedThisMonth = elapsedThisPaycycle + (2 * (5 * 7.5 * 60 * 60));
    elapsedInTotal = elapsedToday + (numberOfBusinessDays * 7.5 * 60 * 60);
    calcElapsedToDisplay();
}


let elapsedTarget = "total";
function calcElapsedToDisplay() {
    if (elapsedTarget === "week") elapsedToDisplay = elapsedThisWeek;
    else if (elapsedTarget === "cycle") elapsedToDisplay = elapsedThisPaycycle;
    else if (elapsedTarget === "month") elapsedToDisplay = elapsedThisMonth;
    else if (elapsedTarget === "total") elapsedToDisplay = elapsedInTotal;
    else elapsedToDisplay = elapsedToday;
}

function setElapsedToDisplay(target) {
    elapsedTarget = target;
}

var baseSalary = 58149.53;

function earn() {
    calculateElapsed();

    var superContribution = document.getElementById("super").checked ? 0.895 : 1.0;
    var taxPayable = document.getElementById("tax").checked ? 1541.28 : 0;

    // Calculate the earnings per second
    //var earnPerSecond = (((58149.53 * 0.895) - 9365.42) / 52 / 5 / 7.5 / 60 / 60);
    let amountOfTaxWithoutThresholdClaim = 9365.42;
    let totalTaxPaidBasedOnTotalEarnt = 1541.28;
    var earnPerSecond = (((baseSalary * superContribution) - taxPayable) / 52 / 5 / 7.5 / 60 / 60); 

    displayEarnings(earnPerSecond);

    // reset interval for refreshing counter
    clearInterval(interval);
    interval = setInterval(earn, 2000);
}

function displayEarnings(earnPerSecond) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    cols = document.getElementById("standard").getElementsByTagName("td");

    cols[0].innerText = formatter.format(earnPerSecond * elapsedToday);
    //cols[1].innerText = formatter.format(earnPerSecond * elapsedThisWeek);
    cols[1].innerText = formatter.format(earnPerSecond * elapsedThisPaycycle);
    //cols[3].innerText = formatter.format(earnPerSecond * elapsedThisMonth);
    cols[2].innerText = formatter.format(earnPerSecond * elapsedInTotal);
}

function isPayWeek() {
    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var currWeek = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);
    // its a pay week if the week is odd
    let isPayWeek = (currWeek % 2 != 1);
    return isPayWeek;
}