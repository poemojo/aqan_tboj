(function(){
var storyController = angular.module('storyController',[]);

storyController.controller('MainController', ['$http', '$cookies', 'StoryScene', function($http, $cookies, StoryScene)
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

   ctrl.scene = null;
   ctrl.sceneLookup = {};
   ctrl.message = "";
   ctrl.expires = new Date();

   ctrl.initialize = function()
   {
      var scenes = [];

      $http.get("../../inc/scenes.json").success(function(response)
      {
         scenes = response;
      }).error(function(err)
      {
         scenes = [];
         alert("Cannot Load Scenes!");
      });

      for (var i=0; i<scenes.length; ++i)
         ctrl.sceneLookup[scenes[i].id] = scenes[i];


      alert(scenes[0].id);

      ctrl.setScene(ctrl.sceneLookup["1"]);

   };

   ctrl.outputCoords = function(coords)
   { return ""+coords.x1+","+coords.y1+","+coords.x2+","+coords.y2;} 


   ctrl.buildMessage = function(message)
   {
      var pronouns = ["Amabo", "he", "the bounty hunter", "Karrab"];
      var conjuctions = ["also", ", as well", "In addition,"];

      var cnj_i = rand_int(0, 2);

      var m = "";

      switch(cnj_i)
      {
         case 0:
            m = sprintf(" {0} {1} {2}.", pronouns[rand_int(0,3)].capitalizeFirst(), conjuctions[0], message);
            break;

         case 1:
            m = sprintf(" {0} {1} {2}.", pronouns[rand_int(0,3)].capitalizeFirst(), message, conjuctions[1]);
            break;

         case 2:
            m = sprintf(" {0} {1} {2}.", conjuctions[2], pronouns[rand_int(0,3)], message);
            break;

         default:
            m = sprintf(" {0} {1}", pronouns[rand_int(0,3)].capitalizeFirst(), message);
            break;
      }

     ctrl.message += m;
   };
   ctrl.setScene = function(id)
   {
      var now = new Date();
      ctrl.expires = new Date(now);
      ctrl.expires.setMinutes(now.getMinutes()+30);
      var inventory = $cookies.getObject("aqan-tboj-inventory");
      if (inventory === undefined)
         $cookies.put("aqan-tboj-inventory", JSON.stringify(ctrl.inventory), {'expires': ctrl.expires});
      else
         ctrl.inventory = inventory;

      ctrl.scene = StoryScene.build(id);
      ctrl.message = "";

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

      $cookies.put("aqan-tboj-inventory", JSON.stringify(ctrl.inventory), {'expires': ctrl.expires});
   };

   ctrl.advance = function(index)
   {
      var children = ctrl.scene.children;
      ctrl.setScene(children[index].id);
   };
}]);
})();