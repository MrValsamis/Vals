function funGraphSVG5(
    id,
    func, {
        x0 = 0,
        y0 = 0,
        step = 2,
        scale = undefined,
        xScale = 50,
        yScale = 50,
        strokeWidth = 2,
        showFunction = true,
        stroke = "#07b",
        fill = undefined,
        positiveOnly = false,
        showAxis = true,
        showLabels = true,
        xLabel = "",
        yLabel = "",
        showAxisNumbers = true,
        decimals = undefined,
        xDecimals = 0,
        yDecimals = 0,
        showGrid = true,
        gridSize = 50,
        updatePath = false,
        showMouseCoords = false
	
    } = {}
) {
    
    if (decimals) {
        xDecimals = decimals;
        yDecimals = decimals;
    }
    if (scale) {
        xScale = scale;
        yScale = scale;
    }
    const target = document.getElementById(id);


document.getElementById(id).style.userSelect = 'none';  // Disable text selection on the SVG container

  let stationaryPoint = { x: 3, y: func(3) };
  let movablePoint = { x: 8, y: func(8) };

let isDragging = false;

    function handleMouseDown(event) {
        var pt = target.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        var svgP = pt.matrixTransform(target.getScreenCTM().inverse());
        var xCoord = (svgP.x - x0) / xScale;
    
        if (xCoord > stationaryPoint.x) {  // Only update if new x-coordinate is to the right of stationary point
            movablePoint = { x: xCoord, y: func(xCoord) };  // Update movable point coordinates
            isDragging = true;
            updateLabels();  // Update labels
        }
    }

    function handleMouseMove(event) {
        if (isDragging) {
            var pt = target.createSVGPoint();
            pt.x = event.clientX;
            pt.y = event.clientY;
            var svgP = pt.matrixTransform(target.getScreenCTM().inverse());
            var xCoord = (svgP.x - x0) / xScale;

            if (xCoord > stationaryPoint.x) {
                movablePoint = { x: xCoord, y: func(xCoord) };  // Update movable point coordinates
                updateLabels();  // Update labels
            }
        }
    }

    function handleMouseUp(event) {
        isDragging = false;
    }

    target.addEventListener('mousedown', handleMouseDown);
    target.addEventListener('mousemove', handleMouseMove);
    target.addEventListener('mouseup', handleMouseUp);



function updateLabels() {
    // Remove existing labels and dots
    let oldLabels = target.querySelectorAll('.label, .movable-label');
    oldLabels.forEach(label => target.removeChild(label));
    
    let oldDots = target.querySelectorAll('.dot, .movable-dot');
    oldDots.forEach(dot => target.removeChild(dot));

    // Remove existing dashed lines
    let oldLines = target.querySelectorAll('.delta-line');
    oldLines.forEach(line => target.removeChild(line));

 // Remove existing delta labels
    let oldDeltaLabels = target.querySelectorAll('.delta-label');
    oldDeltaLabels.forEach(label => target.removeChild(label));

 let oldLine = target.querySelector('.dashed-line');
    oldLine && target.removeChild(oldLine);

// Add new label and dot for the stationary point
    addLabel("(x, y)", stationaryPoint.x, stationaryPoint.y, 'label', '10px');  // Set font size to 20px


// Existing code to calculate the slope m
let m = (movablePoint.y - stationaryPoint.y) / (movablePoint.x - stationaryPoint.x);

// Determine the amount to extend the line in the x-direction
let extendX = 100;  // or however much you want to extend the line

// Calculate the corresponding amount to extend the line in the y-direction
let extendY = extendX * m;


    // Create and append the dashed line connecting the two points
    let dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    dashedLine.setAttribute("x1", x0 + stationaryPoint.x * xScale - extendX);
    dashedLine.setAttribute("y1", y0 - stationaryPoint.y * yScale + extendY);
    dashedLine.setAttribute("x2", x0 + movablePoint.x * xScale + extendX);
    dashedLine.setAttribute("y2", y0 - movablePoint.y * yScale - extendY);
    dashedLine.style.stroke = "red";
    dashedLine.style.strokeWidth = "2";
    dashedLine.style.strokeDasharray = "5,5";  // This sets the dash pattern
    dashedLine.setAttribute("class", 'dashed-line');  // Assign a class for easy removal later
    target.appendChild(dashedLine);


    // Calculate positions
    let x1 = x0 + stationaryPoint.x * xScale;
    let y1 = y0 - stationaryPoint.y * yScale;
    let x2 = x0 + movablePoint.x * xScale;
    let y2 = y0 - movablePoint.y * yScale;

    // Create and append the dashed line for delta x
    let deltaXLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    deltaXLine.setAttribute("x1", x1);
    deltaXLine.setAttribute("y1", y1);
    deltaXLine.setAttribute("x2", x2);
    deltaXLine.setAttribute("y2", y1);
    deltaXLine.style.stroke = "red";
    deltaXLine.style.strokeDasharray = "5,5";  // Dashed line
    deltaXLine.setAttribute("class", 'delta-line');  // Assign a class for easy removal later
    target.appendChild(deltaXLine);

    // Create and append the dashed line for delta y
    let deltaYLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    deltaYLine.setAttribute("x1", x2);
    deltaYLine.setAttribute("y1", y1);
    deltaYLine.setAttribute("x2", x2);
    deltaYLine.setAttribute("y2", y2);
    deltaYLine.style.stroke = "red";
    deltaYLine.style.strokeDasharray = "5,5";  // Dashed line
    deltaYLine.setAttribute("class", 'delta-line');  // Assign a class for easy removal later
    target.appendChild(deltaYLine);

// Create and append the text label for delta x
    let deltaXText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    deltaXText.setAttribute("x", (x1 + x2) / 2);
    deltaXText.setAttribute("y", y1 + 15);  // Adjust offset as needed
    deltaXText.textContent = "Δx";
    deltaXText.style.fontSize = "12px";  // Adjust font size as needed
    deltaXText.setAttribute("class", 'delta-label');  // Assign a class for easy removal later
    target.appendChild(deltaXText);

    // Create and append the text label for delta y
    let deltaYText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    deltaYText.setAttribute("x", x2 + 5);  // Adjust offset as needed
    deltaYText.setAttribute("y", (y1 + y2) / 2);
    deltaYText.textContent = "Δy";
    deltaYText.style.fontSize = "12px";  // Adjust font size as needed
    deltaYText.setAttribute("class", 'delta-label');  // Assign a class for easy removal later
    target.appendChild(deltaYText);

    // Add new label and dot for the stationary point
    addLabel("(x, y)", stationaryPoint.x, stationaryPoint.y, 'label');

    // Create and append the dot for the stationary point
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x0 + stationaryPoint.x * xScale);
    dot.setAttribute("cy", y0 - stationaryPoint.y * yScale);
    dot.setAttribute("r", 3);  // radius of the dot
    dot.style.fill = "black";
    dot.setAttribute("class", 'dot');  // Assign a class for easy removal later
    target.appendChild(dot);

    // Create and append the coordinate text for the movable point
    let deltaX = (movablePoint.x - stationaryPoint.x).toFixed(2);
    let deltaY = (movablePoint.y - stationaryPoint.y).toFixed(2);
    let coordText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    coordText.setAttribute("x", x0 + movablePoint.x * xScale - 70);
    coordText.setAttribute("y", y0 - movablePoint.y * yScale - 10);
    coordText.textContent = `(x + Δx, y + Δy)`;  // Reflecting the change in x and y values
    coordText.style.fontSize = "10px";  
    coordText.setAttribute("class", 'movable-label');  // Assign a class for easy removal later
    target.appendChild(coordText);

    // Create and append the dot for the movable point
    let movableDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    movableDot.setAttribute("cx", x0 + movablePoint.x * xScale);
    movableDot.setAttribute("cy", y0 - movablePoint.y * yScale);
    movableDot.setAttribute("r", 3);  // radius of the dot
    movableDot.style.fill = "black";
    movableDot.setAttribute("class", 'movable-dot');  // Assign a class for easy removal later
    target.appendChild(movableDot);
}




function addLabel(text, xCoord, yCoord, className, fontSize = "10px")  {
        let x = x0 + xCoord * xScale;
        let y = y0 - yCoord * yScale;

        const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        textElement.setAttribute("x", x - 30);
        textElement.setAttribute("y", y - 10);  // Adjust offset as needed
        textElement.textContent = text;
	textElement.style.fontSize = fontSize;
        textElement.setAttribute("class", className);  // Assign a class for easy removal later
        target.appendChild(textElement);
    }



  let bounds = target.viewBox.baseVal; //target.getAttribute("viewBox");
  if (bounds === null) {
    //if viewBox doesn't exist, like for non-scaling SVG
    const bounding = target.getBoundingClientRect();
    bounds = {
      width: bounding.width,
      height: bounding.height
    };
  }
  if (bounds.width === 0) {
    //if viewBox doesn't exist, like for non-scaling SVG
    const bounding = target.getBoundingClientRect();
    bounds = {
      width: bounding.width,
      height: bounding.height
    };
  }

  if (!updatePath) {
    target.setAttribute("title", "My new Alt");
  }

  if (showAxis && !updatePath) {
    const x = x0 + 0.5; //sharper lines, not between pixels
    const y = y0 + 0.5; //sharper lines, not between pixels

    if (showGrid) {
      let path = "";
      if (positiveOnly) {
        // positive horizontal marks
        for (let i = 1; i * gridSize < bounds.width - x; ++i) {
          const xPos = x + i * gridSize;
          path += `M${xPos} 0 v${y}`;
        }
        // positive vertical marks
        for (let i = 1; i * gridSize < y; ++i) {
          const yPos = y - i * gridSize;
          path += `M${x} ${yPos} h${bounds.width}`;
        }
      } else {
        // positive horizontal marks
        for (let i = 1; i * gridSize < bounds.width - x; ++i) {
          const xPos = x + i * gridSize;
          path += `M${xPos} 0 v${bounds.height}`;
        }
        // negative horizontal marks
        for (let i = -1; i * gridSize > -x; --i) {
          const xPos = x + i * gridSize;
          path += `M${xPos} 0 v${bounds.height}`;
        }
        // positive vertical marks
        for (let i = 1; i * gridSize < y; ++i) {
          const yPos = y - i * gridSize;
          path += `M0 ${yPos} h${bounds.width}`;
        }
        // negative vertical marks
        for (let i = -1; i * gridSize > -bounds.height + y; --i) {
          const yPos = y - i * gridSize;
          path += `M0 ${yPos} h${bounds.width}`;
        }
      }
      const newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      newElement.setAttribute("d", path);
      newElement.style.stroke = "#ddd";
      newElement.style.fill = "none";
      newElement.style.strokeWidth = 1;
      target.appendChild(newElement);
    }
    //draw Axis
    let path = `M${x} ${0} L${x} ${bounds.height} M${0} ${y} L${bounds.width} ${y}`;
    //add path to SVG
    const newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newElement.setAttribute("d", path);
    newElement.style.stroke = "#000";
    newElement.style.fill = "none";
    newElement.style.strokeWidth = 1;
    target.appendChild(newElement);
    //label axis with tick marks and values at gridSize increments
    if (showAxisNumbers) {
      let path = "";
      // positive horizontal marks
      for (let i = 1; i * gridSize < bounds.width - x; ++i) {
        const xPos = x + i * gridSize;
        const yPos = y;
        path += `M${xPos} ${yPos}  v3`;
        addText((x0 + (i * gridSize) / xScale - x0).toFixed(xDecimals), xPos, yPos + 14);
      }
      // negative horizontal marks
      for (let i = -1; i * gridSize > -x; --i) {
        const xPos = x + i * gridSize;
        const yPos = y;
        path += `M${xPos} ${yPos}  v3`;
        addText((x0 + (i * gridSize) / xScale - x0).toFixed(xDecimals), xPos, yPos + 14);
      }
      // positive vertical marks
      for (let i = 1; i * gridSize < y; ++i) {
        const xPos = x;
        const yPos = y - i * gridSize;
        path += `M${xPos} ${yPos}  h-3`;
        addText((x0 + (i * gridSize) / yScale - x0).toFixed(yDecimals), xPos - 5, yPos + 4, {
          textAnchor: "end"
        });
      }
      // negative vertical marks
      for (let i = -1; i * gridSize > -bounds.height + y; --i) {
        const xPos = x;
        const yPos = y - i * gridSize;
        path += `M${xPos} ${yPos}  h-3`;
        addText((x0 + (i * gridSize) / yScale - x0).toFixed(yDecimals), xPos - 5, yPos + 4, {
          textAnchor: "end"
        });
      }
      const newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      newElement.setAttribute("d", path);
      newElement.style.stroke = "#000";
      newElement.style.fill = "none";
      newElement.style.strokeWidth = 1;
      target.appendChild(newElement);
    }

    if (showLabels) {
      if (x0 > (2 * bounds.width) / 3) {
        //left of x-axis
        addText(xLabel, +2, y0 - 4, {
          textAnchor: "start"
        });
      } else {
        //right of x-axis
        addText(xLabel, bounds.width - 2, y0 - 4, {
          textAnchor: "end"
        });
      }

      if (y0 > bounds.height / 3) {
        //top of y-axis
        addText(yLabel, x0 + 13, 3, {
          textAnchor: "end",
          rotation: -90
        });
      } else {
        //bottom of y-axis
        addText(yLabel, x0 + 13, bounds.height, {
          textAnchor: "start",
          rotation: -90
        });
      }
    }
  }

  //build a path for the function by calculating each pixel's y-value for each x-value
  if (showFunction) {
    let xx, yy, path, start;

    if (positiveOnly) {
      start = 0;
    } else {
      start = Math.floor(-x0 / step);
    }

    for (let i = start, len = Math.floor((bounds.width - x0) / step); i <= len; i++) {
      xx = step * i;
      yy = yScale * func(xx / xScale);
      if (isFinite(yy)) {
        if (path === undefined) {
          path = `M ${x0 + xx} ${y0 - yy}`;
        } else {
          path += ` L ${x0 + xx} ${y0 - yy}`;
        }
      }
    }

    if (updatePath) {
      document.getElementById(id + "-path").setAttribute("d", path);
    } else {
      //add path to SVG
      const newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      newElement.setAttribute("id", id + "-path");
      newElement.setAttribute("d", path);
      newElement.style.stroke = stroke;
      newElement.style.fill = "none";
      newElement.style.strokeWidth = strokeWidth;
      newElement.style.strokeLinecap = "round";
      target.appendChild(newElement);
    }

    if (fill) {
      //send path back along the axis to the origin
      if (positiveOnly) {
        let yStart = y0 - yScale * func(0);
        if (!isFinite(yStart)) {
          yStart = 0;
        }
        path += ` L ${bounds.width} ${y0 - yy} L ${bounds.width} ${y0} L ${x0} ${y0} L ${x0} ${yStart}`;
      } else {
        let yStart = y0 - yScale * func(-x0);
        if (!isFinite(yStart)) {
          yStart = 0;
        }
        path += ` L ${bounds.width} ${y0 - yy} L ${bounds.width} ${y0} L ${0} ${y0} L ${0} ${yStart}`;
      }
      if (updatePath) {
        document.getElementById(id + "-fill").setAttribute("d", path);
      } else {
        //add path to SVG
        const newElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        newElement.setAttribute("id", id + "-fill");
        newElement.setAttribute("d", path);
        newElement.style.stroke = "none";
        newElement.style.fill = fill;
        target.appendChild(newElement);
      }
    }
  }

 function derivative(f, x) {
        var h = 0.0001;
        return (f(x + h) - f(x)) / h;
    }


function handleGraphClick(event) {
    var pt = target.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    var svgP = pt.matrixTransform(target.getScreenCTM().inverse());
    var xCoord = (svgP.x - x0) / xScale;
    
    if (xCoord > stationaryPoint.x) {  // Only update if new x-coordinate is to the right of stationary point
        updateSlopeCoordinates(xCoord);  // Update slope coordinates
    }
}

target.addEventListener('click', handleGraphClick);


let pointCoords = [3, 8];  // Initial x-coordinates

function updateSlopeCoordinates(xCoord) {
    // Remove the closer old slope-related elements for the movable point (2nd coordinate)
    var oldElements = target.querySelectorAll(`.slope-element-1`);
    oldElements.forEach(element => target.removeChild(element));

    movablePoint = { x: xCoord, y: func(xCoord) };  // Update movable point coordinates

    // Update labels
    updateLabels();
}


function drawSlopeAtCoordinate(xCoord, index) {
    let x = x0 + xCoord * xScale;
    let slope = derivative(func, xCoord);
    let x1 = x - 50;  
    let y1 = y0 - yScale * (func(xCoord) + slope * ((x1 - x) / xScale));
    let x2 = x + 50;  
    let y2 = y0 - yScale * (func(xCoord) + slope * ((x2 - x) / xScale));

 // Remove the old movable point label
    let oldMovableLabels = target.querySelectorAll('.movable-label');
    oldMovableLabels.forEach(label => target.removeChild(label));



    // Create and append the line segment
    let segment = document.createElementNS("http://www.w3.org/2000/svg", "line");
    segment.setAttribute("x1", x1);
    segment.setAttribute("y1", y1);
    segment.setAttribute("x2", x2);
    segment.setAttribute("y2", y2);
    segment.style.stroke = "red";
    segment.style.strokeWidth = "2";
    segment.setAttribute("class", `slope-element-${index}`);  // Assign a class for easy removal later
    target.appendChild(segment);

    // Create and append the text
    let slopeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    slopeText.setAttribute("x", x + 5);
    slopeText.setAttribute("y", y0 - yScale * func(xCoord) + 15);
    slopeText.textContent = `Slope: ${slope.toFixed(2)} m/s`;
    slopeText.setAttribute("class", `slope-element-${index}`);  // Assign a class for easy removal later
    target.appendChild(slopeText);


    // Create and append the black dot
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y0 - yScale * func(xCoord));
    dot.setAttribute("r", 3);  // radius of the dot
    dot.style.fill = "black";
    dot.setAttribute("class", `slope-element-${index}`);  // Assign a class for easy removal later
    target.appendChild(dot);

     // Create and append the coordinate text
    let deltaX = (xCoord - stationaryPoint.x).toFixed(2);
    let deltaY = (func(xCoord) - stationaryPoint.y).toFixed(2);
    let coordText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    coordText.setAttribute("x", x -60);
    coordText.setAttribute("y", y0 - yScale * func(xCoord) - 10);
    coordText.textContent = `(x + ${deltaX}, y + ${deltaY})`;  // Reflecting the change in x and y values
    coordText.style.fontSize = "10px";  
    coordText.setAttribute("class", `slope-element-${index}`);  // Assign a class for easy removal later
    target.appendChild(coordText);
}

// Call these functions at the end of your funGraphSVG function
updateSlopeCoordinates(3);  // replace 3 with your first x-coordinate
updateSlopeCoordinates(8);  // replace 8 with your second x-coordinate

// Then in your mouse click event handler, call updateSlopeCoordinates with the new x-coordinate.



  //mouse over show value of function
  if (showMouseCoords) {
    if (updatePath) {
      //move circle to off screen
      document.getElementById(id + "-circle").setAttribute("cx", -100);
      document.getElementById(id + "-circle").setAttribute("cy", -100);
      //move text to off screen
      document.getElementById(id + "-coords").setAttribute("x", -100);
      document.getElementById(id + "-coords").setAttribute("y", -100);
    } else {
      //add circle
      const newElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      newElement.setAttribute("id", id + "-circle");
      newElement.setAttribute("cx", 0);
      newElement.setAttribute("cy", 0);
      newElement.setAttribute("r", strokeWidth + 2);
      newElement.style.display = "none";
      if (stroke === "none") {
        newElement.style.fill = "#000"; //set fill to stroke color for function
      } else {
        newElement.style.fill = stroke; //set fill to stroke color for function
      }
      target.appendChild(newElement);

      //add text
      const newTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
      newTextElement.setAttribute("id", id + "-coords");
      newTextElement.setAttribute("x", 0);
      newTextElement.setAttribute("y", 0);
      newTextElement.style.fill = "#000";
      newTextElement.style.fontSize = "12px";
      newTextElement.style.textAnchor = "start";
      // newTextElement.style.fontFamily = "Arial";
      // newTextElement.textContent = " ".toString();
      target.appendChild(newTextElement);

      //circle hides when mouse leaves the graph
      target.addEventListener("mouseleave", event => {
        document.getElementById(id + "-circle").style.display = "none";
        document.getElementById(id + "-coords").style.display = "none";
      });
      target.addEventListener("mouseenter", event => {
        document.getElementById(id + "-circle").style.display = "block";
        document.getElementById(id + "-coords").style.display = "block";
      });

      //mouse circle on mouse move
      // Create an SVGPoint for future math
      var pt = target.createSVGPoint();
      
    }
  }



  function addText(text, x, y, {
    textAnchor = "middle",
    fontSize = "12px",
    rotation = 0,
    fill = "#000"
  } = {}) {
    const newElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    newElement.setAttribute("x", x);
    newElement.setAttribute("y", y);
    newElement.style.fill = "#000";
    newElement.style.fontSize = fontSize;
    newElement.style.textAnchor = textAnchor;
    if (rotation) {
      newElement.setAttribute("transform", `rotate(${rotation}, ${x}, ${y})`);
    }
    // newElement.style.fontFamily = "Arial,Helvetica";
    newElement.style.fontFamily = "monospace";
    newElement.textContent = text.toString();
    target.appendChild(newElement);
  }

  //   function removeAll() {
  //     //remove all elements in SVG
  //     while (target.lastChild) {
  //       target.removeChild(target.lastChild);
  //     }
  //     // remove all event listeners in SVG
  //     var clone = target.cloneNode();
  //     while (target.firstChild) {
  //       clone.appendChild(target.lastChild);
  //     }
  //     target.parentNode.replaceChild(clone, target);
  //   }

  //   if (recenterOnClick) {
  //     target.addEventListener("click", event => {
  //       let rect = target.getBoundingClientRect();
  //       let mouse = {
  //         x: event.clientX - rect.left,
  //         y: event.clientY - rect.top
  //       };
  //       removeAll();
  //       //redraw with the same parameters
  //       funGraphSVG(id, func, {
  //         x0: x0 - (mouse.x - bounds.width / 2),
  //         y0: y0 - (mouse.y - bounds.height / 2),
  //         step: step,
  //         xScale: xScale,
  //         yScale: yScale,
  //         strokeWidth: strokeWidth,
  //         showFunction: showFunction,
  //         stroke: stroke,
  //         showAxis: showAxis,
  //         showLabels: showLabels,
  //         xLabel: xLabel,
  //         yLabel: yLabel,
  //         showAxisNumbers: showAxisNumbers,
  //         xDecimals: xDecimals,
  //         yDecimals: yDecimals,
  //         showGrid: showGrid,
  //         gridSize: gridSize,
  //         updatePath: updatePath,
  //         showMouseCoords: showMouseCoords,
  //         recenterOnClick: recenterOnClick
  //       });
  //     });
  //   }
}