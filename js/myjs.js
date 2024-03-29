// 移动端的菜单展开与关闭
function expand_open() {
  var left = document.getElementById('left')
  var right = document.getElementById('right')
  show_toast('正在切换！', 0)

  setTimeout(() => {
    left.style.display = 'none'
    right.style.display = 'flex'
  }, 300);
  left.style.opacity = 0
  right.style.opacity = 1

}

function expand_close() {
  var left = document.getElementById('left')
  var right = document.getElementById('right')
  show_toast('正在切换！', 0)

  setTimeout(() => {
    left.style.display = 'flex'
    right.style.display = 'none'
  }, 300);
  left.style.opacity = 1
  right.style.opacity = 0
}

// 时间更改与更新
setInterval(() => {
  change_time()
}, 1000);

function change_time() {
  var date = new Date();
  var clock = document.getElementById('time_box')

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var c_time = hours + ":" + minutes + ":" + seconds;

  clock.innerHTML = c_time
}

// 一言的更改与更新
function change_onelrc(notice = true) {
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      if (data.length > 25) {
        change_onelrc()
      } else {
        const lrc = document.getElementById('lrc')
        const from = document.getElementById('lrc_author')
        lrc.innerText = data.hitokoto
        from.innerText = '——' + data.from
        if (notice) {
          show_toast('一言更新成功！', 1)
        }
      }


    })
    .catch()
}

// 为壁纸添加动态效果
let innerdiv = document.querySelector('#background_img')
let outerdiv = document.querySelector('#background')
// 判断平台
if (!/mobile/i.test(navigator.userAgent.toLowerCase())) {
  // 添加鼠标壁纸微动
  window.addEventListener('mousemove', (event) => {
    let x = event.clientX;
    let y = event.clientY;
    x = x - outerdiv.offsetWidth / 2;
    y = y - outerdiv.offsetHeight / 2;

    innerdiv.style.transform = `scale(1.05) translate(${-x / 200}px,${-y / 200}px)`;
  });
} else {
  // 添加重力壁纸微动
  let currentGamma = 0;
  let currentBeta = 0;
  window.addEventListener('deviceorientation', (event) => {
    let beta = event.beta * 0.1; // 前后倾斜
    let gamma = event.gamma * 0.1; // 左右倾斜

    currentGamma += (gamma - currentGamma) * 0.1;
    currentBeta += (beta - currentBeta) * 0.1;
    document.getElementById('background_img').style.transform = `scale(1.05) translate(${currentGamma}px, ${currentBeta}px)`;
  });
}

setTimeout(() => {
  change_onelrc(false)
}, 1000);


setTimeout(() => {
  show_toast(get_hello(), 3)
}, 2000);


load_beginning()
init_config()
