(function(){
var sceneFactory = angular.module('sceneFactory', []);

sceneFactory.factory('StoryScene',  ['$http', '$cookies', 'ExDate', function($http, $cookies, ExDate)
{
   function isJson(json)
   {
      try { JSON.parse(json); }
      catch (e) { return false; }

      return true;
   }

   function rand_int(min, max)
   {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random()*(max-min))+min;
   }

   function sprintf()
   {
      var fmt_str = arguments[0];

      for (var i=1;i<arguments.length;i++)
      {
         var search = new RegExp("\\{"+(i-1)+"\\}","gm");

         fmt_str = fmt_str.replace(search, arguments[i]);
      }

      return(fmt_str);
   }

   function StoryScene(json)
   {
      var scene = this;
      scene.parent = null;

      $http.get(json).success(function(response)
      {
         scene.id = response.id;
         scene.title = response.title;
         scene.body = response.body;
         scene.image = response.img;
         scene.items = response.items;
         scene.children = response.children;
         scene.msg = response.msg;

         scene.message = sprintf("Amabo {0}.", scene.msg);

      })
      .error(function(err)
      {
         scene.id = 0;
         scene.title = "Error!"
         scene.body = err;
         scene.image = null;
         scene.items = [];
         scene.children = [];
         scene.msg = "";
         scene.message = "";

      });
   }

   StoryScene.prototype.save = function()
   {
      var scene = this;
      var obj = {
         id:       scene.id,
         msg:      scene.msg,
         title:    scene.title,
         body:     scene.body,
         img:      scene.image,
         items:    scene.items,
         children: scene.children
      };

      try
      {
         var json = JSON.stringify(obj);
         $cookies.put("aqan-tboj-scene", json, { 'expires': ExDate("30m").expire });
      }
      catch (e)
      { return false; }

      return true;
   };

   StoryScene.prototype.appendMessage = function(msg, index)
   {
      var pronouns = ["Amabo", "he", "the bounty hunter", "Karrab"];
      var conjuctions = ["also", ", as well", "In addition,"];

      var m = "";

      if (index === null)
         index = rand_int(0,2);

      switch(index)
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

      this.message += m;
   };

   
   return {
      build: function(filename)
      {
         return new StoryScene(filename);
      }
   };



}]);
})();