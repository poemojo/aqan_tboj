(function(){
var sceneFactory = angular.module('sceneFactory', []);

sceneFactory.factory('StoryScene',  function($http)
{
   function isJson(json)
   {
      try { JSON.parse(json); }
      catch (e) { return false; }

      return true;
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
         scene.coords = response.coords;
         scene.children = response.children;
         scene.message = response.msg;
      })
      .error(function(err)
      {
         scene.id = 0;
         scene.title = "Error!"
         scene.body = err;
         scene.image = null;
         scene.coords = [];
         scene.children = [];
         scene.message = "";

      });
   }



   return {
      build: function(filename)
      {
         return new StoryScene(filename);
      }
   };


});
})();