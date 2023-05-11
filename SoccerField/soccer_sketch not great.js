let players = [];
let lines = [];
let draggedObject = null;
let dragPoint = null;
let fieldLengthSlider;
let fieldWidthSlider;
let trashBin;
let pixelPerYard = 4; // 1 yard is represented by 4 pixels

function setup() {
  createCanvas(800, 600);

  fieldLengthSlider = createSlider(50, 120, 120);
  fieldLengthSlider.position(20, 20);

  fieldWidthSlider = createSlider(25, 90, 90);
  fieldWidthSlider.position(20, 60);

  trashBin = {
    x: 700,
    y: 20,
    width: 50,
    height: 50
  };

  // Initialize players off the field
  for (let i = 0; i < 10; i++) {
    let team = i < 5 ? 'X' : 'O';
    let x = team === 'X' ? 20 : 50;
    let y = 100 + i * 10;
    players.push({ team, x, y });
  }

  // Initialize lines off the field
  for (let i = 0; i < 5; i++) {
    let x1 = 80;
    let y1 = 100 + i * 10;
    let x2 = x1 + 50;
    let y2 = y1;
    lines.push({ x1, y1, x2, y2 });
  }
}

function draw() {
  background(200); // Gray background

  let fieldLength = fieldLengthSlider.value() * pixelPerYard;
  let fieldWidth = fieldWidthSlider.value() * pixelPerYard;

  // Draw the field with the current dimensions
  push();
  translate(0, 100);
  drawField(fieldLength, fieldWidth);
  drawTeams();
  drawLines();
  pop();

  drawSliders();
  drawTrashBin();
}

function drawField(fieldLength, fieldWidth) {
  push();
  fill(0, 150, 0); // Green background for the field
  rect(0, 0, fieldLength, fieldWidth);
  pop();
}

function drawTeams() {
  textSize(16); // Make the players half as large

  for (let player of players) {
    fill(player.team === 'X' ? [255, 0, 0] : [0, 0, 255]); // Red for X, Blue for O
    text(player.team, player.x, player.y);
  }
}

function drawLines() {
  stroke(255); // White lines
  for (let line of lines) {
    line(line.x1, line.y1, line.x2, line.y2);
  }
}

function drawSliders() {
  textSize(16);

  fill(0);
  text(`Length: ${fieldLengthSlider.value()} yards`, 180, 35);
  text(`Width: ${fieldWidthSlider.value()} yards`, 180, 75);
}

function drawTrashBin() {
  fill(128);
  rect(trashBin.x, trashBin.y, trashBin.width, trashBin.height);
  fill(0);
  textSize(24);
  text('🗑️', trashBin.x + 8, trashBin.y + 34);
}

function mousePressed() {
  // Check if a player is clicked
  for (let player of players) {
        let d = dist(mouseX, mouseY - 100, player.x, player.y);
    if (d < 12) {
      draggedObject = player;
      break;
    }
  }

  // Check if a line point is clicked
  if (!draggedObject) {
    for (let line of lines) {
      let d1 = dist(mouseX, mouseY - 100, line.x1, line.y1);
      let d2 = dist(mouseX, mouseY - 100, line.x2, line.y2);
      if (d1 < 12 || d2 < 12) {
        draggedObject = line;
        dragPoint = d1 < d2 ? 'start' : 'end';
        break;
      }
    }
  }
}

function mouseDragged() {
  if (draggedObject) {
    if (draggedObject.team) {
      // It's a player
      draggedObject.x = mouseX;
      draggedObject.y = mouseY - 100;
    } else {
      // It's a line
      if (dragPoint === 'start') {
        draggedObject.x1 = mouseX;
        draggedObject.y1 = mouseY - 100;
      } else {
        draggedObject.x2 = mouseX;
        draggedObject.y2 = mouseY - 100;
      }
    }
  }
}

function mouseReleased() {
  if (draggedObject) {
    // Check if the dragged player or line is inside the trash bin
    if (mouseX > trashBin.x && mouseX < trashBin.x + trashBin.width && mouseY > trashBin.y && mouseY < trashBin.y + trashBin.height) {
      if (draggedObject.team) {
        // It's a player
        players = players.filter(player => player !== draggedObject);
      } else {
        // It's a line
        lines = lines.filter(line => line !== draggedObject);
      }
    }
  }

  draggedObject = null;
  dragPoint = null;
}

