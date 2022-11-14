# <center>雪中明月の主页</center>

## <center>功能</center>

- [x] 载入动画
- [x] 站点简介
- [x] Hitokoto 一言
- [x] 日期及时间
- [x] 实时天气
- [x] 时光进度条
- [x] 音乐播放器
- [x] 移动端适配

* [ ] 去除 jQuery 依赖
* [ ] VUE 重构



## <center>字体</center>
>由于本项目引入了中文字体，需要压缩中文字体以提高网页加载速度（ 也可以取消使用中文字体 ）

### 中文字体去除繁体

- 安装 `Python 3.7` 和 `pip`
- 运行 `pip install fonttools`
- 下载 [sc_unicode.txt](https://gist.githubusercontent.com/imaegoo/d64e5088b723c2e02c40985f55ff12db/raw/5ebd2ce49418c73459a9dfe050483409306a6c1d/sc_unicode.txt)
- 运行 `pyftsubset 字体名称.ttf --unicodes-file=sc_unicode.txt`

### 字体进一步压缩

- 编译安装 `Google woff2`

```bash
sudo apt-get install -y git g++ make
git clone --recursive https://github.com/google/woff2.git
cd woff2
make clean all
```

- 再压缩字体

```
./woff2_compress ./字体名称.ttf
```

- 最终可对原字体进行缓加载，**先行加载压缩后的字体**


## <center>插件</center>

* [Bootstrap](https://getbootstrap.com/)
* [iziToast](https://izitoast.marcelodolza.com/)
* [Font Awesome](https://fontawesome.com/)
* [jQuery](https://jquery.com/)
* [Aplayer](https://aplayer.js.org/)

## <center>API</center>

* [MetingAPI By 武恩赐](https://api.wuenci.com/meting/api/)
* [小歪 API](https://api.ixiaowai.cn/)
* [和风天气](https://dev.qweather.com/)
* [ROLL](https://www.mxnzp.com/doc/list)
* [Hitokoto 一言](https://hitokoto.cn/)


