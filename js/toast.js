function show_toast(Str, delay_time = 1) {
    var toast = document.createElement('div')
    toast.innerText = Str

    toast.style.transition = 'transform 1s'
    toast.style.borderRadius = '100px'
    toast.style.backgroundColor = 'rgba(0,0,0,0.3)'
    toast.style.backdropFilter = 'blur(10px)'
    toast.style.padding = '10px 20px 10px 20px'
    toast.style.color = 'white'
    toast.style.textAlign = 'center'
    toast.style.fontSize = '16px'

    document.body.appendChild(toast)

    toast.style.position = 'fixed'
    toast.style.top = '-50px'
    var toast_w = toast.offsetWidth / 2
    console.log(toast_w,'50dvh')
    toast.style.left = `calc(50dvh - ${toast_w}px)`


    setTimeout(() => {
        toast.style.transform = 'translateY(75px)'
    }, 100);

    setTimeout(() => {
        toast.style.transform = 'translateY(-75px)'
    }, (delay_time + 1) * 1000);
}

show_toast('早上好! 欢迎来到本站！', 3)