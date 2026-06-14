// 入站欢迎
// show_toast(get_hello(), 3)


// 问候语
function get_hello() {
    var now_date = new Date()
    var hour = now_date.getHours()
    if (hour >= 18) {
        return '晚上好，记得早点睡哦！'
    } else if (hour >= 13) {
        return '下午好，欢迎光临本站！'
    } else if (hour >= 11) {
        return '中午好，今天吃的啥？'
    } else if (hour >= 6) {
        return '早上好，新的一天开始啦！'
    } else {
        return '凌晨好，欢迎光临本站！'
    }
}


function show_toast(Str, delay_time = 1) {
    var toast = document.createElement('div')
    toast.className = 'toast'
    toast.innerText = Str

    document.body.appendChild(toast)

    var toast_w = toast.offsetWidth / 2
    toast.style.left = `calc(50dvw - ${toast_w}px)`

    setTimeout(() => { toast.style.transform = 'translateY(75px)' }, 0);
    setTimeout(() => { toast.style.transform = 'translateY(-75px)' }, (delay_time + 1) * 1000);
    setTimeout(() => { toast.remove() }, (delay_time + 2) * 1000);
}