$(function(){

   $("#sceneTitle").on('swipedown', scenePanel(0));
   $("#sceneTitle").on('swipeup', scenePanel(1));

   function scenePanel(toggle)
   {
      if (toggle === true || toggle === 1 || toggle === 'show')
         $('#sceneBody').collapse('show');
      else if (toggle === false || toggle === 0 || toggle === 'hide')
         $('#sceneBody').collapse('hide');
   }
});