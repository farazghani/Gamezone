let gameFlappyBirdStarted = false;
let isGameOver = false;



function startFlappyBirdGame() {
    if (!gameFlappyBirdStarted  || isGameOver) {
        gameFlappyBirdStarted = true; 
        isGameOver = false;
      const canvas = document.getElementById("flappyCanvas");
        const ctx = canvas.getContext("2d");

        const bird = {
            x: 50,
            y: canvas.height / 2,
            radius: 10,
            velocity: 0,
            gravity: 0.5,
            jump: -10
        };

        const pipes = [];
        const pipeWidth = 50;
        const pipeGap = 150;
        const pipeSpeed = 2;
        let score = 0;
       

        document.addEventListener("keydown", jump);

        function jump(event) {
            if (event.code === "Space") {
                bird.velocity = bird.jump;
            }
        }

        function drawBird() {
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
            ctx.fillStyle = "#FF5733";
            ctx.fill();
            ctx.closePath();
        }

        function drawPipe(pipeX, pipeHeight) {
            ctx.fillStyle = "#008000";
            ctx.fillRect(pipeX, 0, pipeWidth, pipeHeight);
            ctx.fillRect(pipeX, pipeHeight + pipeGap, pipeWidth, canvas.height - pipeHeight - pipeGap);
        }

        function draw() {
            if (isGameOver) {
                ctx.font = "30px Arial";
                ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
                gameStarted = false; // Reset gameStarted when game over
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Bird movement
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            // Draw bird
            drawBird();

            // Draw pipes
            for (let i = 0; i < pipes.length; i++) {
                const pipeX = pipes[i].x;
                const pipeHeight = pipes[i].height;
                drawPipe(pipeX, pipeHeight);

                // Check collision
                if (
                    bird.x + bird.radius > pipeX &&
                    bird.x - bird.radius < pipeX + pipeWidth &&
                    (bird.y - bird.radius < pipeHeight || bird.y + bird.radius > pipeHeight + pipeGap)
                ) {
                    isGameOver = true;
                }

                // Increment score when bird passes pipe
                if (bird.x > pipeX + pipeWidth && !pipes[i].scored) {
                    score++;
                    pipes[i].scored = true;
                }

                // Move pipes
                pipes[i].x -= pipeSpeed;

                // Remove offscreen pipes
                if (pipes[i].x + pipeWidth < 0) {
                    pipes.splice(i, 1);
                    i--;
                }
            }

            // Draw score
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);

            // Generate new pipes
            if (Math.random() < 0.01) {
                const pipeHeight = Math.random() * (canvas.height - pipeGap);
                pipes.push({ x: canvas.width, height: pipeHeight, scored: false });
            }

            requestAnimationFrame(draw);
        }

        draw();
    }
}



