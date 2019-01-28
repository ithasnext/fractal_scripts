var RAD_ANGLE = 60 * Math.PI / 180;
var canvas;
var stage;

function Sierp(a,b,c, color) {
  this.left = a;
  this.top = b;
  this.right = c;
  this.color = color;
}

Sierp.prototype.genarate = function() {}

Sierp.prototype.midLeft = function() {
  var end = this.midBase();

  var x = this.left[0] + .5*(end[0]-this.left[0]) + (end[1]-this.left[1])*Math.sin(RAD_ANGLE);
  var y = this.left[1]+ .5*(end[1]-this.left[1]) - (end[0]-this.left[0])*Math.sin(RAD_ANGLE);

  return [x,y];
}

Sierp.prototype.midRight = function() {
  var length = (this.right[0]-this.left[0])/2;
	return [this.midLeft()[0]+length, this.midLeft()[1]];
}

Sierp.prototype.midBase = function() {
  var length = (this.right[0]-this.left[0])/2;
  return [this.left[0]+length, this.left[1]];
}

Sierp.prototype.display = function() {
  console.log(this);
  var line = new createjs.Shape();
  line.graphics.beginStroke(this.color).setStrokeStyle(1);
  line.graphics.moveTo(this.left[0], this.left[1]);
  // line.graphics.lineTo(this.left[0], this.left[1]);
  line.graphics.lineTo(this.top[0], this.top[1]);
  line.graphics.lineTo(this.right[0], this.right[1]);
  line.graphics.lineTo(this.left[0], this.left[1]);
  stage.addChild(line);

  stage.update();
}

function draw(lines) {
  lines.forEach(function(line) {
    line.display();
  })
}

function generate(lines) {
  var next = [];

  lines.forEach(function(line) {
    var a = line.left;
    var b = line.top;
    var c = line.right;
    var d = line.midLeft();
    var e = line.midRight();
    var f = line.midBase();

    next.push(new Sierp(a,d,f,"#42f489"))
    next.push(new Sierp(d,b,e,"#42f489"))
    next.push(new Sierp(f,e,c,"#42f489"))
    // var sierp = new Sierp(d,f,e,"#42f489").display();
  })

  return next;
}

function setup() {
  var it = parseInt(document.getElementById("iterations").value);
  var lines = [];

  var start = [0,canvas.height];
  var end = [canvas.width, canvas.height];

  var x = start[0]+ .5*(end[0]-start[0]) - (end[1]-start[1])*Math.sin(RAD_ANGLE);
  var y = start[1]+ .5*(end[1]-start[1]) - (end[0]-start[0])*Math.sin(RAD_ANGLE);

  lines.push(new Sierp(start, [x,y], end, "black"));

  for (var i = 0; i < it; i++) {
    var temp = generate(lines);
    lines = temp;
  }
  draw(lines);
}



function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  var rect = new createjs.Shape();
  rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);
  // line.graphics.moveTo(0,0);
  // line.graphics.setStrokeStyle(4).beginStroke("black");
  // line.graphics.lineTo(10,10);
  // line.graphics.lineTo(10,100);

  stage.addChild(rect);
  stage.update();
}

function demo() {

  stage = new createjs.Stage("canvas");
  var line = new createjs.Shape();
  line.graphics.moveTo(0,0);
  line.graphics.setStrokeStyle(4).beginStroke("black").lineTo(10,10);
  stage.addChild(line);


   var line = new createjs.Shape();
   line.graphics.moveTo(220,60).beginStroke("#00ff00").setStrokeStyle(10).lineTo(300,60);
   stage.addChild(line);

  // var circle = new createjs.Shape();
  // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  // circle.x = 100;
  // circle.y = 100;
  // stage.addChild(circle);
  stage.update();

}
