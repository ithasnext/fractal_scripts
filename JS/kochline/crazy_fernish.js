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

function findMidPoint(start, end) {
  return start[0] + (end[0] - start[0])/3, start[1] + (end[1] - start[1])/3;
}

function findThird(start, end) {
  return [(end[0] - start[0])/3,(end[1] - start[1])/3];
}

function findZenith(start, length) {
  // return start[0] + length/2, start[1]+ length/2;
  // a** + b** = c**
  // a** = c** - b**
  // a = Math.sqrt(Math.pow(length, 2)) - Math.sqrt(Math.pow(length/2, 2))
  return [start[0] + length/2, start[1] - (Math.sqrt(Math.pow(length, 2)) - Math.sqrt(Math.pow(length/2, 2)))];
}

function length(start, end) {
  return Math.sqrt(Math.abs(Math.pow(end[0], 2) - Math.pow(start[0], 2)) + Math.abs(Math.pow(end[1], 2) - Math.pow(start[1], 2)));
}

function midPoint(start,end) {
  var x = start[0] + .5*(end[0]-start[0]) + ((end[1]-start[1])*Math.sin(RAD_ANGLE))/3;
  var y = start[1] + .5*(end[1]-start[1]) - ((end[0]-start[0])*Math.sin(RAD_ANGLE))/3;
  console.log("x: "+x+", y: "+y);
  return [x,y];
}

function runIterations() {
  var iterations = document.getElementById("iterations").value;
  for (var j = 0; j < iterations; j++) {
    for (var i = stage.numChildren-1; i > 0; i--) {
      var line = stage.getChildAt(i);

      var start = [line.graphics.instructions[1].x,line.graphics.instructions[1].y];
      var end = [line.graphics.instructions[2].x,line.graphics.instructions[2].y];
      var b = [start[0] + (end[0] - start[0])/3, start[1] + (end[1] - start[1])/3];
      // var c = findZenith(b, length(start,end)/3);
      var d = [start[0] + (end[0] - start[0])*2/3, start[1] + (end[1] - start[1])*2/3];


      var c = [start[0] + ((end[1]-start[1])*Math.sin(RAD_ANGLE))/3,
                start[1] - ((end[0]-start[0])*Math.sin(RAD_ANGLE))/3];


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
  stage.update();
}

function setup() {
  init();
  var lineLength = parseInt(document.getElementById("length").value);
  //find the midpoint of the stage
  console.log(lineLength);
  var midStage = [canvas.width/2, canvas.height/2];
  var start = [midStage[0]- lineLength/2, midStage[1]];
  var end = [midStage[0] + lineLength/2, midStage[1]];

  var a = start;
  // var b = [start[0] + (end[0] - start[0])/3, start[1] + (end[1] - start[1])/3];
  // var c = midPoint(start,end);
  var c = findZenith(start,lineLength);
  // var d = [start[0] + (end[0] - start[0])2/3, start[1] + (end[1] - start[1])2/3];
  var e = end;
  var triangleMid = (midStage[1]-c[1])/2;

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

  runIterations();
}
function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);


  var rect = new createjs.Shape();
  rect.graphics.beginFill("black").drawRect(0,0,canvas.width, canvas.height);

  stage.addChild(rect);
  stage.update();
}
/*
def draw(surface, lines):
	[k.display(surface) for k in lines]

def generate(lines):
	next = []
	mirror_next = []

	for l in lines:
		a = l.kochA()
		b = l.kochB()
		c = l.kochC()
		m_c = l.mirror_C()
		d = l.kochD()
		e = l.kochE()

		next.append(KochLine(a,b))
		next.append(KochLine(b,c))
		next.append(KochLine(b,m_c))
		next.append(KochLine(c,d))
		next.append(KochLine(m_c,d))
		next.append(KochLine(d,e))

	return next

def setup(w,h,it):
	surf = pygame.Surface((w,h))

	lines = []
	start = (0,h/2)
	end = (w, h/2)

	lines.append(KochLine(start, end))

	for i in range(it):
		temp = generate(lines)
		lines = temp
	draw(surf, lines)
	pygame.image.save(surf, str(it)+"_iteration_koch_line.png")
*/
