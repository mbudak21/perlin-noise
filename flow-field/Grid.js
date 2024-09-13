class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = [];

        // Noise stuff
        this.time = 0;
        this.noise_scale = 0.20;
        this.time_noise_scale = 0.002;
        let noise = openSimplexNoise();
        this.noise = noise.noise3D; // 2D noise function

        this.initFlowField();
    }
    initFlowField() {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                let v = p5.Vector.fromAngle(PI * this.noise(i*this.noise_scale, j*this.noise_scale, this.time));
                v.setMag(20);
                this.grid[i][j] = v;
            }
        }
    }

    updateVectors() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let v = p5.Vector.fromAngle(PI * this.noise(i*this.noise_scale, j*this.noise_scale, this.time*this.time_noise_scale));
                v.setMag(20);
                this.grid[i][j] = v;
            }
        }
        this.time++;
    }



    drawVectors() {
        let myColor = color(255, 100);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let x = j * this.cellSize;
                let y = i * this.cellSize;
                this.drawArrow(x, y, this.grid[i][j], myColor);
            }
        }
    }

    //Reference: https://p5js.org/reference/p5.Vector/random2D/
    drawArrow(x, y, vec, color) {
        let stroke_weight = 2;
        let arrowSize = 4;

        push();
        stroke(color);
        strokeWeight(stroke_weight);
        fill(color);
        translate(x + this.cellSize/2, y + this.cellSize/2);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }
}