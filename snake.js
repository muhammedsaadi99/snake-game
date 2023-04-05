$(document).ready(function () {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Initialize game variables
    let snake;
    let direction;
    let food;
    let interval;
    let score = 0;
    let highScore = localStorage.getItem("snakeHighScore") || 0;

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = "green";
            ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
        }

        // Draw the food
        ctx.beginPath();
        ctx.arc(food.x + 5, food.y + 5, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();

        // Draw the score
        $('#score').text(score);

        // Draw the high score
        $('#high-score').text(highScore);

    }

    function endGame() {
        clearInterval(interval);
        $('.end-screen .score').text(score);
        $('.end-screen').show();
        $('.end-screen .score').show();
        $('.end-screen .end-message').show();
        $('.end-screen .play').show();
        // alert(`Game Over!\n\nScore: ${score}`);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHighScore", highScore);
        }
        score = 0;
        direction = "";
        snake = [];
        $("#play").show();
        draw();
    }

    function gameLoop() {
        // Move the snake in the current direction
        let head = {
            x: snake[0].x,
            y: snake[0].y
        };

        if (direction === "right") {
            head.x += 10;
        } else if (direction === "left") {
            head.x -= 10;
        } else if (direction === "up") {
            head.y -= 10;
        } else if (direction === "down") {
            head.y += 10;
        }else{
            
        }

        // End the game if the snake hits the boundary
        if (head.x < 0 || head.x > 290 || head.y < 0 || head.y > 290) {
            endGame();
            return;
        }

        // End the game if the snake hits itself
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                endGame();
                return;
            }
        }

        // Add a new segment to the front of the snake if it eats the food
        if (head.x === food.x && head.y === food.y) {
            snake.unshift(head);
            food = {
                x: Math.floor(Math.random() * 29 + 1) * 10,
                y: Math.floor(Math.random() * 29 + 1) * 10
            };
            score++;
            draw();
        } else {
            // Move the snake by removing the last segment and adding a new segment to the front
            snake.pop();
            snake.unshift(head);
            draw();
        }
    }

    function startGame() {
        // Initialize the snake and food
        snake = [
            {
                x: 170,
                y: 150
            },
            {
                x: 160,

                y: 150
            },
            {
                x: 150,
                y: 150
            }
        ];
        direction = "right";
        food = {
            x: Math.floor(Math.random() * 29 + 1) * 10,
            y: Math.floor(Math.random() * 29 + 1) * 10
        };
        // Start the game loop
        interval = setInterval(gameLoop, 100);

        // Draw the initial state of the game
        draw();
    }

    // Bind keyboard events
    $(document).keydown(function (e) {
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
            direction = "right";
        } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
            direction = "left";
        } else if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
            direction = "up";
        } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
            direction = "down";
        } else if (e.key === "p" || e.key === "P") {
            $('.end-screen').hide();
            startGame();
        }
    });

    // Bind button events
    $("#play").click(function(){
        $('.end-screen').hide();
        startGame();
    });

    // Draw the initial state of the game
    draw();
});