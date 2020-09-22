// ==========
// BALL STUFF
// ==========

// BALL STUFF
var KEY_S = 'S'.charCodeAt(0);

var g_ball = {
    cx: 165,
    cy: 300,
    radius: 7,

    xVel: 0,
    yVel: 0,

    DROP: KEY_S
};

g_ball.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Check if I hit a brick and if I did bounce of it in the right direction
    var side = g_wall.collidesWith(prevX, prevY, nextX, nextY);

    if (side === 1) {         
        this.xVel *= -1;
    }

    if (side === 0) {         
        this.yVel *= -1;
    }
    
    // Bounce off the paddle and top edge
    if (g_paddle.collidesWith(prevX, prevY, nextX, nextY, this.radius)|| nextY < 25)
    {
        playBounce();
        this.yVel *= -1;
    }
    
    // Bounce off the sides

    if (nextX < 0 || nextX > g_canvas.width) {         
        playBounce();
        this.xVel *= -1;
    }

    // Check if I went out of bounds
    if (nextY > g_canvas.height) {
        g_lives--;
        if(g_lives > 0){
            playLifeLost();
            this.reset();
        }
        else {
            playGameOver();
            gameOver();
        }
    }

    // Drop the ball
    if(g_keys[this.DROP]){
        if(g_newBall){
            playDrop();
            this.xVel = 4;
            this.yVel = 5;
            g_newBall = false;
        }
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

g_ball.reset = function () {
    this.cx = 165;
    this.cy = 320;
    this.xVel = 0;
    this.yVel = 0;
    g_newBall = true;
};

g_ball.render = function (ctx) {
    ctx.fillStyle = "black";
    fillCircle(ctx, this.cx, this.cy, this.radius);
};