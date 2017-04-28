(function(){
var storyController = angular.module('storyController',[]);

storyController.controller('MainController', ['$http', '$cookies', 'StoryScene', 'ExDate', function($http, $cookies, StoryScene, ExDate)
{

   var ctrl = this;                                                                                      //alias this
   var cb = new Codebird;
   cb.setConsumerKey("iTEg9OBHF2Ut69vtyqy5z902j", "HFZIpbTH6GOjJgqgnmbno9bFxZ1KXQbwX4CS57NUBARC7jpZAG");
 	cb.setToken("854737449028857856-IZcV7ycjnOyU8uDXG22Ru3QOdz41RLx", "6e59aRdzwfHEK5YdL3zPMruroY637XQOBdrNmVknSU2j9");

   //A Simple String Building Function
   function sprintf()
   {
      var fmt_str = arguments[0];                                                                        //format string is first argument

      for (var i=1;i<arguments.length;i++)
      {
         var search = new RegExp("\\{"+(i-1)+"\\}","gm");                                                //search for placeholder {i-1}

         fmt_str = fmt_str.replace(search, arguments[i]);                                                //replace {i-1} with ith argument
      }

      return(fmt_str);                                                                                   //return formatted string
   }

   //Player Inventory Persistent With Cookies
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
   ctrl.ex = null;

   ctrl.initialize = function()
   {
      var scene = $cookies.get("aqan-tboj-scene");

      if (scene !== undefined)
      {
         scene = JSON.parse(scene);
         ctrl.setScene(scene.filename, scene.message);

         var inventory = $cookies.getObject("aqan-tboj-inventory");

         if (inventory !== undefined)
            ctrl.inventory = inventory;
      }
      else
      {
         ctrl.setScene("inc/intro.json", null);
      }
   };

   ctrl.setScene = function(sceneSrc, m)
   {
      angular.element("#sceneBody").collapse('show');
      $http.get(sceneSrc).success(function(response)
      {
         var filename = sceneSrc,
            id = response.id,
            title = response.title,
            body = response.body,
            image = response.img,
            items = response.items,
            children = response.children,
            msg = response.msg,
            message = (m) ? m : sprintf("Amabo {0}.", msg);

         ctrl.scene = StoryScene(filename, id, title, body, image, items, children, msg, message);
         ctrl.save();

      })
      .error(function(err)
      {
         var filename = null,
            id = null,
            title = "Error!",
            body = err,
            image = null,
            items = [],
            children = [],
            msg = "",
            message = "";

         ctrl.scene = StoryScene(filename, id, title, body, image, items, children, msg, message);
         ctrl.save();
      });
   };
   ctrl.save = function()
   {
      ctrl.ex = ExDate("30m").expire;
      $cookies.put("aqan-tboj-inventory", JSON.stringify(ctrl.inventory), { 'expires': ctrl.ex });
      //ctrl.scene.testProperties();
      ctrl.scene.save(ctrl.ex);
   };

   ctrl.reset = function()
   {
      ctrl.inventory = {
         wallet: false,
         warrant: false,
         cigar: false,
         mask: false,
         blade: false,
         blackmail: false
      };
      ctrl.setScene("inc/intro.json", null);
   };

   ctrl.outputCoords = function(coords)
   { return ""+coords.x1+","+coords.y1+","+coords.x2+","+coords.y2;}

   ctrl.getItem = function(item)
   {
      //alert(item.id);
      if (ctrl.inventory[item.id] === false)
      {
         ctrl.inventory[item.id] = true;
         alert(item.alert);
         ctrl.scene.appendMessage(item.msg);
      }
      ctrl.save();
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
      {
      	 if (child.msg !== null)
            ctrl.scene.appendMessage(child.msg);
          
          
          
        //e.preventDefault();        
        var params = {
        status: ctrl.scene.message
        };
        cb.__call(
            "statuses_update",
            params,
            function (reply, rate, err) {
            }
        );
          
        
         ctrl.setScene(child.id);
        
      }
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