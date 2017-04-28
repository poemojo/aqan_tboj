var dateFactory = angular.module('dateFactory', []);

dateFactory.factory('ExDate', function(){
   function filterInt(value)
   {
     var x;
     if (isNaN(value)) {
       return 0;
     }
     x = parseFloat(value);
     if ((x | 0) !== x)
         return 0;

      return x;
   }
   function compileTime(time, unit)
   {
      time = filterInt(time);

      switch(unit)
      {
         case 'd':
            time *= 24;
         case 'h':
            time *= 60;
         case 'm':
            time *= 60;
         case 's':
            time *= 1000;
            break;
         case 'ms':
            break;
         default:
            return 0;
      }

      return time;
   }

   function ExDate(timeFromNow)
   {
      this.created = new Date();
      var extime;
      pos = timeFromNow.search(/(?:ms|s|m|h|d)$/i);
      if (pos === -1)
         extime = filterInt(timeFromNow);
      else
         extime = compileTime(timeFromNow.substr(0,pos), timeFromNow.substr(pos).toLowerCase());

      this.expire = new Date(this.created);
      this.expire.setTime(this.created.getTime() + extime);
   }

   ExDate.prototype.createdTime = function()
   { return this.created.getTime(); };

   ExDate.prototype.expireTime = function()
   { return this.expire.getTime(); };


   return function build(time)
   { return new ExDate(time); }
 });