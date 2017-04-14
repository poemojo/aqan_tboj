(function()
{

var rectCoordsFactory = angular.module('rectCoordsFactory', []);

rectCoordsFactory.factory('RectCoords', function(){
  
   function RectCoords(id, alt, x1, y1, x2, y2)
   {
      alert("Rect")
      this.id = id;
      this.alt = alt;
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
   }


   RectCoords.prototype.output = function()
   { return ""+this.x1+","+this.y1+","+this.x2+","+this.y2; };


   return {
      build: function(x1, y1, x2, y2)
      { return new RectCoords(x1, y1, x2, y2); }
   };


});

})();