let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#reset-btn");
let turnO = true; //PlayerX and PlayerO
let msgBox = document.querySelector(".msg-container");
let newGame = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let game = document.querySelector(".containerAll");
let noOfClicks = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

game.classList.remove("hideFull");
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //PlayerO
      box.innerHTML = "O";
      turnO = false;
    } else {
      //PlayerX
      box.innerHTML = "X";
      turnO = true;
    }
    box.disabled = true;
    noOfClicks++;
    let isWinner = checkWinner();
    if (noOfClicks === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  game.classList.add("hideFull");
  msg.innerText = "Draw";
  msgBox.classList.remove("hide");
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  disabledBoxes();
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  game.classList.remove("hideFull");
  noOfClicks = 0;
  msgBox.classList.add("hide");
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
};

rstBtn.addEventListener("click", resetGame);
newGame.addEventListener("click", resetGame);

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgBox.classList.remove("hide");
  game.classList.add("hideFull");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        boxes.forEach((box) => {
          box.disabled = true;
        });
        showWinner(pos1);
        return true;
      }
    }
  }
};
