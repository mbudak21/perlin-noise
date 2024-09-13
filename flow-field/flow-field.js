let side = 600;
let grid_size = 20;
let grid;

function setup() {
    createCanvas(side, side);
    grid = new Grid(grid_size, grid_size, side/grid_size);
}

function draw() {
    background(51);
    grid.updateVectors();
    grid.drawVectors();
}
