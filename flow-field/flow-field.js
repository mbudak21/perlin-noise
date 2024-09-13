let side = 600;
let grid_size = 20;
let grid;
let particle_count = 2000;
let particles = [];
let fr;

function setup() {
    createCanvas(side, side);
    background(51);
    fr = createP('');
    
    grid = new Grid(grid_size, grid_size, side/grid_size);
    for (let i = 0; i < particle_count; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    
    
    grid.updateVectors();
    for (let i = 0; i < particle_count; i++) {
        particles[i].ensureEdges();
        let force = grid.getVectorAt(particles[i].pos.x, particles[i].pos.y);
        particles[i].applyForce(force);
        particles[i].update();
        particles[i].draw();
    }
    //grid.drawVectors();
    fr.html(floor(frameRate()));
}
