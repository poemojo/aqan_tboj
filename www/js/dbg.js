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

var dbg = {};

if (_DEBUG_ === undefined)
{
   dbg.call = function(callback, params)
   { return null; };

   dbg.alert = function(message)
   { return false; };
} else {
   dbg.call = function(callback, params)
   {
      var thisValue;

      if (arguments.length == 2)
         thisValue = callback;
      else
         thisValue = arguments[2];

      return callback.apply(thisValue, params);
   };

   dbg.alert = function(message)
   {
      if (arguments.length > 1)
      {
         for (var i=1; i<arguments.length;++i)
         {
            var search = new RegExp("\\{"+(i-1)+"\\}", "gm");
            message = message.replace(search, arguments[i]);
         }
      }

      alert(message);

      return true;
   };
}