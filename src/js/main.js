/**
 * Created by humorHan on 2017/2/9.
 */
require("main.scss");
var util = require('util/util.js');
var pImg = require('pImg.js');

var main = {
    init: function(){

    },
    initBtns: function(){

    }
};

var num, first = true;
pImg.loader([

], function (percent) {
    num = Math.ceil(percent * 100);
    if (num >= 100 && first) {
        first = false;
        $('#loading').remove();
        main.init();
        main.initBtns();
    }
});