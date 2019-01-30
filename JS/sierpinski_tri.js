var RAD_ANGLE = 60 * Math.PI / 180;
var canvas;
var stage;
var alDrawn = false;

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

Sierp.prototype.display = function(line) {
  line.graphics.beginStroke(this.color).setStrokeStyle(1);
  line.graphics.moveTo(this.left[0], this.left[1]);
  line.graphics.lineTo(this.top[0], this.top[1]);
  line.graphics.lineTo(this.right[0], this.right[1]);
  line.graphics.lineTo(this.left[0], this.left[1]);
  stage.addChild(line);
}

function draw(lines) {
  var l = new createjs.Shape();
  lines.forEach(function(line) {
    line.display(l);
  })

  stage.update();
}

function generate(lines, color) {
  var next = [];

  lines.forEach(function(line) {
    var a = line.left;
    var b = line.top;
    var c = line.right;
    var d = line.midLeft();
    var e = line.midRight();
    var f = line.midBase();

    var lc = color[Math.floor(Math.random()*color.length)];
    next.push(new Sierp(a,d,f,"#"+lc));
    lc = color[Math.floor(Math.random()*color.length)];
    next.push(new Sierp(d,b,e,"#"+lc))
    lc = color[Math.floor(Math.random()*color.length)];
    next.push(new Sierp(f,e,c,"#"+lc))
    // var sierp = new Sierp(d,f,e,"#42f489").display();
  })

  return next;
}

function setup() {
  var it = parseInt(document.getElementById("iterations").value);
  var color = document.getElementById("validColors").value.replace(/ /g,'');

  (color == "" ? color = "42f489" : color);
  if (color.includes(",")) {
    var colorArray = color.split(",");
    while(colorArray.includes("")) {
      colorArray[colorArray.indexOf("")] = "42f489";
    }
    color = colorArray;
  } else {
    color = [color];
  }

  var lines = [];
  init();
  var start = [0,canvas.height];
  var end = [canvas.width, canvas.height];

  var x = start[0]+ .5*(end[0]-start[0]) - (end[1]-start[1])*Math.sin(RAD_ANGLE);
  var y = start[1]+ .5*(end[1]-start[1]) - (end[0]-start[0])*Math.sin(RAD_ANGLE);

  lines.push(new Sierp(start, [x,y], end, "black"));

  for (var i = 0; i < it; i++) {
    var temp = generate(lines,color);
    lines = temp;
  }
  draw(lines);
  alDrawn = true;
}

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);
  var rect = new createjs.Shape();
  rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);
  stage.mouseEnabled = false;

  stage.addChild(rect);
}

function regen() {
  if (document.getElementById("iterations") != null && document.getElementById("iterations").value != "" &&
      alDrawn && document.getElementById("validColors").value.includes(",") && document.getElementById("regen").checked) {
    stage.removeAllChildren();
    setup();
  }
}

setInterval(regen,100);
// d30c16,ed7504,040bed,
