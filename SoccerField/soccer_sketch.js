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

  // Update the x position of the original players based on the new window width
  for (let i = 0; i < originPlayers.length; i++) {
    originPlayers[i].x = windowWidth - 200;
  }
}


function draw() {
  background(200); // Gray background

  let fieldLength = fieldLengthSlider.value() * pixelPerYardLength; // Use pixelPerYardLength for length
  let fieldWidth = fieldWidthSlider.value() * pixelPerYardWidth; // Use pixelPerYardWidth for width

  // Calculate the left margin for the field
  fieldTopLeft.x = (windowWidth - fieldLength) / 2;
  fieldTopLeft.y = (windowHeight - fieldWidth) / 2; // Calculate the top margin for the field

  // Draw the field with the current dimensions
  push();
  translate(fieldTopLeft.x, fieldTopLeft.y); // Use the field's top-left corner in the translate function
  drawField(fieldLength, fieldWidth);
  pop();

  drawTeams(); // Draw the teams after ending the field's transformation
  
  drawOriginPlayers();
  drawTrashBin();
  drawRefreshButton();


  drawSliders(); // Call the drawSliders function to display the labels


 let autoFormationOption = autoFormationDropdown.value();  // add this line

  if (autoFormationOption === 'Auto-Formation Team X (4-4-2)' && !hasBeenAdded[autoFormationOption]) {
    populateTeam442('X');
    hasBeenAdded[autoFormationOption] = true;
  } else if (autoFormationOption === 'Auto-Formation Team O (4-4-2)' && !hasBeenAdded[autoFormationOption]) {
    populateTeam442('O');
    hasBeenAdded[autoFormationOption] = true;
  } else if (autoFormationOption === 'Auto-Formation Team X (4-3-3)' && !hasBeenAdded[autoFormationOption]) {
    populateTeam433('X');
    hasBeenAdded[autoFormationOption] = true;
  } else if (autoFormationOption === 'Auto-Formation Team O (4-3-3)' && !hasBeenAdded[autoFormationOption]) {
    populateTeam433('O');
    hasBeenAdded[autoFormationOption] = true;
  }

  if (autoFormationOption === 'No Auto-Formation') {
  for (let formation in hasBeenAdded) {
    hasBeenAdded[formation] = false;
  }
  players = []; // remove all players from the field
}



}


function populateTeam442(team) {
  let fieldLengthYards = fieldLengthSlider.value();
  let fieldWidthYards = fieldWidthSlider.value();

  // Position Goalkeepers
  let gkYPos = fieldWidthYards / 2;
  let gkXPos = team === 'X' ? fieldLengthYards * 0.01 : fieldLengthYards * 0.95;
  players.push({
    team: team,
    x: gkXPos * pixelPerYardLength + fieldTopLeft.x,
    y: gkYPos * pixelPerYardWidth + fieldTopLeft.y,
    relativeX: gkXPos * pixelPerYardLength,
    relativeY: gkYPos * pixelPerYardWidth
  });

  // Position Defenders
  let defXPos = team === 'X' ? fieldLengthYards * 0.15 : fieldLengthYards * 0.8;
  for (let i = 0; i < 4; i++) {
    let defYPos = fieldWidthYards * (0.2 + i * 0.2);
    players.push({
      team: team,
      x: defXPos * pixelPerYardLength + fieldTopLeft.x,
      y: defYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: defXPos * pixelPerYardLength,
      relativeY: defYPos * pixelPerYardWidth
    });
  }

  // Position Midfielders
  let midXPos = team === 'X' ? fieldLengthYards * 0.3 : fieldLengthYards * 0.65;
  for (let i = 0; i < 4; i++) {
    let midYPos = fieldWidthYards * (0.15 + i * 0.2);
    players.push({
      team: team,
      x: midXPos * pixelPerYardLength + fieldTopLeft.x,
      y: midYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: midXPos * pixelPerYardLength,
      relativeY: midYPos * pixelPerYardWidth
    });
  }

  // Position Forwards
  let fwdXPos = team === 'X' ? fieldLengthYards * 0.45 : fieldLengthYards * 0.5;
  for (let i = 0; i < 2; i++) {
    let fwdYPos = fieldWidthYards * (0.3 + i * 0.4);
    players.push({
      team: team,
      x: fwdXPos * pixelPerYardLength + fieldTopLeft.x,
      y: fwdYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: fwdXPos * pixelPerYardLength,
      relativeY: fwdYPos * pixelPerYardWidth
    });
  }
}

function populateTeam433(team) {
  let fieldLengthYards = fieldLengthSlider.value();
  let fieldWidthYards = fieldWidthSlider.value();

  // Position Goalkeepers
  let gkYPos = fieldWidthYards / 2;
  let gkXPos = team === 'X' ? fieldLengthYards * 0.01 : fieldLengthYards * 0.95;
  players.push({
    team: team,
    x: gkXPos * pixelPerYardLength + fieldTopLeft.x,
    y: gkYPos * pixelPerYardWidth + fieldTopLeft.y,
    relativeX: gkXPos * pixelPerYardLength,
    relativeY: gkYPos * pixelPerYardWidth
  });

  // Position Defenders
  let defXPos = team === 'X' ? fieldLengthYards * 0.15 : fieldLengthYards * 0.8;
  for (let i = 0; i < 4; i++) {
    let defYPos = fieldWidthYards * (0.2 + i * 0.2);
    players.push({
      team: team,
      x: defXPos * pixelPerYardLength + fieldTopLeft.x,
      y: defYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: defXPos * pixelPerYardLength,
      relativeY: defYPos * pixelPerYardWidth
    });
  }

  // Position Midfielders
  let midXPos = team === 'X' ? fieldLengthYards * 0.3 : fieldLengthYards * 0.65;
  for (let i = 0; i < 3; i++) {
    let midYPos = fieldWidthYards * (0.25 + i * 0.25);
    players.push({
      team: team,
      x: midXPos * pixelPerYardLength + fieldTopLeft.x,
      y: midYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: midXPos * pixelPerYardLength,
      relativeY: midYPos * pixelPerYardWidth
    });
  }

  // Position Forwards
  let fwdXPos = team === 'X' ? fieldLengthYards * 0.45 : fieldLengthYards * 0.5;
  for (let i = 0; i < 3; i++) {
    let fwdYPos = fieldWidthYards * (0.25 + i * 0.25);
    players.push({
      team: team,
      x: fwdXPos * pixelPerYardLength + fieldTopLeft.x,
      y: fwdYPos * pixelPerYardWidth + fieldTopLeft.y,
      relativeX: fwdXPos * pixelPerYardLength,
      relativeY: fwdYPos * pixelPerYardWidth
    });
  }
}


function drawRefreshButton() {
  let buttonColor = color(128);
  
  // Change the color when the button is clicked
  if (mouseIsPressed && mouseX > refreshButton.x && mouseX < refreshButton.x + refreshButton.width && mouseY > refreshButton.y && mouseY < refreshButton.y + refreshButton.height) {
    buttonColor = color(100); // Darker shade when pressed
  }
  
  fill(buttonColor);
  stroke(0); // Black border
  strokeWeight(1); // Border thickness
  
  // Draw the button with rounded corners
  rect(refreshButton.x, refreshButton.y, refreshButton.width, refreshButton.height, 10); // The last parameter is the radius for the rounded corners
  
  // Draw the button text
  fill(0); // Black text
  textSize(18);
  text('Reset', refreshButton.x + 15, refreshButton.y + 34);
  textStyle(NORMAL); // Reset the text style to normal
}

function drawTrashBin() {
  let buttonColor = color(128);
  
  // Change the color when the button is clicked
  if (mouseIsPressed && mouseX > trashBin.x && mouseX < trashBin.x + trashBin.width && mouseY > trashBin.y && mouseY < trashBin.y + trashBin.height) {
    buttonColor = color(100); // Darker shade when pressed
  }
  
  fill(buttonColor);
  stroke(0); // Black border
  strokeWeight(1); // Border thickness
  
  // Draw the button with rounded corners
  rect(trashBin.x, trashBin.y, trashBin.width, trashBin.height, 10); // The last parameter is the radius for the rounded corners
  
  // Draw the button text
  fill(0); // Black text
  textSize(18);
  text('🗑️', trashBin.x + 15, trashBin.y + 34);
  textStyle(NORMAL); // Reset the text style to normal
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
arc(0, 0, 4 * pixelPerYard, 4 * pixelPerYard, 0, HALF_PI);
arc(0, fieldWidth, 4 * pixelPerYard, 4 * pixelPerYard, -HALF_PI, 0);
arc(fieldLength, 0, 4 * pixelPerYard, 4 * pixelPerYard, HALF_PI, PI);
arc(fieldLength, fieldWidth, 4 * pixelPerYard, 4 * pixelPerYard, PI, -HALF_PI);


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
    let playerX = player.relativeX + fieldTopLeft.x;
    let playerY = player.relativeY + fieldTopLeft.y;

    if (player.team === 'T') {
      stroke(128, 0, 128); // Purple border
      strokeWeight(2); // Thicker border
      noFill(); // Transparent center
      rect(playerX, playerY - 13, 12, 12); // Draw a square centered on the player's position
    } else {
      fill(player.team === 'X' ? [255, 0, 0] : [0, 0, 255]); // Red for X, Blue for O
      noStroke(); // No border for X and O teams
      text(player.team, playerX, playerY);
    }
  }
}




function drawSliders() {
  textSize(16);

  fill(0);
  text(`Length: ${fieldLengthSlider.value()} yards`, 180, 35);
  text(`Width: ${fieldWidthSlider.value()} yards`, 180, 75);
}


function mousePressed() {
  // Check if any of the players on the field are being dragged
  for (let player of players) {
    let d = dist(mouseX, mouseY, player.x, player.y);
    if (d < 12) {
      draggedPlayer = player;
      return; // Exit the function as soon as we find a player being dragged
    }
  }

  // If the refresh button is clicked
  if (mouseX > refreshButton.x && mouseX < refreshButton.x + refreshButton.width && mouseY > refreshButton.y && mouseY < refreshButton.y + refreshButton.height) {
    // Clear the players array
    players = [];
    // Set the selected option of the dropdown menu to 'No Auto-Formation'
    autoFormationDropdown.selected('No Auto-Formation');
  }

  // If no existing players are being dragged, check if any of the original players are being dragged
  for (let player of originPlayers) {
    let d = dist(mouseX, mouseY, player.x, player.y);
    if (d < 12) {
      let clonedPlayer = { ...player };
      // Store the player's position relative to the field
      clonedPlayer.relativeX = mouseX - fieldTopLeft.x;
      clonedPlayer.relativeY = mouseY - fieldTopLeft.y;
      draggedPlayer = clonedPlayer;
      players.push(clonedPlayer);
      return; // Exit the function as soon as we find a player being dragged
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

