let side = 600;
let time = 0;


function setup() {
  createCanvas(side, side);
  pixelDensity(1);
  
}

function draw() {
    var xoff = 0;
    var yoff = 0;
    var inc = 2;
    background(51);
    noiseDetail(5, 0.6);

    loadPixels()
    
    for (var y = 0; y < side; y++) {
        for (var x = 0; x < side; x++) {
            var index = (x + y * side) * 4;
            var bright = noise(xoff*inc, yoff*inc, time)*255;
            pixels[index + 0] = bright;
            pixels[index + 1] = bright;
            pixels[index + 2] = bright;
            pixels[index + 3] = 255;
            xoff += 0.01;
        }
        xoff = 0;
        yoff += 0.01;
    }
    updatePixels();
    time += 0.1;
}