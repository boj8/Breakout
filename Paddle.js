// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 35;
Paddle.prototype.halfHeight = 8;
Paddle.prototype.velocity = 7;

Paddle.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT]) {
        if(this.cx - this.halfWidth > 0){
            this.cx -= this.velocity * du;
        }
    } else if (g_keys[this.GO_RIGHT]) {
        if(this.cx + this.halfWidth < g_canvas.width){
            this.cx += this.velocity * du;
        }
    }
};

Paddle.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillStyle = "black";
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

Paddle.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var paddleEdge = this.cy;
    // Check Y coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

// Resets paddle in the middle
Paddle.prototype.reset = function(){
    this.cx = g_canvas.width/2;
    this.cy = g_canvas.height - 20;
    this.velocity = 7;
}