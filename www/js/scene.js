var StoryScene = function(id, xmlFile)
{
   alert("Scene Construct");
   var scene = this;
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
         type = $(this).attr("type");

         id = $(this).attr("id");
         alt = $(this).attr("alt");
         if (type === "rect")
         {
            x1 = $(this).attr("x1");
            y1 = $(this).attr("y1");
            x2 = $(this).attr("x2");
            y2 = $(this).attr("y2");

            scene.coords.push(new RectCoords(x1, y1, x2, y2));
         }

         else if (type === "circle")
         {
            x = $(this).attr("x");
            y = $(this).attr("y");
            r = $(this).attr("radius");
            scene.coords.push(new CircleCoords(x, y, r));
         }
      });
   }
   else
      scene.coords = null;

   scene.parent = null;
   scene.children = null;
};


StoryScene.prototype =
{
   id: 0,
   title: "",
   body: "",
   coords: null,
   parent: null,
   children: [],

   pushChild: function(linkText, child)
   {
      this.children.push({text: linkText, data: child});
      return this;
   }
};
