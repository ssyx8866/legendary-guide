//多物体多样式的运动   startMove(this, "width", 300);
function startMove(node, cssObj, complete){ //complete = show;
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        
        var isEnd = true; //假设所有动画都都到达目的值

        for(var attr in cssObj){
            //取出当前css样式的目的值
            var iTarget = cssObj[attr];
            //1、获取当前值
            var iCur = null;

            if(attr == "opacity"){
                iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
            }else{
                iCur = parseInt(getStyle(node, attr))
            }
            //2、计算速度
            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if(attr == "opacity"){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity=${iCur})`;

            }else{
                node.style[attr] = iCur + speed + 'px';
            }
            
            //当前值是否瞪目目的值
            if(iCur != iTarget){
                isEnd = false;
            }
        }
        

        if(isEnd){
            //说明都到达目的值
            clearInterval(node.timer);
           
            if(complete){
                complete.call(node);
            }
        }
    }, 30);
}

/*
    node  元素节点
    cssStyle  获取css样式类型
*/
function getStyle(node, cssStyle){
    if(node.currentStyle){
        return node.currentStyle[cssStyle];
    }else{
        return getComputedStyle(node)[cssStyle];
    }
}






window.onload = function () {
    var ln1 = document.querySelectorAll("#navbox .logonav li");
    var navbb = document.querySelectorAll("#navbb #navbbox");

    for (var i = 0; i < ln1.length; i++) {
      ln1[i].index = i;
      ln1[i].onmouseenter = function () {
        navbb[this.index].style.display = "block";
      };

      navbb[i].onmouseleave = function () {
        navbb[this.index].style.display = "none";
      };
    }
    for (var k = 0; k < navbb.length; k++) {
      navbb[k].index = k;
      navbb[k].onmouseleave = function () {
        navbb[this.index].style.display = "none";
      };
    }


    const oBanner = document.querySelector(".banner");
    const oUl = document.querySelector(".banner .imgBox");
    const aBtns = document.querySelectorAll(".banner .pointBox li");
    const LeftANDRightBtn = document.querySelectorAll(".leftRightTabs a");
    let iNow = 1; //代表当前显示的图片的下标
    let timer = null;
    let isRunning = false; //代表当前动画是否在执行。

    //一开始就要调用一次
    timerInner();

    //点击按钮的时候，进行小圆点切换和轮播图的切换
    for (var i = 0; i < aBtns.length; i++) {
      aBtns[i].index = i;
      aBtns[i].onclick = function () {
        iNow = this.index + 1;
        tab();
      };
    }

    //自动轮播
    function timerInner() {
      timer = setInterval(function () {
        iNow++;
        tab();
      }, 2000);
    }

    //实现轮播效果
    function tab() {

      console.log(iNow);
      for (var i = 0; i < aBtns.length; i++) {
        aBtns[i].className = "";
      }
      if (iNow == aBtns.length + 1) {
        aBtns[0].className = "active";
      } else if (iNow == 0) {
        aBtns[aBtns.length - 1].className = "active";
      } else {
        aBtns[iNow - 1].className = "active";
      }

      //开始动画
      isRunning = true;
      startMove(oUl, { left: iNow * -1349 }, function () {
        //判断最后一张图片结束的时候
        if (iNow == aBtns.length + 1) {
          iNow = 1;
          oUl.style.left = "-1349px";

          //判断第一张图片的时候
        } else if (iNow == 0) {
          iNow = 8;
          oUl.style.left = iNow * -1349 + "px";
        }
        //这里动画结束
        isRunning = false;
      });
    }

    //给banner添加鼠标的移入和移出
    oBanner.onmouseenter = function () {
      clearInterval(timer);
    };
    oBanner.onmouseleave = function () {
      //重新启动动画
      timerInner();
    };

    //添加左右按钮的点击
    LeftANDRightBtn[0].onclick = function () {
      if (!isRunning) {
        iNow--;
        tab();
      }
      return false;
    };

    LeftANDRightBtn[1].onclick = function () {
      if (!isRunning) {
        iNow++;
        tab();
      }
      return false;
    };

    //【注】这里的防抖时间，要大于动画的执行时间。
  };