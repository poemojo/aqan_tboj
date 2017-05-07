$(function(){
   $("#sceneTitle").on('swipedown', function(){
      $('#sceneBody').collapse('hide');
      //dbg.alert("swipe down!");
   });
   $("#sceneTitle").on('swipeup', function(){ 
      $('#sceneBody').collapse('show');
      //dbg.alert("swipe up!");
   });
});