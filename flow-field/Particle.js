class Particle {
    color = color(255);
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.speedLimit = 4;
        this.prevPos = this.pos.copy();

        this.color = color(200, 200, 200, 15)
    }
    update() {
        this.prevPos = this.pos.copy();
        this.vel.add(this.acc);
        this.vel.limit(this.speedLimit);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.ensureEdges();
    }
    applyForce(force) {
        this.acc.add(force);
    }
    ensureEdges() {
        this.pos.x = (this.pos.x + width) % width;
        this.pos.y = (this.pos.y + height) % height;
    }
    draw() {

        stroke(this.color);
        strokeWeight(1);
        // Get the line size
        let line_v = createVector(this.pos.x, this.pos.y).sub(this.prevPos);
        if (line_v.mag() >= this.speedLimit) {
            point(this.pos.x, this.pos.y);
        }
        else{
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        }
        
        
    }
}