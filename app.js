// Accessing elements from HTML through DOM
let buttons = document.querySelectorAll(".button");
let resetButton = document.querySelector("#reset-button");
let winnerMsg = document.querySelector("#winner-message");
let draw = document.querySelector("#game-draw");

// Winning patterns in tick-tac-toe
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4 ,6]
];

// Variable to swap player turn
let playerTurn = true;
// Variable to keep track of turns made by both players to know the match was a draw or not
let count = 0;

// Loop for accessing the buttons to play the game
buttons.forEach((button) => {
    // Event listener to print 'X' or 'O' on the buttons with a click
    button.addEventListener("click", () => {
        if (playerTurn) {
            button.style.color = "#E9EDDE";
            button.innerText = "X";
            playerTurn = false;
        } else {
            button.style.color = "#E7E247";
            button.innerText = "0";
            playerTurn = true;
        }
        // Disabling buttons after a move is made by the player
        button.disabled = true;
        // Increment count after each turn
        count++;
        // Condition to check wether the game is a draw or has a winner
        let isWin = gameWinner();
        if (count === 9 && !isWin) {
            gameDraw();
        }
    });
});

// Checking game winnner by looping through the winning patterns
const gameWinner = () => {
    for (let win of winningPatterns) {
        let patternPos1 = buttons[win[0]].innerText;
        let patternPos2 = buttons[win[1]].innerText;
        let patternPos3 = buttons[win[2]].innerText;
        
        // Conditions to meet before declaring a winner
        if (patternPos1 != "" && patternPos2 != "" && patternPos3 != "") {
            if (patternPos1 === patternPos2 && patternPos2 === patternPos3) {
                winnerMessage(patternPos1);
                // Disabling buttons so no changes can be made after the win
                disableButtons();
                // Resetting count after the win
                count = 0;
            }
        }
    }
}

// Displaying game draw message
const gameDraw = () => {
    draw.innerText = "Draw"
    draw.classList.remove("hide");
    disableButtons();
    // Resetting count after the draw
    count = 0;
}

// Resetting game
const resetGame = () => {
    for (const button of buttons) {
        button.innerText = "";
        winnerMsg.classList.add("hide");
        draw.classList.add("hide");
        enableButtons();
    }
}

// Displaying winner messager for the winner
const winnerMessage = (winner) => {
    winnerMsg.innerText = `Player ${winner} Won`;
    winnerMsg.classList.remove("hide");
}

// Disabling buttons
const disableButtons = () => {
    for (const button of buttons) {
        button.disabled = true;
    }
}

// Enabling buttons
const enableButtons = () => {
    for (const button of buttons) {
        button.disabled = false;
    }
}

// Game reset with the reset button
resetButton.addEventListener("click", resetGame);