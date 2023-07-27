<template>
  <div>
    <!-- Ali player style css -->
    <link rel="stylesheet"
          href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css">
    <!-- Ali player js -->
    <script charset="utf-8"
            type="text/javascript"
            src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js" ></script>
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
        vid: this.vid, 
        playauth: this.playAuth, 
        encryptType: '1', 
        width: '100%',
        height: '500px',
        cover: 'https://sv-edu-online.oss-ap-southeast-2.aliyuncs.com/banner/logo1.png', 
        qualitySort: 'asc', 
        mediaType: 'video', 
        autoplay: false, 
        isLive: false, 
        rePlay: false, 
        preload: true,
        controlBarVisibility: 'hover', 
        useH5Prism: true, 
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
      })
  },

  mounted() {
    this.player()
  },
  methods: {
    player() {
      new Aliplayer({
        id: 'J_prismPlayer',
        vid: this.vid, // video id
        playauth: this.playAuth, // play auth
        encryptType: '1', // for encrypt video, encryptType=1
        width: '100%',
        height: '800px',
        //cover: 'https://sv-edu-online.oss-ap-southeast-2.aliyuncs.com/banner/logo1.png', // cover
        qualitySort: 'asc', // quality
        mediaType: 'video', // mediaType
        autoplay: false, // autoplay
        isLive: false, // isLive
        rePlay: false, // rePlay
        preload: true,
        controlBarVisibility: 'hover', // controlBar:hover
        useH5Prism: true, // player：html5
        language: 'en-us',
      }, function (player) {
        console.log('Success to create player')
      })
    }
  }

}

</script>
