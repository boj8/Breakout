// ==
// UI
// ==

var g_score = 0; // Player score
var g_lives = 3; // Lives remaining


// Draws a black bar at the top of the window and displays the score and lives remaining
function renderTopBar(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, g_canvas.width, 25);

    ctx.fillStyle = "white";
    ctx.font = "bold 15px Arial";
    ctx.fillText("Score: " + g_score, 5, 15);
    ctx.fillText("Lives: " + g_lives, g_canvas.width - 65, 15);
}


// Draws the game over screen
function renderGameOver(ctx){
    ctx.fillStyle = "black";
    ctx.font = "bold 80px Arial";
    ctx.fillText("GAME OVER", 100, 300);
    ctx.font = "bold 25px Arial";
    ctx.fillText("Press space to restart", 220, 330);
}

var g_gameStart = true; // Is it the start of the game?

// Draws the starting screen
function renderStartScreen(ctx){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, g_canvas.width, g_canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 80px Arial";
    ctx.fillText("BREAKOUT", 110, 300);
    ctx.font = "bold 25px Arial";
    ctx.fillText("Use A and D to move", 220, 330);
    ctx.fillText("Press space to start", 225, 360);
}

var g_newBall = false; // Is there a new ball that needs to be dropped?

// Lets the player know what button to use to drop the ball
function renderDrop(ctx){
    ctx.fillStyle = "black"
    ctx.font = "bold 15px Arial";
    ctx.fillText("Press S to drop", 180, 320);
}

function renderUI(ctx){
    renderTopBar(ctx);
    if(g_gameStart) renderStartScreen(ctx);
    if(g_gameOver) renderGameOver(ctx);
    if(g_newBall) renderDrop(ctx);
}