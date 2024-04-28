
let gameStarted = false; // Define a variable to track game state
let gameOverAlertShown = false; // Flag to track if game over alert has been shown

function startBounceGame() {
    if (!gameStarted) {
        gameStarted = true; // Update game state to indicate the game has started
        const canvas = document.getElementById("bounceCanvas");
        const ctx = canvas.getContext("2d");

        // Ball variables
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;
        const ballRadius = 10;

        // Paddle variables
        const paddleHeight = 10;
        const paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;

        // Keyboard event listeners
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        // Draw functions
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPaddle();
            collisionDetection();

            // Ball movement
            x += dx;
            y += dy;

            // Wall collision detection
            if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            if (y + dy < ballRadius) {
                dy = -dy;
            } else if (y + dy > canvas.height - ballRadius) {
                // Paddle collision detection
                if (x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                } else {
                    // Game over
                    endGame();
                }
            }

            requestAnimationFrame(draw);
        }

        // Paddle control
        let rightPressed = false;
        let leftPressed = false;

        function handleKeyDown(event) {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed = true;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed = true;
            }
        }

        function handleKeyUp(event) {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed = false;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed = false;
            }
        }

        function movePaddle() {
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }
        }

        function collisionDetection() {
            movePaddle();
        }

        draw();
    }
}

function endGame() {
    if (!gameOverAlertShown) {
        gameOverAlertShown = true; // Set flag to true to indicate the alert has been shown
        alert("Game Over");
        gameStarted = false; // Reset game state
        // Optionally, you can reset game elements or perform any other actions needed for game over
    }
}



