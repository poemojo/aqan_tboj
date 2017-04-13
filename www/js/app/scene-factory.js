$(function(){
var sceneFactory = angular.module('sceneFactory', []);

sceneFactory.factory('StoryScene', ['RectCoords', function(RectCoords)
{
   function StoryScene(id, xmlFile)
   {
      alert("Scene Construct");
      var scene = this;
      scene.xmlFile = xmlFile;
      var data = getFileContents(xmlFile),
      xmlDoc = $.parseXML(data),
      $xml = $(xmlDoc),
      $title = $xml.find("title"),
      $body = $xml.find("body"),
      $image = $xml.find("img"),
      $coords = $xml.find("coords");

      scene.id = id;
      scene.title = $title.text();
      scene.body = $title.text();
      scene.image = $image.text();

      if ($coords !== undefined)
      {
         scene.coords = [];

         $coords.each(function(index)
         {

            id = $(this).attr("id");
            alt = $(this).attr("alt");
            x1 = $(this).attr("x1");
            y1 = $(this).attr("y1");
            x2 = $(this).attr("x2");
            y2 = $(this).attr("y2");

            scene.coords.push(RectCoords.build(x1, y1, x2, y2));


         });
      }
      else
         scene.coords = null;

      scene.parent = null;
      scene.children = null;
   };


   StoryScene.prototype.pushChild = function(linkText, child)
   {
         this.children.push({text: linkText, data: child});
         return this;
   };



   return {
      build: function(id, xmlFile)
      {
         return new StoryScene(id, xmlFile);
      }
   };


}]);
});