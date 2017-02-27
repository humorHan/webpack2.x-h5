/**
 * Created by humorHan on 2017/2/9.
 */
require("main.scss");
var util = require('util/util.js');

var main = {
    url: 'https://top.yidianzixun.com',
    projectId: 86,
    submitId: 88,
    $name: $(".name"),
    $mobile: $(".telephone"),
    $province: $(".province"),
    $city: $(".city"),
    init: function () {
        this.initWraperSwiper();
        this.getProvince();
        this.hasPlay();
    },
    initWraperSwiper: function () {
        var _this = this;
        _this.sw = new Swiper('#pages', {
            direction: 'vertical',
            initialSlide: 0,
            speed: 700,
            followFinger: false,
            onInit: function (swiper) {
                _this.animate(+swiper.activeIndex);
            },
            onSlideChangeStart: function (swiper) {
                _this.animate(+swiper.activeIndex);
            }
        });
    },
    getProvince: function () {
        var _this = this;
        $.ajax({
            url: _this.url + '/tool/getProvince',
            data: {
                projectId: _this.projectId,
                t: +new Date()
            },
            dataType: 'json',
            success: function (data) {
                if (data.status === 1) {
                    var dataList = data.data,
                        html = '<option value="default">请选择省份</option>';
                    dataList.forEach(function (item) {
                        html += '<option>' + item.province + '</option>';
                    });
                    _this.$province.html(html);
                }
            }
        });
    },
    animate: function (index) {
        var num = index + 1,
            $dom = $("#page-" + num);
        if (num == 2) {
            this.swSmall = new Swiper('.page-2-swiper', {
                initialSlide: 0,
                speed: 700,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                followFinger: false
            });
        }
    },
    provinceChange: function () {
        var _this = this;
        var province = _this.$province.find("option:selected").val();
        if (province === 'default') {
            _this.$province.removeClass("black");
            _this.$city.html('<option value="default">请选择城市</option>').removeClass("black");
            return false;
        } else {
            _this.$province.addClass("black");
        }
        $.ajax({
            url: _this.url + '/tool/getPrefectureviCity',
            data: {
                projectId: _this.projectId,
                province: province
            },
            dataType: 'json',
            success: function (data) {
                if (data.status === 1) {
                    var dataList = data.data,
                        html = '<option value="default">请选择城市</option>';
                    dataList.forEach(function (item) {
                        html += '<option>' + item.prefectureCity + '</option>';
                    });
                    _this.$city.html(html);
                }
            }
        });
    },
    cityChange: function () {
        var province = this.$city.find("option:selected").val();
        if (province === 'default') {
            this.$city.removeClass("black");
        } else {
            this.$city.addClass("black");
        }
    },
    hasPlay: function () {
        if (util.isAndroid()) {
            //$(".video").attr("poster", "video/poster.png");
        } else {
            //$(".video").attr("poster", "video/poster-ios.png");
        }
    },
    submit: function () {
        var _this = this;
        var data = {
            project: _this.submitId,
            name: _this.$name.val(),
            phone: _this.$mobile.val(),
            province: _this.$province.find("option:selected").val(),
            city: _this.$city.find("option:selected").val()
        };
        //TODO 注意传入的值的name和公类的key对应
        if (!util.valedate({
                name: data.name,
                mobile: data.phone,
                province: data.province,
                city: data.city
            })) {
            return;
        }
        $.ajax({
            type: 'post',
            url: _this.url + '/tool/yysjInfo',
            data: data,
            success: function (data) {
                //console.log(data);
                if (data.status == 1) {
                    $(".page-3-share-pop").show();
                } else {
                    alert(data.message);
                }
            }
        });
    },
    initBtns: function () {
        var _this = this;
        $(document).on('touchmove', function (e) {
            e.preventDefault();
        });
        //预约试驾
        $(".drive-btn").on("click", function () {
            _this.sw.slideTo(2, 0);
        });
        //监听省份
        _this.$province.on("change", function () {
            _this.provinceChange();
        });
        //监听城市
        _this.$city.on("change", function () {
            _this.cityChange();
        });
        //提交
        $(".submit").on("click", function () {
            _this.submit();
        });
        //关闭分享page-3弹框
        $(".close").on("click", function () {
            $(".page-3-share-pop").hide();
        });
        // page-3 分享按钮
        $(".share").on("click", function () {
            if (!util.isWeixinBrowser && util.isAndroid()) {
                util.yidianShare();
            } else {
                $(".pop-mask").show();
            }
        });
        //点击pop-mask 
        $(".pop-mask").on("click", function () {
            $(".pop-mask").hide();
        });
        //video 
        $(".video").on("click", function () {
            $(".video")[0].play();
        });
        //see-more 查看汽车配置项按钮
        $(".see-more").on("click", function () {
            window.location.href = 'http://www.roewe.com.cn/mobile/m/i6/';
        });
    }
};

window.onload = function () {
    $('#loading').remove();
    main.init();
    main.initBtns();
};