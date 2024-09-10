var xoff = 0;
var yoff = 1000;
function setup() {
  createCanvas(600, 600);
}

function draw() {
    background(51);
    var x = map(noise(xoff), 0, 1, 0, width);
    var y = map(noise(yoff), 0, 1, 0, height);
    xoff += 0.01;
    yoff += 0.01;
    ellipse(x, y, 24, 24);
}