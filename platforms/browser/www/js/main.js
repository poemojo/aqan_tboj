$(function(){

   var inventory = {
      wallet: false,
      warrant: false,
      cigar: false,
      mask: false,
      blade: false,
      blackmail: false,
      money: 0
   };


   $("#inv-wallet").hide();
   $("#inv-warrant").hide();
   $("#inv-pnl").hide();
   $("#wallet").click(function(){
      if (!inventory.wallet)
      {
         $("#inv-wallet").show();
         inventory.wallet = true;
         inventory.money = 250;
         alert("Found Wallet!");
      }
      

   });

   $("#warrant").click(function(){

       if (!inventory.warrant)
       {
         $("#inv-warrant").show();
         inventory.warrant = true;
         alert("Found Warrant!");
       }
   });

   $("#inv-btn").click(function(){
      $("#inv-pnl").toggle(150);

     
   });
});