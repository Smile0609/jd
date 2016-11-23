/*
 * @Author: zhengwei
 * @Date:   2016-09-01 09:55:49
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-09-01 15:43:06
 */

'use strict';
window.onload = function() {
    deleteProduct();
}

function deleteProduct() {
    /**
     * 1.点击垃圾篓给弹出框添加动画类名
     * 2.点击垃圾篓要给每一个垃圾篓都添加单击事件
     */
    var deleteBox = document.querySelectorAll('.delete-box');
    var model = document.querySelector('#model');
    var btnCancel = document.querySelector('.btn-cancel');
    var deleteUp;
    for (var i = 0; i < deleteBox.length; i++) {
        deleteBox[i].addEventListener('click', function() {
            //给弹出框添加类名
            //首先得让弹出框显示出来
            model.style.display = "block";
            model.querySelector('.model-info').classList.add('bounceInDown');
            deleteUp = this.querySelector('span');
            deleteUp.style.transform = "rotateZ(-45deg) translateY(3px)";
            deleteUp.style.transformOrigin = "left bottom";
            deleteUp.style.transition = "all 1s";
        });
    }

    btnCancel.addEventListener('click', function() {

        // 隐藏模态框
        model.style.display = "none";
        //盖回盖子
        deleteUp.style.transform = "none";
        deleteUp.style.transition = "all 1s";
    });
}
