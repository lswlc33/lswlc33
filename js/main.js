/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
    element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${y - halfAlementWidth2 + 1}px)`;
}

body.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function () {
        setPosition(e.clientX, e.clientY);
    });
});

//移动端去除鼠标样式
switch (true) {
    case navigator.userAgent.indexOf('Mobile') > 0:
        $('#g-pointer-2').css("display", "none");
}

//加载完成后执行
window.addEventListener('load', function () {

    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('#section').css("cssText", "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important");

    //用户欢迎
    setTimeout(function () {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello,
            message: '欢迎来到我的主页'
        });
    }, 800);


    //中文字体缓加载-此处写入字体源文件
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
//     const font = new FontFace(
//         "MiSans",
//         "url(" + "./font/MiSans-Regular.woff2" + ")"
//     );
//     document.fonts.add(font);

// }, false)

setTimeout(function () {
    $('#loading-text').html("字体及文件加载可能需要一定时间")
}, 3000);



//获取一言
fetch('https://v1.hitokoto.cn?max_length=24')
    .then(response => response.json())
    .then(data => {
        $('#hitokoto_text').html(data.hitokoto)
        $('#from_text').html(data.from)
    })
    .catch(console.error)

let times = 0;
$('#hitokoto').click(function () {
    if (times == 0) {
        times = 1;
        let index = setInterval(function () {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch('https://v1.hitokoto.cn?max_length=24')
            .then(response => response.json())
            .then(data => {
                $('#hitokoto_text').html(data.hitokoto)
                $('#from_text').html(data.from)
            })
            .catch(console.error)
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '你点太快了吧'
        });
    }
});


//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#time").html(y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
    t = setTimeout(time, 1000);
}

//链接提示文字
$("#social").mouseover(function () {
    $("#social").css({
        "background": "rgb(0 0 0 / 25%)",
        'border-radius': '6px',
        "backdrop-filter": "blur(5px)"
    });
    $("#link-text").css({
        "display": "block",
    });
}).mouseout(function () {
    $("#social").css({
        "background": "none",
        "border-radius": "6px",
        "backdrop-filter": "none"
    });
    $("#link-text").css({
        "display": "none"
    });
});

$("#github").mouseover(function () {
    $("#link-text").html("去 Github 看看");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#qq").mouseover(function () {
    $("#link-text").html("有什么事吗");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#email").mouseover(function () {
    $("#link-text").html("来封 Email");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#bilibili").mouseover(function () {
    $("#link-text").html("来 B 站看看 ~");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});
$("#telegram").mouseover(function () {
    $("#link-text").html("你懂的 ~");
}).mouseout(function () {
    $("#link-text").html("通过这里联系我");
});

//自动变灰
let myDate = new Date;
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ['4.4', '5.12', '7.7', '9.9', '9.18', '12.13'];
for (let day of days) {
    let d = day.split('.');
    if (mon == d[0] && date == d[1]) {
        document.write(
            '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
        );
        $("#change").html("Silence&nbsp;in&nbsp;silence");
        $("#change1").html("今天是中国国家纪念日，全站已切换为黑白模式");
        window.addEventListener('load', function () {
            setTimeout(function () {
                iziToast.show({
                    timeout: 14000,
                    icon: "fa-solid fa-clock",
                    message: '今天是中国国家纪念日'
                });
            }, 3800);
        }, false);
    }
}


//更多页面关闭按钮
$('#close').on('click', function () {
    $('#switchmore').click();
});

//移动端菜单栏切换
let switchmenu = false;
$('#switchmenu').on('click', function () {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//更多弹窗页面
$('#openmore').on('click', function () {
    $('#box').css("display", "block");
    $('#row').css("display", "none");
    $('#more').css("cssText", "display:none !important");
});
$('#closemore').on('click', function () {
    $('#box').css("display", "none");
    $('#row').css("display", "flex");
    $('#more').css("display", "flex");
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("Hello&nbsp;World&nbsp;!");
            $("#change1").html("一个建立于 21 世纪的小站，存活于互联网的边缘");

            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})

//移动端切换功能区
let changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$("#more").hover(function () {
    $('#close').css("display", "block");
}, function () {
    $('#close').css("display", "none");
})

//屏蔽右键
document.oncontextmenu = function () {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: '为了浏览体验，本站禁用右键'
    });
    return false;
}

//控制台输出
console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
let styleContent = `
color: rgb(30,152,255);
`
let title1 = '雪中明月の主页'
let title2 = `
 _              _       ___  ___ 
| | ___  _ _ _ | | ___ |_  ||_  |
| ||_ -|| | | || ||  _||_  ||_  |
|_||___||_____||_||___||___||___|
`
let content = `

只因你太美 baby 只因你太美 baby
只因你实在是太美 baby 只因你太美 baby
迎面走来的你让我如此蠢蠢欲动
这种感觉我从未有
Cause I got a crush on you who you
你是我的我是你的谁
再多一眼看一眼就会爆炸
再近一点靠近点快被融化
想要把你占为己有baby bae
不管走到哪里都会想起的人是你 you you
我应该拿你怎样
uh 所有人都在看着你
我的心总是不安
oh 我现在已病入膏肓
eh eh 难道真的因为你而疯狂吗
我本来不是这种人
因你变成奇怪的人
第一次呀变成这样的我
不管我怎么去否认
只因你太美 baby 只因你太美 baby
只因你实在是太美 baby 只因你太美 baby
oh eh oh现在确认地告诉我
oh eh oh 你到底属于谁
oh eh oh现在确认地告诉我
oh eh oh 你到底属于谁 就是现在告诉我
跟着这节奏 缓缓 make wave
甜蜜的奶油 it's your birthday cake
男人们的 game call me 你恋人
别被欺骗愉快的 I wanna play
我的脑海每分每秒只为你一人沉醉
最迷人让我神魂颠倒是你身上香水
oh right baby I'm fall in love with you
我的一切你都拿走只要有你就已足够
我到底应该怎样
uh 我心里一直很不安
其他男人们的视线
Oh 全都只看向你的脸
Eh eh 难道真的因为你而疯狂吗
我本来不是这种人
因你变成奇怪的人
第一次呀变成这样的我
不管我怎么去否认
只因你太美 baby 只因你太美 baby
只因你实在是太美 baby 只因你太美 baby
我愿意把我的全部都给你
我每天在梦里都梦见你还有我闭着眼睛也能看到你
现在开始我只准你看我
I don’t wanna wake up in dream 我只想看你这是真心话
只因你太美 baby 只因你太美 baby
只因你实在是太美 baby 只因你太美 baby
oh eh oh现在确认的告诉我
oh eh oh 你到底属于谁
oh eh oh现在确认的告诉我
oh eh oh 你到底属于谁就是现在告诉我
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)
