function calcEarnPerSecond(cycleTarget) {
    var baseSalary = 58149.53;
    var now = new Date();

    var startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    var endTime = new Date();
    endTime.setHours(16, 30, 0, 0);

    // Calculate the number of seconds since start of day
    var totalSecondsInDay = (endTime - startTime) / 1000;

    var timeElapsed = (now - startTime) / 1000;
    if (timeElapsed <= 0) {
        timeElapsed = 0
    } else if (timeElapsed >= totalSecondsInDay) {
        timeElapsed = totalSecondsInDay;
    }
    // check if sat or sun
    if (now.getDay() == 0 || now.getDay() == 6) {
        timeElapsed = 0;
    }

    var superContribution = document.getElementById("super").checked ? 0.895 : 1.0;
    var taxPayable = document.getElementById("tax").checked ? 1541.28 : 0;

    // Calculate the earnings per second
    // var earnPerSecond = (((58149.53 * 0.895) - 9365.42) / 52 / 5 / 7.5 / 60 / 60);
    var earnPerSecond = (((baseSalary)) / 52 / 5 / 7.5 / 60 / 60); // Correct
    var afterSuper = (((baseSalary * superContribution)) / 52 / 5 / 7.5 / 60 / 60); // Correct
    var afterTax = (((baseSalary * superContribution) - taxPayable) / 52 / 5 / 7.5 / 60 / 60); // Correct
    earnPerSecond = afterTax;

    return timeElapsed * earnPerSecond
}

var particleAlphabet = {
    Particle: function (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 3.5;
        this.draw = function (ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillStyle = 'rgba(205, 205, 205)';
            ctx.fillRect(0, 0, this.radius, this.radius);
            ctx.restore();
        };
    },
    init: function () {
        particleAlphabet.canvas = document.querySelector('canvas');
        particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
        particleAlphabet.W = window.innerWidth;
        particleAlphabet.H = window.innerHeight;
        particleAlphabet.particlePositions = [];
        particleAlphabet.particles = [];
        particleAlphabet.tmpCanvas = document.createElement('canvas');
        particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');

        particleAlphabet.canvas.width = particleAlphabet.W;
        particleAlphabet.canvas.height = particleAlphabet.H;

        setInterval(function () {
            particleAlphabet.changeLetter();
            particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
        }, 2000);

        particleAlphabet.makeParticles(4000);
        particleAlphabet.animate();
    },
    currentPos: 0,
    changeLetter: function () {
        var earnPerSecond = calcEarnPerSecond();

        particleAlphabet.time = ("$" + (earnPerSecond).toFixed(2));
    },
    makeParticles: function (num) {
        for (var i = 0; i <= num; i++) {
            particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 - 200));
        }
    },
    getPixels: function (canvas, ctx) {
        var keyword = particleAlphabet.time,
            gridX = 5,
            gridY = 5;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = 'red';
        ctx.font = '300 22vw Open Sans';
        ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 100);
        var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var buffer32 = new Uint32Array(idata.data.buffer);

        if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
        for (var x = 0; x < canvas.width; x += gridX) {
            for (var y = 0; y < canvas.width; y += gridY) {
                if (buffer32[y * canvas.width + x]) {
                    particleAlphabet.particlePositions.push({ x: x, y: y });

                }
            }
        }
    },
    animateParticles: function () {
        var p, pPos;
        for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
            p = particleAlphabet.particles[i];
            pPos = particleAlphabet.particlePositions[i];
            if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
                p.x += (pPos.x - p.x) * .1;
                p.y += (pPos.y - p.y) * .1;
                p.draw(particleAlphabet.ctx);
            }
        }
    },
    animate: function () {
        requestAnimationFrame(particleAlphabet.animate);
        particleAlphabet.ctx.fillStyle = 'rgba(17, 17, 17)';
        particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
        particleAlphabet.animateParticles();
    }
};

window.onload = particleAlphabet.init;

