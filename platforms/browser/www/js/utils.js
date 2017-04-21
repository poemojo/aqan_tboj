var sprintf = function()
{

   var fmt_str = arguments[0];

   for (var i=1;i<arguments.length;i++)
   {
      var search = new RegExp("\\{"+(i-1)+"\\}","gm");

      fmt_str = fmt_str.replace(search, arguments[i]);
   }

   return(fmt_str);
};

var getFileContents = function(filename)
{
   var text = "";
   var reader = new FileReader();
   reader.onload = function()
   {
     text = reader.result;
   };

   reader.readAsText(filename);

   return text;
};


var hasAttr = function(obj, attr)
{
   var proto = obj.__proto__ || obj.constructor.prototype;

   return (attr in obj) && (!(attr in proto) || proto[attr] !== obj[attr]);
};