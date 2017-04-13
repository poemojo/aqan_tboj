var storyController = angular.module('storyController',[]);

storyController.controller('MainController', [function($scope)
{
   var ctrl = this;

   $scope.RectCoords = function(x1, y1, x2, y2)
   {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
   };

   $scope.getFileContents = function(filename)
   {
      var text = "";
      var reader = new FileReader();
      reader.onload = function()
      {
        text = reader.result;
      };

      reader.readAsText(filename);

      return text;
   };

   ctrl.body = "";
   ctrl.image = null;
   ctrl.coords = null;
   ctrl.advances = null;

   ctrl.setScene = function(filename, img, coords, advs)
   {
      ctrl.body = filename;
      ctrl.image = img;
      ctrl.coords = coords;
      ctrl.advances = advs;
   };



}]);