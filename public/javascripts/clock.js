let canvas, ctx;

function draw() {
    let time = (function () {
            let midnight = new Date();
            midnight.setHours(0);
            midnight.setMinutes(0);
            midnight.setSeconds(0);
            midnight.setMilliseconds(0);
            return Date.now() - midnight.getTime();
        })(),
        hours = time / (60 * 60 * 1000),
        minutes = hours * 60 % 60,
        seconds = minutes * 60 % 60,
        c = {
            x: canvas.width / 2,
            y: canvas.height / 2
        };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'round';

    secondHand();
    minuteHand();
    hourHand();
    face();

    function face() {
        // Border
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 250, 0, Math.PI * 2);
        ctx.stroke();

        // Dashes
        ctx.lineWidth = 3;
        for (let i = 0; i < 60; i++) {
            let r = 242,
                l = 5;
            if (i % 5 === 0)
                r -= l,
                l *= 2;
            let v = new Vector(r, Math.PI * 2 * (i / 60) - Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(v.getX() + c.x, v.getY() + c.y);
            v.setMag(r + l);
            ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
            ctx.stroke();
        }

        // Numbers
        ctx.font = '28px Noto Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            let v = new Vector(214, Math.PI * 2 * (i / 12) - Math.PI / 2);
            ctx.fillText(i, v.getX() + c.x, v.getY() + c.y);
        }

        // Center button
        ctx.beginPath();
        ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
        ctx.lineWidth = 6;
        ctx.fill();
        ctx.stroke();
    }

    function secondHand() {
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        let a = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
        let v = new Vector(185, a);
        let v2 = new Vector(-30, a);
        ctx.moveTo(v2.getX() + c.x, v2.getY() + c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function minuteHand() {
        ctx.lineWidth = 8;
        ctx.beginPath();
        let a = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
        let v = new Vector(185, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }

    function hourHand() {
        ctx.lineWidth = 8;
        ctx.beginPath();
        let a = Math.PI * 2 * (hours / 12) - Math.PI / 2;
        let v = new Vector(130, a);
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(v.getX() + c.x, v.getY() + c.y);
        ctx.stroke();
    }
}

function clock(mode) {
    canvas = document.getElementById('clock');
    canvas.width = canvas.height = 600;
    ctx = canvas.getContext('2d');

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    if(mode == 'night') {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
    }

    setInterval(draw, 10);
}