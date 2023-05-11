let players = [];
let draggedPlayer = null;
let fieldLengthSlider;
let fieldWidthSlider;
let trashBin;
let pixelPerYard = 4; // 1 yard is represented by 4 pixels
let refreshButton;


function setup() {
  createCanvas(windowWidth, windowHeight);

  fieldLengthSlider = createSlider(50, 120, 120);
  fieldLengthSlider.position(20, 20);

  fieldWidthSlider = createSlider(25, 90, 90);
  fieldWidthSlider.position(20, 60);

  trashBin = {
    x: windowWidth / 2,
    y: 20,
    width: 50,
    height: 50
  };

  refreshButton = {
    x: windowWidth / 2 + 60,
    y: 20,
    width: 80,
    height: 50
  };

  // Initialize players off the field
  for (let i = 0; i < 150; i++) {
    let team = i < 50 ? "T" : i < 100 ? "X" : "O";
    let x = windowWidth - 200;
    let y = team === "T" ? 40 : team === "X" ? 60 : 80;
    players.push({ team, x, y });
  }
}



function draw() {
  background(200); // Gray background

  let fieldLength = fieldLengthSlider.value() * pixelPerYard;
  let fieldWidth = fieldWidthSlider.value() * pixelPerYard;

  // Calculate the left margin for the field
  let marginLeft = (width - fieldLength) / 2;

  // Draw the field with the current dimensions
  push();
  translate(marginLeft, 100); // Use the margin in the translate function
  drawField(fieldLength, fieldWidth);
  pop();

  drawTeams(); // Draw the teams after ending the field's transformation
  
  drawSliders();
  drawTrashBin();
  drawRefreshButton();
}

function drawRefreshButton() {
  fill(128);
  rect(refreshButton.x, refreshButton.y, refreshButton.width, refreshButton.height);
  fill(0);
  textSize(18);
  text('Reset', refreshButton.x + 15, refreshButton.y + 34);
}



function drawField(fieldLength, fieldWidth) {
  push();
  fill(150,210,149); // Green background for the field
  rect(0, 0, fieldLength, fieldWidth);
  pop();
}

// Draw the teams
function drawTeams() {
  textSize(16); // Make the players half as large

  for (let player of players) {
    if (player.team === 'T') {
      stroke(128, 0, 128); // Purple border
      strokeWeight(2); // Thicker border
      noFill(); // Transparent center
      rect(player.x, player.y -13, 12, 12); // Draw a square centered on the player's position
    } else {
      fill(player.team === 'X' ? [255, 0, 0] : [0, 0, 255]); // Red for X, Blue for O
      noStroke(); // No border for X and O teams
      text(player.team, player.x, player.y);
    }
  }
  pop();
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
  text('🗑️', trashBin.x + 12, trashBin.y + 34);
}

function mousePressed() {
  for (let player of players) {
    let d = dist(mouseX, mouseY, player.x, player.y);
    if (d < 12) { // Adjust the detection radius to 12
      draggedPlayer = player;
      break;
    }
// Check if the refresh button is clicked
  if (mouseX > refreshButton.x && mouseX < refreshButton.x + refreshButton.width && mouseY > refreshButton.y && mouseY < refreshButton.y + refreshButton.height) {
    // Reinitialize the players array
    players = [];
    for (let i = 0; i < 150; i++) {
  let team = i < 50 ? 'T' : i < 100 ? 'X' : 'O';
  let x = width - 200; // x position 200 pixels from the right edge of the canvas
  let y = team === 'T' ? 40 : team === 'X' ? 60 : 80; // 'T' players at 40, 'X' players at 60, 'O'       players at 80
  players.push({ team, x, y });
}
  }
  }
}


// Move the player with the mouse
function mouseDragged() {
  if (draggedPlayer) {
    draggedPlayer.x = mouseX;
    draggedPlayer.y = mouseY;
  }
}


function mouseReleased() {
  if (draggedPlayer) {
    // Check if the dragged player is inside the trash bin
    if (mouseX > trashBin.x && mouseX < trashBin.x + trashBin.width && mouseY > trashBin.y && mouseY < trashBin.y + trashBin.height) {
      // Remove the player from the players array
      players = players.filter(player => player !== draggedPlayer);
    }
    draggedPlayer = null;
  }
}

