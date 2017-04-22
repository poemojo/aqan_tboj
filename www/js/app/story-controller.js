(function(){
var storyController = angular.module('storyController',[]);

storyController.controller('MainController', ['$cookies', 'StoryScene', function($cookies, StoryScene)
{
   var ctrl = this;
   ctrl.inventory = {
      wallet: false,
      warrant: false,
      cigar: false,
      mask: false,
      blade: false,
      blackmail: false
   };

   ctrl.show = { advance: false, inventory: false};
   ctrl.scene = null;
   ctrl.outputCoords = function(coords)
   { return ""+coords.x1+","+coords.y1+","+coords.x2+","+coords.y2;}

   ctrl.setScene = function(filename)
   {
      ctrl.scene = StoryScene.build(filename);
   };

   ctrl.getItem = function(id)
   {
      if (id === 'wallet')
      {
         if (!ctrl.inventory.wallet)
         {
            ctrl.inventory.wallet = true;
            ctrl.inventory.money = 250;
            alert("Found Wallet!");
         }
      }

      if (id === 'warrant')
      {
         if (!ctrl.inventory.warrant)
         {
            ctrl.inventory.warrant = true;
            alert("Found Warrant!");
         }
      }

      $cookies.put("aqan-tboj-inventory", JSON.stringify(ctrl.inventory));
   };

   ctrl.togglePanel = function(panel)
   {
      if (panel === 'advance')
         ctrl.show.advance = !ctrl.show.advance;
      else if (panel === 'inventory')
         ctrl.show.inventory = !ctrl.show.inventory;
   };

   ctrl.loadChild = function(child)
   {
      if (child.item === null || ctrl.inventory[child.item])
         ctrl.setScene(child.id);
   };

   ctrl.setChildClass = function(childItem)
   {
      if (childItem !== null && !ctrl.inventory[childItem])
         return "w3-dark-grey w3-hover-light-grey";

      return "w3-theme-l3";

   };

   ctrl.setChildPrompt = function(child)
   {
      var prompt = child.prompt;
      if (child.item !== null)
         prompt += ' ('+child.item+')';

      return prompt;
   };

}]);
})();