// KeyPress - Game Started (Step 1)
let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4); // Fixed: was 3, should be 4
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor); // Fixed: push the color, not index
  console.log(gameSeq);
  gameFlash(randomBtn); // Removed btnFlash() call - function doesn't exist
}
function checkAns(idx) {
  //   console.log("curr level : ", level);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over!Your Score was  <b>${level}</b><br> Press Any Key to Restart`;

    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  //   console.log(userColor);
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  if (level > highestScore) {
    //High Score
    highestScore = level;
  }
  document.querySelector(
    "#highScore"
  ).innerText = `High Score: ${highestScore}`;

  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
