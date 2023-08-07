function init_cursor() {
    // 隐藏默认光标
    var all = document.querySelectorAll("*")
    all.forEach(element => {
        element.style.cursor = "none"
    });

    // 创建光标
    var cursor = document.createElement('div')
    cursor.id = 'cursor'
    cursor.style.height = '20px'
    cursor.style.width = '20px'
    cursor.style.backgroundColor = 'rgba(255,255,255,0.3)'
    cursor.style.borderRadius = '10px'
    cursor.style.position = 'fixed'
    cursor.style.backdropFilter = 'blur(10px)'  // 模糊
    cursor.style.transition = "transform 0.5s"  // 动画
    cursor.style.pointerEvents = 'none'         // 点击穿透

    // 添加光标
    document.body.appendChild(cursor)

    // 点击缩放动画
    document.addEventListener('mousedown', function () {
        cursor.style.transform = "scale(1.2)"
    })

    document.addEventListener('mouseup', function () {
        cursor.style.transform = "scale(1)"
    })
}

onload = function () {
    // 网页加载完成时

    // 检测是否桌面端
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile){
        return false
    }

    // 初始化光标
    init_cursor()

    // 光标的移动动画
    function change_cursor_position(mouseX, mouseY) {
        var cursor = document.getElementById('cursor')
        cursor.style.left = mouseX + 'px'
        cursor.style.top = mouseY + 'px'
    }

    // 监听鼠标移动
    document.addEventListener('mousemove', function () {
        var mouseX = event.clientX - 10;
        var mouseY = event.clientY - 10;
        change_cursor_position(mouseX, mouseY);
    })
}





