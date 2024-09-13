class Grid {
    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.grid = [];
        this.defVectorMagnitude = 0.5;

        // Noise stuff
        this.time = 0;
        this.noise_scale = 0.20;
        this.time_noise_scale = 0.001;
        let noise = openSimplexNoise(2);
        this.noise = noise.noise3D; // 2D noise function

        this.initFlowField();
    }
    initFlowField() {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                let v = p5.Vector.fromAngle(PI * this.noise(i*this.noise_scale, j*this.noise_scale, this.time));
                v.setMag(this.defVectorMagnitude);
                this.grid[i][j] = v;
            }
        }
    }

    updateVectors() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let val = this.noise(i*this.noise_scale, j*this.noise_scale, this.time*this.time_noise_scale)
                let v = p5.Vector.fromAngle(PI * val*2);
                v.setMag(this.defVectorMagnitude);
                this.grid[i][j] = v;
            }
        }
        this.time++;
    } 

    getVectorAt(x, y) {
        let i = floor(x / this.cellSize);
        let j = floor(y / this.cellSize);
        //print("x: " + x + " y: " + y);
        if ((i >= this.rows) || (j >= this.cols)) {
            print("Error: Out of bounds");
            print("i: " + i + " j: " + j);
            
        }
        return this.grid[i][j];
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
        vec = vec.copy().mult(15/this.defVectorMagnitude);

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