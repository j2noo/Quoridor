export function createContainer() {
  let container = document.createElement("div");
  container.id = "container";
  let boardContainer = document.createElement("div");
  boardContainer.id = "boardContainer";
  document.body.append(container);

  createPlayerInfo("player1", "black");
  container.append(boardContainer);
  createPlayerInfo("player2", "white");
}

export function createBoard() {
  let board = document.createElement("table");
  board.id = "board";
  console.log("makingBoard");
  createTable(board);
}

function createTable(board) {
  for (let i = 0; i < 17; i++) {
    let boardRow = document.createElement("tr");
    for (let j = 0; j < 17; j++) {
      let unit = null;
      if (isPlayerBoardUnit(i, j)) {
        unit = createBoardUnit(i, j, "playerBoardUnit");
      } else if (isObstacleBoardUnit(i, j)) {
        //isObstacleUnit
        unit = createBoardUnit(i, j, "obstacleBoardUnit");
      } else {
        unit = createBoardUnit(i, j, "emptyBoardUnit");
      }
      boardRow.append(unit);
    }
    board.append(boardRow);
  }
  document.querySelector("#boardContainer").append(board);
  function isPlayerBoardUnit(r, c) {
    return r % 2 == 0 && c % 2 == 0; //둘다 짝수이면 playerUnit
  }
  function isObstacleBoardUnit(r, c) {
    return r % 2 == 1 && c % 2 == 1; //둘다 홀수이면 obstacleUnit
  }
}
function createBoardUnit(i, j, className) {
  let row = Math.floor(i / 2);
  let col = Math.floor(j / 2);
  let elem = document.createElement("td");

  elem.id = className[0] + row + col;
  if (className == "emptyBoardUnit") {
    //empty요소 id 수정
    elem.id = "e" + i + "e" + j;
  }

  if (className != "emptyBoardUnit") {
    elem.setAttribute("data-row", row); //어차피문자열변환
    elem.setAttribute("data-col", col); //어차피문자열변환
  }
  //if(className == 'playerBoardUnit'){ elem.innerHTML="("+row+", "+col+")"; }
  if (className == "obstacleBoardUnit") {
    elem.setAttribute("data-dir", "none");
  }
  elem.className = className;
  return elem;
}

export function createObstacleInfo(id) {
  let elem = document.createElement("div");
  elem.id = id + "obstacleInfo";
  elem.className = "obstacleInfo";
  document.querySelector("#boardContainer").append(elem);
  for (let i = 0; i < 10; i++) {
    elem.append(createObstacleElem(i, id));
  }
}
function createObstacleElem(idx, id) {
  let elem = document.createElement("img");
  elem.className = "obstacleUnit obsVertical";
  elem.className += " " + id + "Obstacle";
  elem.id = id + "ObstacleUnit" + idx;
  elem.dataset.dir = "vertical";
  //elem.dataset.isPositioned = false;
  elem.src = "./images/obstacleVertical.png";
  elem.alt = "obs";
  return elem;
}
export function createPlayerInfo(id, color) {
  let elem = document.createElement("div");
  elem.id = id + "info";
  elem.className = "playerInfo bgAnimationBeforeStart";

  let playerNameElem = document.createElement("div");
  playerNameElem.innerText = id;

  let PlayerImgElem = document.createElement("img");
  PlayerImgElem.src = "./images/playerProfile" + color + ".png";
  PlayerImgElem.decding = "async";

  elem.append(playerNameElem);
  elem.append(PlayerImgElem);

  document.querySelector("#container").append(elem);
}
