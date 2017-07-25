<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/webservice/h5/getShare.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no">
    <meta name="screen-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-orientation" content="portrait">
    <meta name="x5-fullscreen" content="true">
    <link rel="shortcut icon" type="image/x-icon" href="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
    <title>荣威i6让生活充满i</title>
</head>
<body>
<!--一点资讯分享-->
<div id="yidian_share_title" class="yidianShare" style="display:none;">荣威i6让生活充满i</div>
<div id="yidian_share_content" class="yidianShare" style="display:none;">预约试驾，赢取2亿红包。</div>
<div id="yidian_share_url" class="yidianShare" style="display:none;">https://toptest.yidianzixun.com/2017/hjy/roewe-price/app.php</div>
<div id="yidian_share_imageurl" class="yidianShare" style="display:none;">http://tstatic.toptest.yidianzixun.com.ks3-cn-beijing.ksyun.com/public/files/share1487213513394.jpg</div>
<!-- end -->

<div style="display: none;" id="timestamp" class="wxShare"><?php echo $timestamp; ?></div>
<div style="display: none;" id="nonceStr" class="wxShare"><?php echo $nonceStr; ?></div>
<div style="display: none;" id="signature" class="wxShare"><?php echo $signature; ?></div>

<div id="loading"></div>



<!--加入微信分享-->
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript">
    var my_timestamp=document.getElementById('timestamp').innerText.trim();
    var my_nonceStr=document.getElementById('nonceStr').innerText.trim();
    var my_signature=document.getElementById('signature').innerText.trim();
    var myWXdata = {
        imgurl:"http://tstatic.toptest.yidianzixun.com.ks3-cn-beijing.ksyun.com/public/files/share1487213513394.jpg",
        url:'https://toptest.yidianzixun.com/2017/hjy/roewe-price/app.php',
        title:'荣威i6让生活充满i',
        desc:'预约试驾，赢取2亿红包。'
    };
    wx.config({
        debug: false,//判断是否为debug模式
        appId:'wxa64947f6b6549e88',
        timestamp:my_timestamp,
        nonceStr:""+my_nonceStr,
        signature:""+my_signature,
        jsApiList:[
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
        ]//开启的功能列表
    });
    var sharePerson = function(){
        wx.ready(function(){
            var mydata=myWXdata;
            wx.onMenuShareTimeline({
                title: myWXdata.title,
                link: myWXdata.url,
                imgUrl: myWXdata.imgurl,
                trigger: function (res) {
                    //alert('点击分享到朋友圈');
                },
                success:function(res){

                }
            });
            wx.onMenuShareAppMessage({
                title: mydata.title,
                desc: mydata.desc,
                link:  mydata.url,
                imgUrl: mydata.imgurl,
                trigger: function (res) {
                    //alert('用户点击发送给朋友');
                },
                success:function(res){

                }
            });
            wx.onMenuShareQQ({
                title: mydata.title,
                desc: mydata.desc,
                link: mydata.url,
                imgUrl: mydata.imgurl,
                trigger: function (res) {
                    //alert('用户点击分享到QQ');
                },
                success:function(res){

                }
            });
        });
    };
    sharePerson();
</script>

</body>
</html>