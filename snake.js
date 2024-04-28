let snakeGameStarted = false;

function startSnakeGame() {
    if (!snakeGameStarted) {
        snakeGameStarted = true;
        // Your Snake game initialization logic goes here...
 



(function() {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");

    // Constants
    const GRID_SIZE = 20;
    const CANVAS_SIZE = 400;
    const SNAKE_INITIAL_LENGTH = 3;
    const GAME_SPEED = 150;

    // Snake variables
    let snake = [{ x: 10, y: 10 }];
    let food = getRandomPosition();
    let direction = "right";
    let isGameOver = false;

    // Event listeners
    document.addEventListener("keydown", handleKeyPress);

    // Game loop
    setInterval(update, GAME_SPEED);

    function update() {
        if (isGameOver) return;

        moveSnake();
        if (isSnakeCollision()) {
            endGame();
            return;
        }
        if (isFoodEaten()) {
            growSnake();
            food = getRandomPosition();
        }

        draw();
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "right":
                head.x += 1;
                break;
        }

        snake.unshift(head);
        if (!isFoodEaten()) {
            snake.pop();
        }
    }

    function isSnakeCollision() {
        const head = snake[0];
        return (
            head.x < 0 ||
            head.x >= CANVAS_SIZE / GRID_SIZE ||
            head.y < 0 ||
            head.y >= CANVAS_SIZE / GRID_SIZE ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        );
    }

    function isFoodEaten() {
        const head = snake[0];
        return head.x === food.x && head.y === food.y;
    }

    function growSnake() {
        const tail = { ...snake[snake.length - 1] };
        snake.push(tail);
    }

    function draw() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw food
        ctx.fillStyle = "red";
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

        // Draw snake
        ctx.fillStyle = "green";
        snake.forEach(segment => {
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        });
    }

    function handleKeyPress(event) {
        const keyPressed = event.key;
        switch (keyPressed) {
            case "ArrowUp":
                if (direction !== "down") direction = "up";
                break;
            case "ArrowDown":
                if (direction !== "up") direction = "down";
                break;
            case "ArrowLeft":
                if (direction !== "right") direction = "left";
                break;
            case "ArrowRight":
                if (direction !== "left") direction = "right";
                break;
        }
    }

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
            y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE))
        };
    }

    function endGame() {
        isGameOver = true;
        alert("Game Over!");
        snakeGameStarted = false;
    }
})();
  } 
}