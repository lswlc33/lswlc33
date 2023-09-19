// 变量
var mouse_circle_1 = ''
var mouse_circle_2 = ''
var cx = 0, cy = 0
var mouseX = 0, mouseY = 0


function creat_new_cursor() {
    mouse_circle_1 = document.createElement("div")
    mouse_circle_1.style = `
    position: fixed;
    background: rgba(255, 255, 255,0.6);
    backdrop-filter: blur(10px);
    border-radius: 999px;
    height: 20px;
    width: 20px;
    opacity: 0;
    transition: transform 0.5s,opacity 0.3s;
    z-index: 999;
    pointer-events: none;
    `

    mouse_circle_2 = document.createElement("div")
    mouse_circle_2.style = `
    position: fixed;
    background: transparent;
    border: rgba(255, 255, 255,0.3) 2px solid;
    border-radius: 999px;
    height: 50px;
    width: 50px;
    opacity: 0;
    transition: transform 0.2s,opacity 0.3s;
    z-index: 999;
    pointer-events: none;
    `
    document.body.appendChild(mouse_circle_1)
    document.body.appendChild(mouse_circle_2)
}


function hide_cursor() {
    // 设置默认光标隐藏
    all_element = document.querySelectorAll("*")
        .forEach(element => {
            element.style.cursor = "none"
        });
}


function addListener() {
    // 鼠标移动监听事件
    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX    // 获取当前鼠标位置
        mouseY = e.clientY

        mouse_circle_1.style.opacity = 1    // 移动时光标淡入
        mouse_circle_2.style.opacity = 1

        mouse_circle_1.style.left = `${mouseX - 10}px`    // 小圆的移动
        mouse_circle_1.style.top = `${mouseY - 10}px`

    })

    // 鼠标出入监听事件
    document.addEventListener("mouseleave", function () {
        mouse_circle_1.style.opacity = 0    // 离开网页光标淡出
        mouse_circle_2.style.opacity = 0
    })

    // 鼠标点击监听事件
    document.addEventListener("mousedown", function () {
        mouse_circle_1.style.transform = "scale(0.8)"   // 缩小
        setTimeout(() => {
            mouse_circle_2.style.transform = "scale(0.8)"
        }, 200);

    })
    document.addEventListener("mouseup", function () {
        mouse_circle_1.style.transform = "scale(1)"     // 回正
        setTimeout(() => {
            mouse_circle_2.style.transform = "scale(1)"
        }, 200);
    })
}


function circle_move() {
    // 大圆的移动
    var ca = () => {
        cx += (mouseX - cx) / 10
        cy += (mouseY - cy) / 10
        mouse_circle_2.style.left = `${cx - 27}px`
        mouse_circle_2.style.top = `${cy - 27}px`
        window.requestAnimationFrame(ca)
    }
    window.requestAnimationFrame(ca)
}





onload = () => {
    // 检测是否桌面端
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        return false
    }
    // 创建光标元素
    hide_cursor()
    creat_new_cursor()
    // 添加光标监听
    addListener()
    // 设置外圈跟随
    circle_move()
}