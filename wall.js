// ====
// WALL
// ====

var g_wall = {
    bricks: [], // The bricks

    // Height and width of the bricks
    bHeight: 20, 
    bWidth: 46,
   
    // Starting position of the wall
    startX: 5,
    startY: 55,
};

// Draws the brick in different colors depending on how many hits they need to be destroyed
g_wall.render = function(ctx){
    var x = this.startX;
    var y = this.startY;
    
    for(var i = 0; i < this.bricks.length; i++){
        for (var j = 0; j < this.bricks[i].length; j++){
            if (this.bricks[i][j] > 0){
                if(this.bricks[i][j] === 3) ctx.fillStyle = "red";
                if(this.bricks[i][j] === 2) ctx.fillStyle = "orange";
                if(this.bricks[i][j] === 1) ctx.fillStyle = "yellow";

                ctx.fillRect(x, y, this.bWidth, this.bHeight);
            }
            x += this.bWidth;
        }
        x = this.startX;
        y += this.bHeight;
    }
}

g_wall.collidesWith = function (prevX, prevY, nextX, nextY) {
    // Convert given coordinates into postions in the brick array
    var ny = Math.floor((nextY - this.startY)/this.bHeight);
    var nx = Math.floor((nextX - this.startX)/this.bWidth);
    var py = Math.floor((prevY - this.startY)/this.bHeight);
    var px = Math.floor((prevX - this.startX)/this.bWidth);

    // Check if I am in the wall
    if(ny >= 0 && ny < this.bricks.length && nx >= 0 && nx < this.bricks[0].length){
        
        if(this.bricks[ny][nx] > 0){  // Check if there´s a brick here
            this.bricks[ny][nx]--;  // Update brick
            g_score += 10;          // Update score
            g_extraLife.roll(nextX, nextY); // Roll for extra life drop
            
            // Play the correct sound
            if(this.bricks[ny][nx] > 0) playThud();
            else playDing();

            // Ends the game if wall is empty
            if(this.isEmpty()){
                playClap();
                gameOver();
            }  
            
            // Returns 1 for a hit from the sides and 0 for a hit from the top/bottom
            if(py === ny) return 1;
            else return 0;
        }
    }
}

// Initialises the bricks
g_wall.init = function(){
    this.bricks = [
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
}

// Checks if the wall is empty
g_wall.isEmpty = function(){
    for(var i = 0; i < this.bricks.length; i++){
        for (var j = 0; j < this.bricks[i].length; j++){
            if (this.bricks[i][j] > 0){
                return false;
            }
        }
    }
    return true;
}
