//var c = document.getElementById('c'),
// ctx = c.getContext('2d'),
//cw = canvas.width = window.innerWidth,
//ch = canvas.height = 180,
points = [],
  tick = 0,
  opt = {
    count: 5,
    range: {
      x: 20,
      y: 30
    },
    duration: {
      min: 20,
      max: 40
    },
    thickness: 10,
    strokeColor: '#26B8CA',
    level: .35,
    curved: true
  },
  rand = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  },
  ease = function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  };

ctx.lineJoin = 'round';
ctx.lineWidth = opt.thickness;
//ctx.strokeStyle = opt.strokeColor;

var Point = function(config){
  this.anchorX = config.x;
  this.anchorY = config.y;
  this.x = config.x;
  this.y = config.y;
  this.setTarget();  
};

Point.prototype.setTarget = function(){
  this.initialX = this.x;
  this.initialY = this.y;
  this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
  this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
  this.tick = 0;
  this.duration = rand(opt.duration.min, opt.duration.max);
}
  
Point.prototype.update = function(){
  var dx = this.targetX - this.x;
  var dy = this.targetY - this.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  
  if(Math.abs(dist) <= 0){
    this.setTarget();
  } else {       
    var t = this.tick;
    var b = this.initialY;
    var c = this.targetY - this.initialY;
    var d = this.duration;
    this.y = ease(t, b, c, d);
    
    b = this.initialX;
    c = this.targetX - this.initialX;
    d = this.duration;
    this.x = ease(t, b, c, d);
  
    this.tick++;
  }
};
    
Point.prototype.render = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
  ctx.fillStyle = '#26B8CA';
  ctx.fill();
};

var updatePoints = function(){
  var i = points.length;
  while(i--){
    points[i].update();
  }
};

/*var renderPoints = function(){
  var i = points.length;
  while(i--){
    points[i].render();
  }
};*/

var renderShape = function(){
  ctx.beginPath();
  var pointCount = points.length;
  ctx.moveTo(points[0].x, points[0].y);	  
  var i;
  for (i = 0; i < pointCount - 1; i++) {
    var c = (points[i].x + points[i + 1].x) / 2;
    var d = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
  }
  ctx.lineTo(-opt.range.x - opt.thickness, 260 + opt.thickness);
  ctx.lineTo(canvas.width + opt.range.x + opt.thickness, 260 + opt.thickness);
  ctx.closePath();   
  ctx.fillStyle = '#26B8CA';
  ctx.fill();  
  //ctx.stroke();
};

var clear = function(){
  ctx.clearRect(0, 0, canvas.width, 0);
};

var loop = function(){
  window.requestAnimFrame(loop, canvas);
  tick++;
  clear();
  updatePoints();
  renderShape();
  //renderPoints();
};

var i = opt.count + 2;
var spacing = (canvas.width + (opt.range.x * 2)) / (opt.count-1);
while(i--){
  points.push(new Point({
    x: (spacing * (i - 1)) - opt.range.x,
    y: 260 - (50 * opt.level)
  }));
}

window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

loop();