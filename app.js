const stages = {
  easy: [1, 4, 7],        // 中央列が黒ならOK
  normal: [1,5,7,9,13],      
  hard: [2,5,9,10,12,13,14,15,16,17,21,25,28,29,30,31,33,35,38,41,44,45,46,47]  
};

let difficultyOrder = ["easy", "normal", "hard"];
let currentDifficultyIndex = 0;

function checkAnswer() {
  const tiles = document.querySelectorAll(".tile");
  let difficulty = difficultyOrder[currentDifficultyIndex];
  const correctIndexes = stages[difficulty];

  const isCorrect = correctIndexes.every(i =>
    tiles[i].classList.contains("black")
  );

  const isOthersWhite = Array.from(tiles).every((tile, i) =>
    correctIndexes.includes(i) ? true : !tile.classList.contains("black")
  );

  if (isCorrect && isOthersWhite) {
    message.textContent = `🎉 ${difficulty.toUpperCase()}クリア！`;

    setTimeout(() => {
      ;
      if (currentDifficultyIndex < difficultyOrder.length) {
        message.textContent = `▶ 次は ${difficultyOrder[currentDifficultyIndex].toUpperCase()} ステージ！`;
        setTimeout(() => {
          message.textContent = "";
          createTiles(); // ステージ切り替え
        }, 2000);
      } else {
        message.textContent = "🏆 全ステージクリア！おめ！";
      }
    }, 1500);
  }
}

function createTiles() {
  grid.innerHTML = "";

  const { columns, rows } = getBoardSize();
  const totalTiles = columns * rows;
  let difficulty = difficultyOrder[currentDifficultyIndex];
  let numbers = stageNumbers[difficulty]; // ステージ専用数字を取得

  grid.style.gridTemplateColumns = `repeat(${columns}, 60px)`;

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = numbers[i]; // ステージに応じた数字を表示
    tile.dataset.index = i;
    tile.addEventListener("click", () => {
      tile.classList.toggle("black");
      checkAnswer(); // 判定はそのまま
    });
    grid.appendChild(tile);
  }
  // 🔍Hardモードならヒントボタン追加
  if (difficulty === "hard") {
    const hintButton = document.createElement("button");
    hintButton.textContent = "Hint💡";
    hintButton.style.marginTop = "15px";
    hintButton.addEventListener("click", showHint);
    message.appendChild(hintButton);
  }

}

function getBoardSize() {
  let difficulty = difficultyOrder[currentDifficultyIndex];
  if (difficulty === "easy"){ return { columns: 3, rows: 3 }};     // 3×3
  if (difficulty === "normal"){ return { columns: 5, rows: 3 }};   // 5×3 ←ココ！
  if (difficulty === "hard"){ return { columns: 8, rows: 6 }};     // 5×5など
  
}

const easpos = [2,1,2,3,2,3,2,1,2];
const norpos = [2,2,2,2,1,1,3,2,3,1,1,2,2,2,2];
const hadpos = [1,3,2,3,3,3,4,2,3,4,3,3,3,4,4,1,3,4,4,3,5,6,7,4,4,3,4,2,3,4,4,2,3,2,4,2,5,7,6,5,2,1,3,2,2,3,3,2];

const stageNumbers = {
  easy: Array.from(easpos, (_, i) => easpos[i]),
  normal: Array.from(norpos, (_, i) => norpos[i]), // 101〜115
  hard: Array.from(hadpos, (_, i) => hadpos[i]), // 501〜525
};

 let showtime = 0;
function showHint() {
  const situkoMessage = document.createElement("div");
  const hintMessage = document.createElement("div");
  const aoriMessage = document.createElement("div");
  const aoriMessage2 = document.createElement("div");
  
  showtime += 1;
  if(showtime >= 7){
    situkoMessage.textContent = "何回押すねん";
  situkoMessage.style.color = "#0077cc";
  situkoMessage.style.marginTop = "10px";
    message.appendChild(situkoMessage)
  } else if(showtime == 1){
    aoriMessage.textContent = "あー、ヒント見ちゃうんだ？";
  aoriMessage.style.color = "#0077cc";
  aoriMessage.style.marginTop = "10px";
     message.appendChild(aoriMessage)
  } else if(showtime == 2){
    aoriMessage2.textContent = "しょうがないなぁ。";
  aoriMessage2.style.color = "#0077cc";
  aoriMessage2.style.marginTop = "10px";
     message.appendChild(aoriMessage2)
  } else {
    hintMessage.textContent = "ヒント：製作者の苗字";
  hintMessage.style.color = "#0077cc";
  hintMessage.style.marginTop = "10px";
  message.appendChild(hintMessage);
  }
}
