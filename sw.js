'use strict'

// 放在站点根目录：Service Worker 的默认 scope 由脚本位置决定。
// 早先放在 js/sw.js，默认 scope 只能是 /js/，但缓存清单里的 '/'、'index.html'
// 会按 scope 解析成 /js/index.html（404），cache.addAll 整体失败 → install 失败，
// 等于 PWA 从来没真正装起来过。
var CACHE_VERSION = 'v10'
var CACHE_NAME = 'xzmoon-' + CACHE_VERSION

var CACHE_LIST = [
  '/',
  '/index.html',
  '/css/global.css',
  '/css/mobile.css',
  '/js/config.js',
  '/js/toast.js',
  '/js/cursor2.js',
  '/js/beginning.js',
  '/js/myjs.js',
  '/manifest.json',
  '/img/favicon.png',
  '/img/icons/email.svg',
  '/img/icons/forum.svg',
  '/img/icons/chat_bubble.svg',
  '/img/icons/send.svg',
  '/img/icons/chevron_right.svg',
  '/img/icons/chevron_left.svg',
  '/img/icons/star.svg'
]

// 不缓存跨域资源（jsDelivr 的 MiSans、hitokoto 接口），
// 否则离线时 SW 会把失败响应当成缓存内容返回。
var BYPASS_HOSTS = ['cdn.jsdelivr.net', 'v1.hitokoto.cn', 'fonts.googleapis.com', 'fonts.gstatic.com']

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // 单个文件失败不让整次安装失败，否则一个 404 就永远装不上。
      return Promise.all(CACHE_LIST.map(function (url) {
        return cache.add(new Request(url, { cache: 'reload' })).catch(function () { })
      }))
    }).then(function () {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name !== CACHE_NAME) return caches.delete(name)
      }))
    }).then(function () {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', function (e) {
  var req = e.request
  if (req.method !== 'GET') return

  var url
  try { url = new URL(req.url) } catch (err) { return }
  if (url.origin !== self.location.origin) return
  if (BYPASS_HOSTS.indexOf(url.hostname) !== -1) return

  // 页面导航走「网络优先」：保证更新能立刻看到，离线时回落到缓存的 /index.html。
  // 静态资源走「缓存优先 + 后台更新」。
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone()
        caches.open(CACHE_NAME).then(function (c) { c.put('/', copy) })
        return res
      }).catch(function () {
        return caches.match('/index.html').then(function (r) {
          return r || caches.match('/')
        })
      })
    )
    return
  }

  e.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone()
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy) })
        }
        return res
      }).catch(function () {
        return cached
      })
      return cached || network
    })
  )
})
