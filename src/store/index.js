import {
    defineStore
} from "pinia";

export const mainStore = defineStore("main", {
    state: () => {
        return {
            innerWidth: null, // 当前窗口宽度
            coverType: "0", // 壁纸种类
            siteStartShow: true, // 建站日期显示
            musicIsOk: false, // 音乐是否加载完成
            musicVolume: 0, // 音乐音量;
            musicOpenState: false, // 音乐面板开启状态
            backgroundShow: false, // 壁纸展示状态
            boxOpenState: false, // 盒子开启状态
            mobileOpenState: false, // 移动端开启状态
            mobileFuncState: false, // 移动端功能区开启状态
            setOpenState: false, // 设置页面开启状态
            playerState: false, // 当前播放状态
            playerTitle: null, // 当前播放歌曲名
            playerArtist: null, // 当前播放歌手名
            playerLrc: "歌词加载中", // 当前播放歌词
        }
    },
    getters: {
        // 获取歌词
        getPlayerLrc(state) {
            return state.playerLrc;
        },
        // 获取歌曲信息
        getPlayerData(state) {
            return {
                name: state.playerTitle,
                artist: state.playerArtist,
            }
        },
        // 获取页面宽度
        getInnerWidth(state) {
            return state.innerWidth;
        }
    },
    actions: {
        // 更改当前页面宽度
        setInnerWidth(value) {
            this.innerWidth = value;
            if (value >= 720) {
                this.mobileOpenState = false;
                this.mobileFuncState = false;
            }
        },
        // 更改播放状态
        setPlayerState(value) {
            if (value) {
                this.playerState = false;
            } else {
                this.playerState = true;
            }

        },
        // 更改歌词
        setPlayerLrc(value) {
            this.playerLrc = value;
        },
        // 更改歌曲数据
        setPlayerData(title, artist) {
            this.playerTitle = title;
            this.playerArtist = artist;
        }
    },
    persist: {
        key: 'data',
        storage: window.localStorage,
        paths: ['coverType', 'musicVolume', 'siteStartShow'],
    },
})