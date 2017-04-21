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
         scene.message = response.msg;
      })
      .error(function(err)
      {
         scene.id = 0;
         scene.title = "Error!"
         scene.body = err;
         scene.image = null;
         scene.items = [];
         scene.children = [];
         scene.message = "";

      });
   }

   StoryScene.prototype =
   {
      parent: null,
      id: null,
      message: "",
      title: "",
      body: [],
      image: null,
      items: [],
      children:[],

      save: function()
      {
         var scene = this;
         var obj = {
            id:       scene.id,
            msg:      scene.message,
            title:    scene.title,
            body:     scene.body,
            img:      scene.image,
            items:    scene.items,
            children: scene.children
         };

         try
         {
            var json = JSON.stringify(obj);
            $cookies.put("aqan-tboj-scene", json, { 'expires': ExDate("1h").expire });
         }
         catch (e)
         { return false; }

         return true;
      }

   };


   return {
      build: function(filename)
      {
         return new StoryScene(filename);
      }
   };


}]);
})();