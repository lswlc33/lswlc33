// 移动端的菜单展开与关闭
function expand_open() {
  var left = document.getElementById('left')
  var right = document.getElementById('right')

  left.style.display = 'none'
  right.style.display = 'flex'
}

function expand_close() {
  var left = document.getElementById('left')
  var right = document.getElementById('right')

  left.style.display = 'flex'
  right.style.display = 'none'
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
change_onelrc()

function change_onelrc() {
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
      }


    })
    .catch(console.error)
}

init_config()