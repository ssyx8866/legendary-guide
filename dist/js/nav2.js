window.onload = function () {
  var ln1 = document.querySelectorAll("#navbox .logonav li");
  var navbb = document.querySelectorAll("#navbb #navbbox");

  for (var i = 0; i < ln1.length; i++) {
    ln1[i].index = i;
    ln1[i].onmouseenter = function () {
      navbb[this.index].style.display = "block";
    };

  };
    navbb[i].onmouseleave = function () {
      navbb[this.index].style.display = "none";
  }
  for (var k = 0; k < navbb.length; k++) {
    navbb[k].index = k;
  }

  //index2.shop
//   var shop = document.querySelectorAll(".modelbox .modelsub div")
//   var evshop = document.querySelectorAll(".modelbox1 .modelsup")
//   for(var i = o;i<shop.length;i++){
//     shop[i].index = i;
//     shop[i].onclick = function(){
//       evshop[this.index].style.display = "block";
//     }
//     evshop[i].onmouseleave = function(){
//       evshop[this.index].style.display = "none";
//     }
//     for (var k = 0; k < evshop.length; k++) {
//       evshop[k].index = k;
//     }
//   }
// }