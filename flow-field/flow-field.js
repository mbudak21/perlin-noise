let side = 600;
let grid_size = 20;
let grid;
let particle_count = 500;
let particles = [];
let fr;

let hue;
let particleColor;

function setup() {
    createCanvas(side, side);
    background(51);
    fr = createP(''); // Frame rate

    colorMode(HSB, 360, 100, 100, 100);
    hue = random(360); // Randomize starting hue
    particleColor = color(hue, 100, 100, 15);
    
    grid = new Grid(grid_size, grid_size, side/grid_size);
    for (let i = 0; i < particle_count; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    grid.updateVectors();
    //background(51);
    for (let i = 0; i < particle_count; i++) {
        let force = grid.getVectorAt(particles[i].pos.x, particles[i].pos.y);
        particles[i].ensureEdges();
        particles[i].applyForce(force);
        particles[i].update();
        particles[i].draw(particleColor);
    }
    hue = (hue + 0.1) % 360; // Slowly change the hue
    particleColor = color(hue, 65, 65, 3); // Update the color
    //grid.drawVectors();
    //noLoop();
    fr.html(floor(frameRate()));
}
