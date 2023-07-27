<template>
  <div class="sign">
    <!--logo-->
    <div class="logo">
      <router-link to="/"
                         tag="li"
                         active-class="current">
        <a>
          <img src="~/assets/img/logo.png"
           alt="logo" 
           width="50%">
        </a>
      </router-link>
    </div>
    <!--from-->
    <nuxt />
  </div>
</template>