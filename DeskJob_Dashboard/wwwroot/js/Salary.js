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

var baseSalary = 58149.53;

function earn() {
    var superContribution = document.getElementById("super").checked ? 0.895 : 1.0;
    var taxPayable = document.getElementById("tax").checked ? 1541.28 : 0;

    var now = new Date();
    // Calculate the earnings per second
    //var earnPerSecond = (((58149.53 * 0.895) - 9365.42) / 52 / 5 / 7.5 / 60 / 60);
    var earnPerSecond = (((baseSalary)) / 52 / 5 / 7.5 / 60 / 60); // Correct
    var afterSuper = (((baseSalary * superContribution)) / 52 / 5 / 7.5 / 60 / 60); // Correct
    var afterTax = (((baseSalary * superContribution) - taxPayable) / 52 / 5 / 7.5 / 60 / 60); // Correct
    earnPerSecond = afterTax;

    // start date
    var startDate = new Date(2022, 6, 18, 9, 0);

    var startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    var endTime = new Date();
    endTime.setHours(16, 30, 0, 0);


    // Calculate the number of seconds since start of day
    var totalSecondsInDay = (endTime - startTime) / 1000;

    // today
    var today = new Date();
    today.setHours(9, 0, 0, 0);
    var timeElapsed = (now - startTime) / 1000;
    if (timeElapsed <= 0) {
        timeElapsed = 0;
    } else if (timeElapsed >= totalSecondsInDay) {
        timeElapsed = totalSecondsInDay;
    }
    // check if sat or sun
    if (today.getDay() == 0 || today.getDay() == 6) {
        timeElapsed = 0;
    }


    // week
    var week = timeElapsed + ((today.getDay() - 1) * 7.5 * 60 * 60);
    // fortnight - fix up scope to current pay scale (forttnight)
    var fortnight = isPayWeek() ? week + (5 * 7.5 * 60 * 60) : week;
    // month
    var month = fortnight + (2 * (5 * 7.5 * 60 * 60));
    // total: TODO - Total
    var numberOfBusinessDays = getBusinessDatesCount(startDate, now);
    var total = timeElapsed + (numberOfBusinessDays * 7.5 * 60 * 60);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    populateData(earnPerSecond, "standard");

    function populateData(data, tagId) {
        cols = document.getElementById(tagId).getElementsByTagName("td");

        cols[0].innerText = formatter.format(data * timeElapsed);
        cols[1].innerText = formatter.format(data * week);
        cols[2].innerText = formatter.format(data * fortnight);
        cols[3].innerText = formatter.format(data * month);
        cols[4].innerText = formatter.format(data * total);
    }


    clearInterval(interval);
    interval = setInterval(earn, 1000);
    // TODO: stop the inteval if running on seoncd click
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

function wip() {
    alert(`\
                                                            ___________________________________¶¶¶¶
                                                            ________________________¶¶¶¶____¶¶¶¶11¶
                                                            ________________________¶¶1¶¶_¶¶¶¶1111¶
                                                            _______________________¶¶111¶¶¶1111111¶
                                                            ___________________¶¶¶_¶1111¶¶1111111¶
                                                            ___________________¶11¶¶111¶¶111111¶¶
                                                            ___________________¶11¶1111¶111111¶¶
                                                            __________________¶¶11¶111¶111111¶¶
                                                            __________________¶11¶111¶¶111111¶
                                                            __________________¶11¶111¶1111111¶
                                                            _________________¶11¶111¶11111111¶
                                                            _________________¶1¶111¶¶1111111¶¶
                                                            ________________¶1¶¶111¶1111111¶¶
                                                            _______________¶¶1¶111¶1111111¶¶
                                                            _______________¶¶¶111¶11111111¶
                                                            ______________¶¶¶11¶¶111111111¶
                                                            ______________¶¶11¶¶111111¶¶¶1¶¶
                                                            _____________¶11¶¶1111111¶111111¶¶
                                                            ___________¶¶¶¶¶1111111¶¶11111111¶¶¶
                                                            __________¶¶¶1111111¶¶1111111111111111¶¶¶
                                                            _________¶¶111111¶¶¶11111111111111111111¶¶¶¶
                                                            _________¶111111¶¶1111111111111111111111111¶¶¶
                                                            _________¶111111¶1111111111¶¶¶111111111111111¶
                                                            ________¶11111111111111111¶¶_¶¶¶¶¶¶¶¶11111111¶
                                                            _______¶¶111111111111111¶¶¶________¶11111111¶¶
                                                            _______¶11111111111¶¶¶¶¶¶__________¶11111111¶
                                                            ______¶¶11111111111¶¶_____________¶¶11111¶¶
                                                            ______¶111111111111¶______________¶¶11111¶
                                                            _____¶¶111111111111¶________________¶¶¶¶¶¶¶¶¶¶¶¶
                                                            _____¶1111111111111¶________________¶¶¶111111¶¶¶¶
                                                            _____¶1111111111111¶¶_____________¶¶¶111111¶¶¶11¶
                                                            ____¶¶1111111111111¶¶¶_________¶¶¶1111111¶¶11111¶
                                                            ____¶1111111111111111¶¶¶¶¶¶¶¶¶¶¶111111111¶1111¶¶
                                                            ____¶111111111111111111¶¶¶¶11111111111111¶¶¶¶¶¶
                                                            ___¶111111111111111111111111111111111111111¶¶¶
                                                            __¶111111111111111111111111111111111111111¶¶
                                                            ¶¶11111111111111111111111111111111111111¶¶¶
                                                            111111111111111111111111111111111¶¶¶¶¶¶¶¶
                                                            111111111111111111111111111111¶¶¶¶
                                                            1111111111111111111111111111¶¶¶
                                                            111111111111111111111111111¶¶
                                                            1111111111111111111111111¶¶
                                                            111111111111111111111111¶¶
                                                            1111111111111111111111¶¶
                                                            111111111111111111¶¶¶¶
                                                            111111111¶¶¶¶¶¶¶¶¶¶
                                                            111111¶¶¶
                                                            ¶¶¶¶¶¶¶
                                                            I'm working on it.'
                                                            `);
}