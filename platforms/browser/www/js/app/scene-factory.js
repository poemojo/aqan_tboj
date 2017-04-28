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

   function capitalize(str)
   { return str.charAt(0).toUpperCase()+str.slice(1); }



   function StoryScene(filename, id, title, body, image, items, children, msg, message)
   {
      this.filename = filename;
      this.id = id;
      this.title = title;
      this.body = body;
      this.image = image;
      this.items = items;
      this.children = children;
      this.msg = msg;
      this.message = message;
   }

   StoryScene.prototype = {

      save: function(exTime)
      {
         try
         {
            if (!this.filename)
               return false;
            if (!this.message)
               return false;

            var obj = {
               filename: this.filename,
               message: this.message
            };

            $cookies.put("aqan-tboj-scene", JSON.stringify(obj), { 'expires': exTime })
         }
         catch (e)
         { return false; }

         return true;
      },

      appendMessage: function()
      {
         var pronouns = ["Amabo", "he", "the bounty hunter", "Karrab"];
         var conjuctions = ["also", ", as well", "In addition,"];

         var pronoun = function() { return pronouns[rand_int(0, 3)]; }
         if (arguments.length < 1)
            return false;

         var msg = arguments[0];
         var index = (arguments[1]) ? arguments[1] : rand_int(0,3);
         switch (index)
         {
            case 0:
               this.message += sprintf(" {0} {1} {2}.", capitalize(pronoun()), conjuctions[index], msg);
               break;

            case 1:
               this.message += sprintf(" {0} {1}{2}.", capitalize(pronoun()), msg, conjuctions[index]);
               break;

            case 2:
               this.message += sprintf(" {0} {1} {2}.", conjuctions[index], pronoun(), msg);
               break;

            default:
               this.message += sprintf(" {0} {1}.", capitalize(pronoun()), msg);
               break;
         }

         return true;

      },

      testProperties: function()
      {
         var str = "";
         for (var prop in this)
         {
            var val = (typeof this[prop] === 'function') ? "function" : this[prop];
            str += sprintf("{0}: {1}\n", prop, val);
         }

         alert(str);
      }
   };
   //StoryScene.prototype.constructor = StoryScene;

   // StoryScene.prototype.save = function(self, exTime)
   // {
   //    if (this === undefined)
   //       alert("This is Bad");
   //    else
   //       alert("This is Good");
   //    var str = "";
   //    for (var prop in this)
   //    {
   //       alert(prop);
   //    }
   //    alert(str);
   //    try
   //    {
   //       if (self.filename === undefined)
   //          return false;
   //       if (self.message === undefined)
   //          throw "Message Undefined";
   //       var obj = {
   //          filename: self.filename,
   //          message: self.message
   //       };
   //       $cookies.put("aqan-tboj-scene", JSON.stringify(obj), { 'expires': exTime });
   //    }
   //    catch (e)
   //    { return false; }

   //    return true;
   // };

   // StoryScene.prototype.appendMessage = function(self, msg, index)
   // {
   //    var pronouns = ["Amabo", "he", "the bounty hunter", "Karrab"];
   //    var conjuctions = ["also", ", as well", "In addition,"];

   //    var m = "";

   //    if (index === null)
   //       index = rand_int(0,2);

   //    switch(index)
   //    {
   //       case 0:
   //          m = sprintf(" {0} {1} {2}.", pronouns[rand_int(0,3)].capitalizeFirst(), conjuctions[0], message);
   //          break;

   //       case 1:
   //          m = sprintf(" {0} {1} {2}.", pronouns[rand_int(0,3)].capitalizeFirst(), message, conjuctions[1]);
   //          break;

   //       case 2:
   //          m = sprintf(" {0} {1} {2}.", conjuctions[2], pronouns[rand_int(0,3)], message);
   //          break;

   //       default:
   //          m = sprintf(" {0} {1}", pronouns[rand_int(0,3)].capitalizeFirst(), message);
   //          break;
   //    }

   //    self.message += m;
   // };

   return function build(filename, id, title, body, image, items, children, msg, message)
   {
      return new StoryScene(filename, id, title, body, image, items, children, msg, message);
   };



}]);
})();