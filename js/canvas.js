// Colors
// Black Pearl (Kuler)
// #000;
// #001919;
// #0D1F21;
// #374C4C;
// #576869;


// Globals
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');
fitToContainer(canvas);

// Mouse Object
var mouse = {
    x: undefined,
    y: undefined
}

// Line Object
function Line(x, y, xTo, yTo){
    this.x = x;
    this.y = y;
    this.xTo = xTo;
    this.yTo = yTo;
    this.draw = function(){
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(xTo, yTo);
        c.lineWidth = 0.1;
        c.strokeStyle = "#000";
        c.stroke();
        c.closePath();
    }
}

// Circle Object
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        // c.stroke();
        c.closePath();
    }

    this.update = function() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        for(var i = 0; i < circleArray.length; i++){
            if(circleArray[i].x - this.x < 50 && circleArray[i].x - this.x > -50
                && circleArray[i].y - this.y < 50 && circleArray[i].y -this.y > -50)
            {
                var line1 = new Line(this.x, this.y, circleArray[i].x, circleArray[i].y);
                line1.draw();
            }
        }

        this.draw();
    }
}

var maxDistance = 100;

var colorArray = [
    "#001919",
    "#0D1F21",
    "#374C4C",
    "#576869"
];

var circleArray = [];

for(var i = 0; i < Math.floor(window.innerWidth * 0.125); i++) {
    var radius = (Math.random() * 2);
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 0.25;
    var dy = (Math.random() - 0.5) * 0.25;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

animate();

function init(){
    circleArray = [];
    for(var i = 0; i < Math.floor(window.innerWidth * 0.125); i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (window.innerWidth - radius * 2) + radius;
        var y = Math.random() * (window.innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 0.25;
        var dy = (Math.random() - 0.5) * 0.25;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y + $(window).scrollTop();
});

window.addEventListener('resize', function(){
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    init();
});

function fitToContainer(canvas){
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}


