class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        //this.speedLimit = 4;
        this.frictionCoeff = 0.1;
        this.prevPos = this.pos.copy();
    }
    update() {
        this.prevPos = this.pos.copy();

        let friction = this.vel.copy().mult(-1);
        friction.mult(this.frictionCoeff);
        this.applyForce(friction);
        
        this.vel.add(this.acc);
        //this.vel.limit(this.speedLimit);

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
    draw(color) {
        stroke(color);
        strokeWeight(2);
        //point(this.pos.x, this.pos.y);
        // Get the line size
        let line_v = createVector(this.pos.x, this.pos.y).sub(this.prevPos);
        if (line_v.mag() >= 8) {
            point(this.pos.x, this.pos.y);
        }
        else{
            line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        }
    }
}