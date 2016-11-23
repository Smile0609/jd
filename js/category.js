/*
 * @Author: zhengwei
 * @Date:   2016-08-30 09:26:49
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-09-01 09:13:10
 */

'use strict';
window.onload = function() {
    swipeLeft();
};
// 左侧分类菜单滑动
function swipeLeft() {
    /**
     * 1.让左侧分类菜单支持上下滑动 垂直滑动
     * 2.滑动有最大的一个滑动位置  最小滑动的位置
     * 3.ul允许的最大位置在Y轴移动的值 0 还有个ul允许最小Y轴移动的位置 cate-left - ul 高度
     * 4.如果超过那个最大移动值 或者小于 最小移动值 吸附回去
     * 5.点击某一个分类li的时候要让这个li滑动到顶端的位置
     * 6.点击的时候如果超过 最大移动值 或者小于 最小移动值 不让吸顶   
     * */
    var categoryLeft = document.querySelector('.category-left');
    var swipeUl = document.querySelector('.category-left ul');
    var startY = 0;
    var moveY = 0;
    var endY = 0;
    var distanceY = 0;
    // 贯穿全局的index我当前已经滑动到的位置
    var currentY = 0;
    //是最大的位移的位置
    var maxPosition = 0;
    //最小的位移的位置
    var minPosition = categoryLeft.offsetHeight - swipeUl.offsetHeight;
    // 最大支持的滑动位置
    var maxSwipe = maxPosition + 150;
    //最小支持的滑动位置
    var minSwipe = minPosition - 150;
    swipeUl.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    swipeUl.addEventListener('touchmove', function(e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        removeTransition();
        //判断滑动的距离有没有超过最大允许滑动的位置 和 大于最小的滑动位置（合理的滑动）
        if ((currentY + distanceY) < maxSwipe && (currentY + distanceY) > minSwipe) {
            setTranslateY(currentY + distanceY);
        }
    });
    swipeUl.addEventListener('touchend', function(e) {
        // 记录上次的滑动的距离然后每一次滑动的距离相加
        // 就是当前位移的位置
        currentY += distanceY;
        endY = e.changedTouches[0].clientY;
        if (currentY > maxPosition) {
            //超过了最大允许位置的位置要吸附回去
            currentY = maxPosition;
            setTranslateY(currentY);
            addTransition();
        } else if (currentY < minPosition) {
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
    });
    /**
     * 1.点击某一个分类要吸顶
     * 2.给ul添加点击事件
     */
    swipeUl.addEventListener('click', function(e) {
        //获取所有的li
        var lis = swipeUl.querySelectorAll('li');
        //当前点中Li
        var li = e.target.parentNode;
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        var height = li.offsetHeight;
        console.log(li.index);
        var yidongY = -li.index * height;
        //-1000px
        //-600px
        if (yidongY > minPosition) {            
            currentY = yidongY;
            addTransition();
            setTranslateY(currentY);
        } else {
            //小于了最小位移的位置
            currentY = minPosition;
            setTranslateY(currentY);
            addTransition();
        }
        // currentY = li.index;
        li.className = "active";
    });

    function setTranslateY(y) {
        swipeUl.style.transform = "translateY(" + y + "px)";
    }

    function removeTransition() {
        swipeUl.style.transition = "none";
    }

    function addTransition() {
        swipeUl.style.transition = "all 0.2s";
    }
}
