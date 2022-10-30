let engine;
let mouseConstraint;

let boundaryObjs = [];
let matterObjs = [];

let alpha, beta, gamma;
let xpos, ypos;

let canvas;

function createBoundaries(thickness) {
  boundaryObjs.push(
    new Rect(width * 0.5, 0, width, thickness * 2, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(width * 0.5, height, width, thickness * 2, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(0, height * 0.5, thickness * 2, height, { isStatic: true })
  );
  boundaryObjs.push(
    new Rect(width, height * 0.5, thickness * 2, height, { isStatic: true })
  );
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  engine = Matter.Engine.create();
  let mouseOnP5Cavas = Matter.Mouse.create(canvas.elt);
  mouseOnP5Cavas.pixelRatio = pixelDensity();
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouseOnP5Cavas,
    constraint: { stiffness: 0.2 },
  });
  Matter.Composite.add(engine.world, mouseConstraint);
  createBoundaries(80);
  matterObjs.push(
    new Rect(width * 0.5, height * 0.5, 50, 50, {
      chamfer: { radius: [10, 10, 10, 10] },
    })
  );
  matterObjs.push(new Circle(width * 0.5, height * 0.5, 50));
  matterObjs.push(
    new Polygon(width * 0.5, height * 0.5, 6, 50, {
      chamfer: { radius: 10 },
    })
  );
  console.log(matterObjs[0]);
  console.log(matterObjs[2]);

  xpos = width * 0.5;
  ypos = height * 0.5;
  alpha = 0;
  beta = 0;
  gamma = 0;

  window.addEventListener("deviceorientation", (e) => {
    alpha = e.alpha;
    beta = e.beta;
    gamma = e.gamma;
  });
}

function mousePressed() {
  matterObjs.push(
    new Rect(mouseX, mouseY, 100, 100, {
      chamfer: { radius: [25, 25, 25, 0] },
    })
  );
}

function draw() {
  background("#F8F3FD");
  Matter.Engine.update(engine);
  noStroke();
  matterObjs.forEach((obj) => {
    if (mouseConstraint.body === obj.body) {
      fill("#00FF00");
    } else {
      //   fill("#FF8C58");
      noFill();
      stroke(0);
    }
    obj.render();
  });
  noFill();
  stroke(0);
  matterObjs.forEach((obj) => obj.renderDirVector());

  noStroke();
  fill("#C0AAA9");
  boundaryObjs.forEach((obj) => obj.render());
}
