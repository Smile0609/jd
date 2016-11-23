/*
 * @Author: zhengwei
 * @Date:   2016-09-01 15:45:29
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-09-01 16:20:30
 */

'use strict';
$(function() {
    //如果要使用这样的高级选择器要引人selector.js
    //如果要使用动画animate() 要引人fx
    //如果要使用touch之类的触摸方法要引入touch.js
    /**
     * 1.轮播图可以自动播放
     * 2.无缝轮播图
     * 3.轮播图要支持滑动 从左往右滑  切换到上一张 从右往左滑要换到 下一张
     * 4.滑动中要能预览上一张或者下一张
     * 5.滑动距离超过轮播图的1/3的时候才切换 如果不超过 吸附回去
     * 6.切换图片的时候小圆点也要跟着走
     */
    var slide = $('#slide');
    var slideWidth = slide.width();
    // 定义一个计数的变量也就是轮播图的下标（索引）
    var index = 1;
    var slideUl = $('#slide ul:first-child');
    // 轮播图可以自动播放要有定时器
    var timer;
    var points = $('ul:last-child li');

    function timerr() {
        timer = setInterval(function() {
            index++;
            animateFun();
        }, 2000);
    }

    function animateFun(callback) {
        slideUl.animate({
            'transform': 'translateX(' + -slideWidth * index + 'px)',
        }, 200, "ease-out", function() {
            if (index >= 9) {
                index = 1;
                slideUl.css('transition', "none");
                slideUl.css('transform', 'translateX(' + -slideWidth * index + 'px)');
            } else if (index <= 0) {
                index = 8;
                slideUl.css('transition', "none");
                slideUl.css('transform', 'translateX(' + -slideWidth * index + 'px)');
            }
            clearInterval(timer);
            callback && callback();
        });
    }
    timerr();
    slideUl.on('swipeLeft', function() {
        clearInterval(timer);
        index++;
        animateFun(function() {
            timerr();
        });
    });
    slideUl.on('swipeRight', function() {
        clearInterval(timer);
        index--;
        animateFun(function() {
            timerr();
        });
    });
});