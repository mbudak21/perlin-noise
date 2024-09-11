let width = 600;
let height = 600;
let graph_speed = 0.010;

var xoff = 0;

function setup() {
  createCanvas(width, height);
}

function draw() {
    background(51);
    stroke(255);
    noFill();
    beginShape();
    for (var x = 0; x < width; x++) {
        var y = noise(xoff)*width;
        ellipse(x, y, 5, 5);
        xoff += 0.01;
    }
    xoff += graph_speed - (width*0.01); // adjust for the next frame
    endShape();
    
}