let boxes = document.querySelectorAll('.box');
let resetButton = document.getElementById('reset');
let messageContainer = document.querySelector('.msg-container');
let message = document.getElementById('message');
let newGameButton = document.getElementById('new');
let turn = true;//playerX, playerO
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("Box clicked: " + box.id);
        if (box.innerText !== '') return;

        if (turn) {
            box.innerText = "O";
            turn = false;
        } else {
            box.innerText = "X";
            turn = true;
        }

        box.disabled = true;
        checkWinner();
    });
});
const resetGame = () => {
    turn = true;
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    messageContainer.classList.add('hide');
};

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
const disableAllBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    messageContainer.classList.remove('hide');
    boxes.forEach(box => box.disabled = true);
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText; 
        let pos2val = boxes[pattern[1]].innerText; 
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val !== '' && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }
    // Check for draw
    let isDraw = true;
    boxes.forEach(box => {
        if (box.innerText === '') isDraw = false;
    });
    if (isDraw) {
        message.innerText = "It's a draw!";
        messageContainer.classList.remove('hide');
        boxes.forEach(box => box.disabled = true);
    }
};
newGameButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', resetGame);





