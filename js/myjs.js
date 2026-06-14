var rightExpanded = false

function expand_toggle() {
  var left = document.getElementById('left')
  var right = document.getElementById('right')
  show_toast('正在切换！', 0)
  rightExpanded = !rightExpanded
  setTimeout(() => {
    left.style.display = rightExpanded ? 'none' : 'flex'
    right.style.display = rightExpanded ? 'flex' : 'none'
  }, 300)
  left.style.opacity = rightExpanded ? 0 : 1
  right.style.opacity = rightExpanded ? 1 : 0
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

  clock.textContent = c_time
}

// 一言的更改与更新
var lrcLoading = false

function change_onelrc(notice = true, retries = 3) {
  if (lrcLoading) return
  lrcLoading = true
  var lrc_box = document.getElementById('lrc_box')
  lrc_box.classList.add('loading')
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      if (data.hitokoto.length > 25 && retries > 0) {
        lrcLoading = false
        change_onelrc(notice, retries - 1)
      } else {
        const lrc = document.getElementById('lrc')
        const from = document.getElementById('lrc_author')
        lrc.innerText = data.hitokoto
        from.innerText = '——' + data.from
        lrc_box.classList.remove('loading')
        lrcLoading = false
        if (notice) {
          show_toast('一言更新成功！', 1)
        }
      }
    })
    .catch(() => {
      lrc_box.classList.remove('loading')
      lrcLoading = false
      show_toast('一言加载失败', 2)
    })
}

// 为壁纸添加动态效果
let innerdiv = document.querySelector('#background_img')
let outerdiv = document.querySelector('#background')

function enableWallpaperFollow() {
  innerdiv.style.transition = 'none'
  if (!isMobile) {
    let rafId = null
    window.addEventListener('mousemove', (event) => {
      let x = event.clientX - outerdiv.offsetWidth / 2
      let y = event.clientY - outerdiv.offsetHeight / 2
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        innerdiv.style.transform = `scale(1.05) translate(${-x / 200}px,${-y / 200}px)`
        rafId = null
      })
    });
  } else {
    let currentGamma = 0;
    let currentBeta = 0;
    window.addEventListener('deviceorientation', (event) => {
      let beta = event.beta * 0.1;
      let gamma = event.gamma * 0.1;
      currentGamma += (gamma - currentGamma) * 0.1;
      currentBeta += (beta - currentBeta) * 0.1;
      innerdiv.style.transition = 'none'
      innerdiv.style.transform = `scale(1.05) translate(${currentGamma}px, ${currentBeta}px)`;
    });
  }
}

window.addEventListener('beginning-done', () => {
  setTimeout(() => {
    innerdiv.style.transition = 'transform 0.5s ease-out'
    innerdiv.style.transform = 'scale(1.05)'
    setTimeout(() => {
      enableWallpaperFollow()
    }, 500)
  }, 1000)
})

setTimeout(() => {
  change_onelrc(false)
}, 1000);


setTimeout(() => {
  show_toast(get_hello(), 3)
}, 2000);


load_beginning()
init_config()
