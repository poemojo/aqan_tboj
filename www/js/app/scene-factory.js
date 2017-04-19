(function(){
var sceneFactory = angular.module('sceneFactory', []);

sceneFactory.factory('StoryScene', function()
{
   function isJson(json)
   {
      try { JSON.parse(json); }
      catch (e) { return false; }

      return true;
   }

   var sprintf = function()
   {
<<<<<<< HEAD
      var scene = this;
      scene.parent = null;
=======
      var fmt_str = arguments[0];
>>>>>>> master

      for (var i=1;i<arguments.length;i++)
      {
<<<<<<< HEAD
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
=======
         var search = new RegExp("\\{"+(i-1)+"\\}","gm");
>>>>>>> master

         fmt_str = fmt_str.replace(search, arguments[i]);
      }

      return(fmt_str);
   };

<<<<<<< HEAD
=======
   var rand_int = function(min, max)
   {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random()*(max-min))+min;
   };
  
   function StoryScene(response)
   {
      var scene = this;
      scene.id = response.id;
      scene.title = response.title;
      scene.body = response.body;
      scene.message = response.msg;
      scene.image = response.img;
      scene.coords = response.coords;
      scene.children = response.children;
   }

   StoryScene.prototype.save = function()
   {
      var scene = this;
      var response = {
         id: scene.id,
         title: scene.title,
         body: scene.body,
         msg: scene.message,
         img: scene.image,
         coords: scene.coords,
         children: scene.children
      };

      return JSON.stringify(response);
   };

>>>>>>> master

   return {
      build: function(filename)
      {
         return new StoryScene(filename);
      }
   };


});
})();