var utilsService = angular.module('utilsService', []);

utilsService.service('utils', function(){
   this.sprintf = function()
   {
      var fmt_str = arguments[0];

      for (var i=1;i<arguments.length;i++)
      {
         var search = new RegExp("\\{"+(i-1)+"\\}","gm");

         fmt_str = fmt_str.replace(search, arguments[i]);
      }

      return(fmt_str);
   };

   this.rand_int = function(min, max)
   {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random()*(max-min))+min;
   };

   this.capitalizeFirst = function(str)
   { return str.charAt(0).toUpperCase()+str.slice(1); }
});