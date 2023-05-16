let players = [];
let draggedPlayer = null;
let originPlayers = [];
let fieldLengthSlider;
let fieldWidthSlider;
let trashBin;
let pixelPerYard = 4; // 1 yard is represented by 4 pixels
let refreshButton;
let linesToggle;
let fieldTopLeft = { x: 0, y: 100 };
let pixelPerYardLength; 
let pixelPerYardWidth; 
let autoFormationDropdown;
let hasBeenAdded = {
  'Auto-Formation Team X (4-4-2)': false,
  'Auto-Formation Team X (4-3-3)': false,
  'Auto-Formation Team O (4-4-2)': false,
  'Auto-Formation Team O (4-3-3)': false
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelPerYardLength = (0.7 * windowWidth) / 120; // So that 120 yards corresponds to 80% of the window width
  pixelPerYardWidth = (0.6 * windowHeight) / 90; // So that 90 yards corresponds to 60% of the window height


  fieldLengthSlider = createSlider(80, 120, 120);
  fieldLengthSlider.position(20, 20);

  fieldWidthSlider = createSlider(50, 80, 90); // Create the fieldWidthSlider
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

  linesToggle = createCheckbox('Show Lines', false);
  linesToggle.position(20, 90);

autoFormationDropdown = createSelect();
  autoFormationDropdown.position(20, 115);
  autoFormationDropdown.option('No Auto-Formation');
  autoFormationDropdown.option('Auto-Formation Team X (4-4-2)');
  autoFormationDropdown.option('Auto-Formation Team X (4-3-3)');
  autoFormationDropdown.option('Auto-Formation Team O (4-4-2)');
  autoFormationDropdown.option('Auto-Formation Team O (4-3-3)');


  // Initialize players off the field
  const teams = ['T', 'X', 'O'];
  for (let i = 0; i < 3; i++) {
    let team = teams[i];
    let x = windowWidth - 200;
    let y = team === "T" ? 40 : team === "X" ? 60 : 80;
    originPlayers.push({ id: i, team, x, y }); // Add an id to each player
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelPerYardLength = (0.8 * windowWidth) / 120; // Update the scale when the window is resized
  pixelPerYardWidth = (0.6 * windowHeight) / 90;

  
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

 
  for (let player of players) {
    player.x = (player.x - fieldTopLeft.x) / pixelPerYardLength * pixelPerYard;
    player.y = (player.y - fieldTopLeft.y) / pixelPerYardWidth * pixelPerYard;
  }

  for (let player of originPlayers) {
    player.x = windowWidth - 200;
    player.y = player.team === "T" ? 40 : player.team === "X" ? 60 : 80;
  }
}

function draw() {
  background(255);
  drawField();
  drawTrashBin();
  drawRefreshButton();

  // Draw all the players
  for (let player of players) {
    drawPlayer(player);
  }

  // Draw the origin players
  for (let player of originPlayers) {
    drawPlayer(player);
  }

  // If a player is being dragged
  if (draggedPlayer) {
    drawPlayer(draggedPlayer);
  }
}

function drawField() {
  fill(34, 139, 34);
  stroke(255);
  let fieldLength = fieldLengthSlider.value() * pixelPerYardLength;
  let fieldWidth = fieldWidthSlider.value() * pixelPerYardWidth;
  fieldTopLeft = { x: (windowWidth - fieldLength) / 2, y: (windowHeight - fieldWidth) / 2 };
  rect(fieldTopLeft.x, fieldTopLeft.y, fieldLength, fieldWidth);
  drawLines();
}

function drawLines() {
  // If the linesToggle checkbox is checked, draw lines
  if (linesToggle.checked()) {
    stroke(255);
    let fieldLength = fieldLengthSlider.value() * pixelPerYardLength;
    let fieldWidth = fieldWidthSlider.value() * pixelPerYardWidth;
    // Draw the half-way line
    line(fieldTopLeft.x + fieldLength / 2, fieldTopLeft.y, fieldTopLeft.x + fieldLength / 2, fieldTopLeft.y + fieldWidth);
  }
}
function drawPlayer(player) {
  stroke(0);
  fill(player.team === "T" ? 255, 0, 0 : player.team === "X" ? 0, 0, 255 : 0);
  ellipse(player.x, player.y, 20, 20);
  fill(255);
  text(player.name, player.x - textWidth(player.name) / 2, player.y + 5);
}

function drawTrashBin() {
  // If the trashBinToggle checkbox is checked, draw the trash bin
  if (trashBinToggle.checked()) {
    fill(128, 128, 128);
    rect(windowWidth - 200, windowHeight - 60, 40, 40);
  }
}

function drawRefreshButton() {
  // If the refreshButtonToggle checkbox is checked, draw the refresh button
  if (refreshButtonToggle.checked()) {
    fill(0, 255, 0);
    rect(windowWidth - 150, windowHeight - 60, 40, 40);
  }
}

function mousePressed() {
  // If mouse is pressed on a player, start dragging
  for (let player of players) {
    let d = dist(mouseX, mouseY, player.x, player.y);
    if (d < 20) {
      draggedPlayer = player;
      draggedOffset = { x: mouseX - player.x, y: mouseY - player.y };
      return;
    }
  }
}

function mouseReleased() {
  // If mouse is released, stop dragging
  draggedPlayer = null;
}

function mouseDragged() {
  // If a player is being dragged, move the player with the mouse
  if (draggedPlayer) {
    draggedPlayer.x = mouseX - draggedOffset.x;
    draggedPlayer.y = mouseY - draggedOffset.y;
  }
}
