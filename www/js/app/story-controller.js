$(function(){
var storyController = angular.module('storyController',[]);

storyController.controller('MainController', ['StoryScene',function(StoryScene)
{
   var ctrl = this;

   ctrl.scene = null;

   ctrl.setScene = function(scene)
   {
      ctrl.scene = scene;
   };
}]);
});