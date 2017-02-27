<?php
$url = 'https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$url = urlencode($url);
$curl = curl_init();
$curApiUrl = "https://t1toptest.yidianzixun.com/webservice/wxHttpsShare/get.php";
// $curApiUrl;
// if(is_https()){
//     $curApiUrl = "https://t1toptest.yidianzixun.com/webservice/wxHttpsShare/get.php";
// } else {
//     $curApiUrl = "http://t1.toptest.yidianzixun.com/webservice/wxHttpShare/get.php";
//     $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
//     $url = urlencode($url);
// }
curl_setopt_array($curl, array(
    CURLOPT_URL => $curApiUrl . "?clientUrl=" . $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => "Key=ydinfo2016&RequestObjectList=%5B%5D",
    CURLOPT_HTTPHEADER => array(
        "cache-control: no-cache",
        "content-type: application/x-www-form-urlencoded"
    )
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    $response = json_decode($response);
    $data = $response->data;

    $timestamp = $data->timestamp;

    $nonceStr = $data->nonceStr;

    $signature = $data->signature;
}
function is_https()
{
    if ( ! empty($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) !== 'off')
    {
        return TRUE;
    }
    elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
    {
        return TRUE;
    }
    elseif ( ! empty($_SERVER['HTTP_FRONT_END_HTTPS']) && strtolower($_SERVER['HTTP_FRONT_END_HTTPS']) !== 'off')
    {
        return TRUE;
    }

    return FALSE;
}
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
<link href="main-9f65a334ee67cc99fdc1ffeee77024ec.css" rel="stylesheet"></head>
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

<section id="pages" class="swiper-container">
    <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
        <section class="swiper-slide" id="page-1">
            <div class="logo"></div>
            <div class="drive-btn"></div>
            <div class="page-arrow"></div>
        </section>
        <section class="swiper-slide" id="page-2">
            <div class="drive-btn"></div>
            <div class="page-arrow"></div>
            <div class="swiper-container page-2-swiper">
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                    <section class="swiper-slide" id="page-2-1"></section>
                    <section class="swiper-slide" id="page-2-2"></section>
                    <section class="swiper-slide" id="page-2-3"></section>
                    <section class="swiper-slide" id="page-2-4"></section>
                    <section class="swiper-slide" id="page-2-5"></section>
                </div>
            </div>
            <div class="logo"></div>
        </section>
        <section class="swiper-slide" id="page-3">
            <div class="logo"></div>
            <div class="drive-btn"></div>
            <div class="page-arrow"></div>
            <div class="page-3-wrap">
                <input type="text" class="name form-style" placeholder="姓名">
                <input type="text" class="telephone form-style" placeholder="电话">
                <select class="province form-style">
                    <option value="default">请选择省份</option>
                </select>
                <select class="city form-style">
                    <option value="default">请选择城市</option>
                </select>
                <div class="submit"></div>
            </div>
            <div class="page-3-share-pop">
                <div class="close"></div>
                <div class="share"></div>
            </div>
            <div class="pop-mask">
                <img class="share-arrow" src="img/page-3/share-arrow.png">
            </div>
        </section>
        <section class="swiper-slide" id="page-4">
            <div class="logo"></div>
            <div class="drive-btn"></div>
            <div class="see-more"></div>
           /* <video class="video" poster="" src="video/video1.mp4?v=1"></video>*/
        </section>
    </div>
</section>

<script>
    (function() {
        var doc = document,
            clientH = doc.body.clientHeight,
            DIP_W = clientH * 0.5633;

        var nodeList = [
            doc.querySelector('.page-3-wrap')
            //doc.querySelector('.page-4-dialog-wrap')
        ];

        nodeList.forEach(function(v, i) {
            v.style.width = DIP_W + 'px';
            v.style.height = clientH + 'px';
        });

        doc.querySelector('body').style.height = clientH + 'px';
        doc.querySelector('#page-3').style.height = clientH + 'px';

    })()

</script>

<script src="dep/jquery-3.1.1.min.js"></script>
<script src="dep/swiper-3.3.1.min.js"></script>

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
        appId:'wxdda4779e3944e490',
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

<script type="text/javascript" src="js/main-1ea62a72b74ddea9b243.js"></script></body>
</html>