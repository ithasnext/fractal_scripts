var RAD_ANGLE = 60 * Math.PI / 180;
var stage;
var canvas;

/*
  draw a line
  draw an equilateral triangle
  recurse through every line
    divide the line into thirds
    draw the first and last third
    find the zenith point that would create an equilateral triangle for the last point
*/

function midPoint(start,end) {
  var x = start[0] + .5*(end[0]-start[0]) + ((end[1]-start[1])*Math.sin(RAD_ANGLE));
  var y = start[1] + .5*(end[1]-start[1]) - ((end[0]-start[0])*Math.sin(RAD_ANGLE));
  return [x,y];
}

function runIterations() {
  var iterations = document.getElementById("iterations").value;

    for (var i = stage.numChildren-1; i > 0; i--) {
      var line = stage.getChildAt(i);

      var start = [line.graphics.instructions[1].x,line.graphics.instructions[1].y];
      var end = [line.graphics.instructions[2].x,line.graphics.instructions[2].y];
      var b = [start[0] + (end[0] - start[0])/3, start[1] + (end[1] - start[1])/3];
      var d = [start[0] + (end[0] - start[0])*2/3, start[1] + (end[1] - start[1])*2/3];
      var c = midPoint(b, d);

      line.graphics.clear();
      line.graphics.beginStroke("white").setStrokeStyle(1);
      line.graphics.moveTo(start[0], start[1]);
      line.graphics.lineTo(b[0],b[1]);

      line = new createjs.Shape();
      line.graphics.beginStroke("white").setStrokeStyle(1);
      line.graphics.moveTo(b[0],b[1]);
      line.graphics.lineTo(c[0],c[1]);
      stage.addChild(line);

      line = new createjs.Shape();
      line.graphics.beginStroke("white").setStrokeStyle(1);
      line.graphics.moveTo(c[0],c[1]);
      line.graphics.lineTo(d[0],d[1]);
      stage.addChild(line);

      line = new createjs.Shape();
      line.graphics.beginStroke("white").setStrokeStyle(1);
      line.graphics.moveTo(d[0],d[1]);
      line.graphics.lineTo(end[0],end[1]);
      stage.addChild(line);
    }
}

function colorRedraw() {
  var colors = ["#4286f4", "#f41de6", "#19eae3", "#ed190e", "#e9ed0d"];

  for (var i = 1; i < stage.numChildren; i++) {
    var line = stage.getChildAt(i);

    var start = [line.graphics.instructions[1].x,line.graphics.instructions[1].y];
    var end = [line.graphics.instructions[2].x,line.graphics.instructions[2].y];

    line.graphics.clear();
    line.graphics.beginStroke(colors[Math.floor(Math.random()*colors.length-1)]).setStrokeStyle(1);
    line.graphics.moveTo(start[0], start[1]);
    line.graphics.lineTo(end[0],end[1]);
  }
  stage.update();
}

function setup() {
  init();
  var lineLength = parseInt(document.getElementById("length").value);
  //find the midpoint of the stage
  var midStage = [canvas.width/2, canvas.height/2];
  var start = [midStage[0]- lineLength/2, midStage[1]];
  var end = [midStage[0] + lineLength/2, midStage[1]];

  var a = start;
  var c = midPoint(start,end);
  var e = end;
  var triangleMid = (midStage[1]-c[1])/2 - 75;

  var line = new createjs.Shape();
  line.graphics.beginStroke("white").setStrokeStyle(1);
  line.graphics.moveTo(start[0], start[1]+triangleMid);
  line.graphics.lineTo(c[0],c[1]+triangleMid);
  stage.addChild(line);

  line = new createjs.Shape();
  line.graphics.beginStroke("white").setStrokeStyle(1);
  line.graphics.moveTo(c[0],c[1]+triangleMid);
  line.graphics.lineTo(end[0],end[1]+triangleMid);
  stage.addChild(line);

  line = new createjs.Shape();
  line.graphics.beginStroke("white").setStrokeStyle(1);
  line.graphics.moveTo(end[0],end[1]+triangleMid);
  line.graphics.lineTo(start[0],start[1]+triangleMid);
  stage.addChild(line);
  stage.update();

  var iterations = document.getElementById("iterations").value;
  for (var j = 0; j < iterations; j++) {
    setTimeout(runIterations, (j+1)*500);
  }
}

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  var rect = new createjs.Shape();
  rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);

  stage.addChild(rect);
  stage.update();
}

setInterval(colorRedraw, 100);
