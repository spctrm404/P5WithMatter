let engine;
let mouseConstraint;

let boundaryObjs = [];
let matterObjs = [];

let colors = [
  "#e7007d",
  "#e72600",
  "#b26300",
  "#937300",
  "#6d7f00",
  "#008a39",
  "#008673",
];

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
  let dom = document.getElementById("sketch");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
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
  for (let i = 0; i < 50; i++) {
    createRandomObj(width * 0.5, height * 0.5);
  }
  if (typeof window !== "undefined") {
    window.addEventListener("deviceorientation", updateGravity);
  }
  gravity = engine.gravity;
  gravity.x = 0;
  gravity.y = 0;
}

function createRandomObj(x, y) {
  let size = [random(80, 100), random(80, 100)];
  let angle = parseInt(random(3, 10));
  if (angle < 4 || (angle >= 5 && angle < 9)) {
    matterObjs.push(
      new Polygon(x, y, angle, size[0] * 0.5, {
        chamfer: { radius: 10 },
      })
    );
  } else if (angle >= 9) {
    matterObjs.push(new Circle(x, y, size[0] * 0.5));
  } else {
    matterObjs.push(
      new Rect(x, y, size[0], size[1], {
        chamfer: { radius: 10 },
      })
    );
  }
}

var updateGravity = function (event) {
  var orientation =
      typeof window.orientation !== "undefined" ? window.orientation : 0,
    gravity = engine.gravity;

  if (orientation === 0) {
    gravity.x = constrain(event.gamma, -90, 90) / 90;
    gravity.y = constrain(event.beta, -90, 90) / 90;
  } else if (orientation === 180) {
    gravity.x = constrain(event.gamma, -90, 90) / 90;
    gravity.y = constrain(-event.beta, -90, 90) / 90;
  } else if (orientation === 90) {
    gravity.x = constrain(event.beta, -90, 90) / 90;
    gravity.y = constrain(-event.gamma, -90, 90) / 90;
  } else if (orientation === -90) {
    gravity.x = constrain(-event.beta, -90, 90) / 90;
    gravity.y = constrain(event.gamma, -90, 90) / 90;
  }
};

function draw() {
  background("#ffffff");
  // if (mouseIsPressed && mouseButton === CENTER) {
  //   createObj();
  // }
  Matter.Engine.update(engine);
  noStroke();
  matterObjs.forEach((obj, idx) => {
    if (mouseConstraint.body === obj.body) {
      fill("#00daf2");
    } else {
      fill(colors[idx % colors.length]);
    }
    obj.render();
  });
  noFill();
  stroke(0);
  matterObjs.forEach((obj) => obj.renderDirVector());

  noStroke();
  fill("#919191");
  boundaryObjs.forEach((obj) => obj.render());
}
