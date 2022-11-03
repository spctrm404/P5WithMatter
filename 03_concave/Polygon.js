class Polygon {
  constructor(x, y, sides, radius, options) {
    this.sides = sides;
    this.radius = radius;
    this.body = Matter.Bodies.polygon(x, y, this.sides, this.radius, options);
    Matter.Composite.add(engine.world, this.body);
  }
  render() {
    beginShape();
    this.body.vertices.forEach((v) => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
  }
  renderDirVector() {
    line(
      this.body.position.x,
      this.body.position.y,
      this.body.vertices[0].x,
      this.body.vertices[0].y
    );
  }
}
