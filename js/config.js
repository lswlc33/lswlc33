/* 
这里是可供设置的选项
*/

// 网页标题
var title = '雪中明月 の 主页'

// 标题域名
var donmin = '雪中明月'
var suffix = '.top'

// 背景图片
var background_img = "https://xn--fiqz59cpva341l.top/img/background1.jpg"

// 标题下面的句子
var sentence_first = 'Here is a scentence'
var sentence_second = '呼噜呼噜喝~~~'

// 移动端检测
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 社交链接
var contact_list = [
    {
        type: 'email',
        show: 1,
        herf: 'mailto:lswlc33@outlook.com',
    },
    {
        type: 'qq',
        show: 1,
        herf: 'mailto:lswlc33@qq.com',
    },
    {
        type: 'wechat',
        show: 0,
        herf: '',
    },
    {
        type: 'telegram',
        show: 1,
        herf: 'https://t.me/xiao_gong',
    },

]

// 导航链接
var links_list = [
    {
        text: '项目',
        herf: 'https://github.com/lswlc33',
    },
    {
        text: '博客',
        herf: 'http://blog.xn--fiqz59cpva341l.top/',
    },
    {
        text: '网盘',
        herf: 'http://pan.xn--fiqz59cpva341l.top/',
    },
    {
        text: '游戏',
        herf: 'http://paimon.xn--fiqz59cpva341l.top/',
    },
    {
        text: '测试',
        herf: 'https://webtest.xn--fiqz59cpva341l.top/',
    },
    {
        text: '福利',
        herf: 'http://fuli.xn--fiqz59cpva341l.top/',
    },
]


// 页脚文字
var footer_text = '雪中明月 & ' + '<a href="https://icp.gov.moe/?keyword=20230701" target="_blank" data-v-8c2fbfba="">萌ICP备20230701号</a>'








/* 
下面是设置实现
*/
function init_config() {
    // 设置标题
    document.querySelector('title').textContent = title

    // 设置标题域名
    document.getElementById('donmin').innerText = donmin
    document.getElementById('suffix').innerText = suffix

    // 设置句子
    var divElements = document.querySelectorAll("#scentence > div")
    divElements[0].textContent = sentence_first
    divElements[1].textContent = sentence_second

    // 设置社交盒子
    var divElements = document.querySelectorAll(".contact_ico");
    divElements.forEach(function (element, index) {
        if (contact_list[index].show) {
            element.addEventListener("click", function () {
                window.open(contact_list[index].herf, "_blank", "noopener,noreferrer");
            });
        } else {
            element.style.display = 'none'
        }
    });

    // 设置背景图片
    document.getElementById('background_img').style.background = `url(${background_img}) no-repeat center center / cover fixed`

    // 设置链接盒子
    var divElements = document.querySelectorAll(".link_group .link_box");
    divElements.forEach(function (element, index) {
        element.textContent = links_list[index].text;
        element.addEventListener("click", function () {
            window.open(links_list[index].herf, "_blank", "noopener,noreferrer");
        });
    });

    // 设置页脚信息
    var date = new Date();
    var year = date.getFullYear();
    var buttom_bar = document.getElementById('buttom_bar')
    buttom_bar.textContent = ''
    buttom_bar.appendChild(document.createTextNode('Copyright © ' + year + ' 雪中明月 & '))
    var icp_link = document.createElement('a')
    icp_link.href = 'https://icp.gov.moe/?keyword=20230701'
    icp_link.target = '_blank'
    icp_link.rel = 'noopener noreferrer'
    icp_link.textContent = '萌ICP备20230701号'
    buttom_bar.appendChild(icp_link)
    buttom_bar.classList.remove('loading')
}
