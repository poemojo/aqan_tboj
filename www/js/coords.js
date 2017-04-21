var RectCoords = function(x1, y1, x2, y2)
{
   this.x1 = x1;
   this.y1 = y1;
   this.x2 = x2;
   this.y2 = y2;
};


RectCoords.prototype =
{
   x1: 0,
   y1: 0,
   x2: 0,
   y2: 0,

   output: function()
   { return sprintf("{0},{1},{2},{3}", this.x1, this.y1, this.x2, this.y2); }
};
var CircleCoords = function(x, y, r)
{
   this.x = x;
   this.y = y;
   this.radius = r;
};

CircleCoords.prototype =
{
   x: 0,
   y: 0,
   radius: 0,

   output: function()
   { return sprintf("{0},{1},{2}", this.x, this.y, this.radius); }
};

var isCoords = function(obj)
{
   return (obj instanceof RectCoords) || (obj instanceof CircleCoords);
};