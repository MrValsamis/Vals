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

  linesToggle = createCheckbox('Show Lines', false);
  linesToggle.position(20, 100);

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

  // Update the x position of the original players based on the new window width
  for (let i = 0; i < originPlayers.length; i++) {
    originPlayers[i].x = windowWidth - 200;
  }
}


function draw() {
  background(200); // Gray background

  let fieldLength = fieldLengthSlider.value() * pixelPerYard;
  let fieldWidth = fieldWidthSlider.value() * pixelPerYard;

// Calculate the left margin for the field
  fieldTopLeft.x = (width - fieldLength) / 2;

 // Draw the field with the current dimensions
  push();
  translate(fieldTopLeft.x, fieldTopLeft.y); // Use the field's top-left corner in the translate function
  drawField(fieldLength, fieldWidth);
  pop();

  drawTeams(); // Draw the teams after ending the field's transformation
  
  drawOriginPlayers();
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


function drawOriginPlayers() {
  for (let player of originPlayers) {
    // You can draw the original players similar to how you draw the cloned players
    textSize(16);
    if (player.team === 'T') {
      stroke(128, 0, 128);
      strokeWeight(2);
      noFill();
      rect(player.x, player.y - 13, 12, 12);
    } else {
      fill(player.team === 'X' ? [255, 0, 0] : [0, 0, 255]);
      noStroke();
      text(player.team, player.x, player.y);
    }
  }
}

function drawField(fieldLength, fieldWidth) {
  push();
  fill(150, 210, 149); // Green background for the field
  rect(0, 0, fieldLength, fieldWidth);

  if (linesToggle.checked()) {
    noFill();
    stroke(255);
    strokeWeight(2);

    // Halfway line
    line(fieldLength / 2, 0, fieldLength / 2, fieldWidth);

    // Center circle
    ellipse(fieldLength / 2, fieldWidth / 2, 20 * pixelPerYard, 20 * pixelPerYard);

    // Penalty areas
    rect(0, (fieldWidth - 44 * pixelPerYard) / 2, 18 * pixelPerYard, 44 * pixelPerYard);
    rect(fieldLength - 18 * pixelPerYard, (fieldWidth - 44 * pixelPerYard) / 2, 18 * pixelPerYard, 44 * pixelPerYard);

    // Goal areas
    rect(0, (fieldWidth - 20 * pixelPerYard) / 2, 6 * pixelPerYard, 20 * pixelPerYard);
    rect(fieldLength - 6 * pixelPerYard, (fieldWidth - 20 * pixelPerYard) / 2, 6 * pixelPerYard, 20 * pixelPerYard);

    // Corner arcs
arc(0, 0, 2 * pixelPerYard, 2 * pixelPerYard, 0, HALF_PI);
arc(0, fieldWidth, 2 * pixelPerYard, 2 * pixelPerYard, -HALF_PI, 0);
arc(fieldLength, 0, 2 * pixelPerYard, 2 * pixelPerYard, HALF_PI, PI);
arc(fieldLength, fieldWidth, 2 * pixelPerYard, 2 * pixelPerYard, PI, -HALF_PI);


// Penalty Kick spots
    point(12 * pixelPerYard, fieldWidth / 2);
    point(fieldLength - (12 * pixelPerYard), fieldWidth / 2);
}
    pop();
}



function drawTeams() {
  textSize(16); // Make the players half as large

  for (let player of players) {
    // Calculate the player's absolute position
    player.x = player.relativeX + fieldTopLeft.x;
    player.y = player.relativeY + fieldTopLeft.y;

    if (player.team === 'T') {
      stroke(128, 0, 128); // Purple border
      strokeWeight(2); // Thicker border
      noFill(); // Transparent center
      rect(player.x, player.y - 13, 12, 12); // Draw a square centered on the player's position
    } else {
      fill(player.team === 'X' ? [255, 0, 0] : [0, 0, 255]); // Red for X, Blue for O
      noStroke(); // No border for X and O teams
      text(player.team, player.x, player.y);
    }
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
  text('🗑️', trashBin.x + 12, trashBin.y + 34);
}

function mousePressed() {
  for (let player of originPlayers) {
    let d = dist(mouseX, mouseY, player.x, player.y);
    if (d < 12) {
      let clonedPlayer = { ...player };
      // Store the player's position relative to the field
      clonedPlayer.relativeX = mouseX - fieldTopLeft.x;
      clonedPlayer.relativeY = mouseY - fieldTopLeft.y;
      draggedPlayer = clonedPlayer;
      players.push(clonedPlayer);
      break;
    }
  }

  // Check if the refresh button is clicked
  if (mouseX > refreshButton.x && mouseX < refreshButton.x + refreshButton.width && mouseY > refreshButton.y && mouseY < refreshButton.y + refreshButton.height) {
    // Clear the players array
    players = [];
  }
}



function mouseDragged() {
  if (draggedPlayer) {
    // Adjust the player's relative position
    draggedPlayer.relativeX = mouseX - fieldTopLeft.x;
    draggedPlayer.relativeY = mouseY - fieldTopLeft.y;
  }
}


function mouseReleased() {
  if (draggedPlayer) {
    // Calculate the player's absolute position
    draggedPlayer.x = draggedPlayer.relativeX + fieldTopLeft.x;
    draggedPlayer.y = draggedPlayer.relativeY + fieldTopLeft.y;

    // Check if the dragged player is inside the trash bin
    if (draggedPlayer.x > trashBin.x && draggedPlayer.x < trashBin.x + trashBin.width && 
        draggedPlayer.y > trashBin.y && draggedPlayer.y < trashBin.y + trashBin.height) {
      // Remove the player from the players array
      players = players.filter(player => player !== draggedPlayer);
    }

    draggedPlayer = null;
  }
}

