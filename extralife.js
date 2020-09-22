// ==========
// EXTRA LIFE
// ==========

var g_extraLife = {
    x: 0,
    y: 0,
    vel: 5,
    isActive: false
}


g_extraLife.update = function (du){
    if(this.isActive){
        var nextY = this.y + this.vel * du; // Calculate next position
        
        // Give extra life and deactivate when I collide with the paddle
        if(g_paddle.collidesWith(this.x, this.y, this.x + 10, nextY, 0)){
            playExtraLife(); 
            g_lives++;
            this.isActive = false;
        }

        // Deactive if I go out of bounds
        if (nextY > g_canvas.height) this.isActive = false;
        
        this.y = nextY  // Update position
    }
}


// Draws a heart
g_extraLife.render = function(ctx){
    if(this.isActive){
        ctx.fillStyle = "red";
        ctx.font = "bold 30px Arial";
        ctx.fillText("♥", this.x, this.y);
    }
}


// Has an 8% chance to activate the extra life at the given coordinates
g_extraLife.roll = function(x, y){
    if(!this.isActive){
        var rand = Math.random();

        if(rand <= 0.08){
            this.isActive = true;
            this.x = x;
            this.y = y;
        }
    }
}
