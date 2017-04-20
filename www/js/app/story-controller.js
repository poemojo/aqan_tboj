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
      blackmail: false,
      money: 0
   };

   ctrl.show = { advance: false, inventory: false};
   ctrl.scene = null;
   ctrl.outputCoords = function(coords)
   { return ""+coords.x1+","+coords.y1+","+coords.x2+","+coords.y2;} 

   ctrl.setScene = function(filename)
   {
      var inventory = $cookies.getObject("aqan-tboj-inventory");
      if (inventory === undefined)
         $cookies.put("aqan-tboj-inventory", JSON.stringify(ctrl.inventory));
      else
         ctrl.inventory = inventory;

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
}]);
})();