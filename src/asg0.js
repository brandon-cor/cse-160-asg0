// DrawTriangle.js (c) 2012 matsuda
// sets up our canvas to explore vector operations using our extended matrix library

function main() {
  // grab the canvas from the html by id
  var canvas = document.getElementById('vectorCanvas');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // set up the 2D drawing context for the canvas
  var ctx = canvas.getContext('2d');

  // fill the entire canvas with a black background to start fresh
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // hardcoded vectors for demonstration
  var v1 = new Vector3([2.25, 2.25, 0]); // a red vector pointing diagonally
  var v2 = new Vector3([1, 0, 0]); // a blue vector pointing to the right

  // draw the vectors on the canvas
  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");
}

function handleDrawEvent() {
  // grab the canvas again to redraw based on user inputs
  var canvas = document.getElementById('vectorCanvas');
  var ctx = canvas.getContext('2d');

  // clear the canvas 
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // read user inputs for the two vectors
  var v1 = new Vector3([
    parseFloat(document.getElementById('v1_x').value) || 0, // x-coordinate for vector 1
    parseFloat(document.getElementById('v1_y').value) || 0, // y-coordinate for vector 1
    0,
  ]);

  var v2 = new Vector3([
    parseFloat(document.getElementById('v2_x').value) || 0, // x-coordinate for vector 2
    parseFloat(document.getElementById('v2_y').value) || 0, // y-coordinate for vector 2
    0,
  ]);

  // draw the two input vectors
  drawVector(ctx, v1, "red");
  drawVector(ctx, v2, "blue");
}

function handleDrawOperationEvent() {
  // grab the canvas and context for vector operations
  var canvas = document.getElementById('vectorCanvas');
  var ctx = canvas.getContext('2d');

  // clear the canvas to prepare for new drawings
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // first, redraw the base vectors using the draw event
  handleDrawEvent();

  // read the operation selected by the user
  var selector = document.getElementById('operation').value;
  var scalar = parseFloat(document.getElementById('scalar').value) || 1;

  // re-read user input vectors
  var v1 = new Vector3([
    parseFloat(document.getElementById('v1_x').value) || 0,
    parseFloat(document.getElementById('v1_y').value) || 0,
    0,
  ]);

  var v2 = new Vector3([
    parseFloat(document.getElementById('v2_x').value) || 0,
    parseFloat(document.getElementById('v2_y').value) || 0,
    0,
  ]);

  var v3, v4; // to hold resulting vectors based on the operation

  // perform the operation based on the selector
  if (selector === "add") {
    v3 = v1.add(v2);
    drawVector(ctx, v3, "green");
  } else if (selector === "sub") {
    v3 = v1.sub(v2);
    drawVector(ctx, v3, "green");
  } else if (selector === "mul") {
    v3 = v1.mul(scalar);
    v4 = v2.mul(scalar);
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");
  } else if (selector === "div") {
    v3 = v1.div(scalar);
    v4 = v2.div(scalar);
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");
  } else if (selector === "mag") {
    // log the magnitudes of both vectors to the console
    console.log("Magnitude of v1: " + v1.magnitude());
    console.log("Magnitude of v2: " + v2.magnitude());
  } else if (selector === "norm") {
    // normalize the vectors (convert them to unit vectors)
    v1.normalize();
    v2.normalize();
    drawVector(ctx, v1, "green");
    drawVector(ctx, v2, "green");
  } else if (selector === "angle") {
    // calculate and log the angle between the two vectors
    console.log("Angle between v1 and v2: " + angleBetween(v1, v2) + "°");
  } else if (selector === "area") {
    // calculate and log the area of the triangle formed by the vectors
    console.log("Area of triangle formed by v1 and v2: " + areaTriangle(v1, v2));
  }
}

function drawVector(ctx, v, color) {
  // set the line color for the vector
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(200, 200); // start at the center of the canvas
  ctx.lineTo(200 + v.elements[0] * 20, 200 + v.elements[1] * 20); // scale vector for visibility
  ctx.stroke();
}

function angleBetween(v1, v2) {
  // compute the angle between two vectors using the dot product
  return Math.acos(Vector3.dot(v1.normalize(), v2.normalize())) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  // compute the area of the triangle formed by two vectors
  let cross = Vector3.cross(v1, v2);
  let area = cross.magnitude() / 2;
  console.log("Area of the triangle: " + area);
}
