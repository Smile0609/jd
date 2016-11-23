/*
 * @Author: zhengwei
 * @Date:   2016-08-29 09:24:33
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-09-01 08:56:42
 */

'use strict';
window.onload = function() {
    search();
    downTime();
    slide();
};
// 轮播图JS
function slide() {
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     * 6.切换图片的时候小圆点也要跟着走
     */
    var slide = document.querySelector('#slide');
    var slideWidth = slide.offsetWidth;
    // 定义一个计数的变量也就是轮播图的下标（索引）
    var index = 1;
    var slideUl = document.querySelector('#slide ul');
    // 轮播图可以自动播放要有定时器
    var timer;
    var startX = 0;
    var endX = 0;
    var moveX = 0;
    var distanceX = 0; //滑动中的距离
    var points = slide.querySelectorAll('ul:last-child li');

    function timerr() {
        timer = setInterval(function() {
            index++;
            addTransition();
            setTranslateX(-slideWidth * index);
        }, 2000);
    }
    timerr();
    // 添加一个过渡完成事件
    slideUl.addEventListener('transitionend', function() {
        //过渡完成事件
        if (index >= 9) {
            index = 1;
            removeTransition()
            setTranslateX(-slideWidth * index);
        } else if (index <= 0) {
            index = 8;
            removeTransition()
            setTranslateX(-slideWidth * index);
        }
        setPoints();
        // console.log(slideUl.style.transform);
    });
    /**
     * 1.得知道滑动的距离 如果是正值就切换到 切换到上一张
     * 2.如果是负值就切换到下一张
     * 3.添加2个事件 touchstart touchend  获取开始和结束的位置相减
     */
    slide.addEventListener('touchstart', function(e) {
        // 滑动的时候就不要自动播清除定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        console.log(endX - startX);
        if (endX - startX > 0 && Math.abs(endX - startX) > 1 / 3 * slideWidth) {
            // 切换到上一张
            index--;
        } else if (endX - startX < 0 && Math.abs(endX - startX) > 1 / 3 * slideWidth) {
            // 切换到下一张
            index++;
        }
        addTransition();
        setTranslateX(-slideWidth * index);
        clearInterval(timer);
        timerr();
    });
    //1.得知道滑动过程中 滑动的距离
    //2.获取到了这个距离 设置到当前的定位位置
    //3. 从上一次最后的位置加上这个距离
    slide.addEventListener('touchmove', function(e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        removeTransition();
        setTranslateX(-slideWidth * index + distanceX);       
    });


    function setPoints() {
        for (var i = 0; i < points.length; i++) {
            points[i].className = "";
        }
        points[index - 1].className = "active";
    }

    function setTranslateX(x) {
        slideUl.style.transform = "translateX(" + x + "px)";
    }

    function removeTransition() {
        slideUl.style.transition = "none";
    }

    function addTransition() {
        slideUl.style.transition = "all 0.2s";
    }
}


// 倒计时JS
function downTime() {
    /**
     * 1.定义一个总倒计时时间
     * 2.设置一个定时器让总时间每秒减一秒
     * 3.拆分成时分秒设置到倒计时的对应的标签上
     */
    var time = 5 * 60 * 60;
    var timer = setInterval(function() {
        time--;
        // console.log(time);
        var seckillTimes = document.querySelectorAll('.seckill-time span');
        // 7200 / 3600 == 2
        // 7400 % 3600 == 200 / 60
        // 100 % 60  == 40
        // 123 / 100  == 1
        // 123 % 100 == 23 / 10  == 2
        // 123 % 10  == 3
        var h = Math.floor(time / 3600); //  7200 / 3600 == 2
        var m = Math.floor(time % 3600 / 60); //3700 % 3600 == 100 / 60
        var s = Math.floor(time % 60); // 70 % 60  10
        seckillTimes[0].innerHTML = Math.floor(h / 10); //23 / 10 == 2
        seckillTimes[1].innerHTML = Math.floor(h % 10); //23 % 10 == 3
        seckillTimes[3].innerHTML = Math.floor(m / 10); //23 / 10 == 2
        seckillTimes[4].innerHTML = Math.floor(m % 10); //23 % 10 == 3
        seckillTimes[6].innerHTML = Math.floor(s / 10); //23 / 10 == 2
        seckillTimes[7].innerHTML = Math.floor(s % 10); //23 % 10 == 3
    }, 1000);
}
//搜索框渐变背景JS
//第一个好处是区分功能模块
//第二个好处是避免全局变量的污染
function search() {
    /**
     * 1.添加一个滚动条滚动事件
     * 2.获取滚动条滚动的距离
     * 3.计算当前滚动的位置计算透明的
     * 4.设置到顶部通栏topbar身上
     */

    window.onscroll = function() {
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var topbar = document.querySelector('.topbar');
        console.log(scrollTop);
        if (scrollTop < document.querySelector('#slide').offsetHeight) {
            // console.log(scrollTop);
            // 计算透明的值
            var opcity = scrollTop / document.querySelector('#slide').offsetHeight;

            // opcity和rgba 
            // opcity 是会继承的而且只能设置在盒子身上 opcity只能设置在盒子身上
            // rgba 是不继承的 他可以设置在任意可以设置颜色的地方(是颜色的透明的)
            topbar.style.backgroundColor = 'rgba(201, 21, 35, ' + opcity + ')';
        } else {
            topbar.style.backgroundColor = 'rgba(201, 21, 35, 0.85)';
        }
    }
}
