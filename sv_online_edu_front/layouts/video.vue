<template>
  <div class="guli-player">
    <div class="head">
      <router-link to="/"
        tag="li"
        active-class="current">
        <a href="#"
          title="SV EDU">
          <img class="logo"
              src="~/assets/img/logo.png"
              lt="SV EDU">
        </a>
    </router-link>
    </div>
    <div class="body">
      <div class="content">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
html,
body {
  height: 100%;
}
</style>
<style scoped>
.head {
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.head .logo {
  height: 50px;
  margin-left: 10px;
}
.body {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
</style>