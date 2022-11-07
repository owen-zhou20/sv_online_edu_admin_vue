<template>
  <div>
    <!-- Ali player style css -->
    <link rel="stylesheet"
          href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css">
    <!-- Ali player js -->
    <script charset="utf-8"
            type="text/javascript"
            src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" />
    <!-- player dom -->
    <div id="J_prismPlayer"
         class="prism-player" />
  </div>
</template>
<script>
import vod from '@/api/vod'

export default {
  /*layout: 'video',
  data() {
    return {
      playAuth: '',//response.data.data.playAuth,
      vid: '' //this.$route.params.id
    }
  },
  created() {
    this.vid = this.$route.params.id
  },
  mounted() {

    this.getplayer(vid)
  },
  methods: {
    getplayer(vid) {
      vod.getPlayAuth(vid)
        .then(response => {
          this.playAuth = response.data.data.playAuth
          this.player()
        })
    },
    player() {
      new Aliplayer({
        id: 'J_prismPlayer',
        vid: this.vid, // 视频id
        playauth: this.playAuth, // 播放凭证
        encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: '100%',
        height: '500px',
        cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面
        qualitySort: 'asc', // 清晰度排序
        mediaType: 'video', // 返回音频还是视频
        autoplay: false, // 自动播放
        isLive: false, // 直播
        rePlay: false, // 循环播放
        preload: true,
        controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
        useH5Prism: true, // 播放器类型：html5
      }, function (player) {
        console.log('Success to create player')
      })
    }
  }
};*/


  layout: 'video',
  //video layout
  asyncData({ params, error }) {
    return vod.getPlayAuth(params.vid)
      .then(response => {
        return {
          playAuth: response.data.data.playAuth,
          vid: params.vid
        }
        this.player()
      }

      )
  },

  mounted() {
    this.player()
  },
  methods: {
    player() {
      new Aliplayer({
        id: 'J_prismPlayer',
        vid: this.vid, // 视频id
        playauth: this.playAuth, // 播放凭证
        encryptType: '1', // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
        width: '100%',
        height: '500px',
        /*cover: 'http://guli.shop/photo/banner/1525939573202.jpg', // 封面*/
        qualitySort: 'asc', // 清晰度排序
        mediaType: 'video', // 返回音频还是视频
        autoplay: false, // 自动播放
        isLive: false, // 直播
        rePlay: false, // 循环播放
        preload: true,
        controlBarVisibility: 'hover', // 控制条的显示方式：鼠标悬停
        useH5Prism: true, // 播放器类型：html5
        language: 'en-us',
      }, function (player) {
        console.log('Success to create player')
      })
    }
  }

}

</script>
