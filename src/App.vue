<template>
  <header>
    <Navbar />

  </header>

  <main>

    <!-- Throw some ads here  -->
    <div class="row justify-content-center">
      <div class="col-7">
        <img class="img-fluid" src="https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdTaskMaster.png"
          alt="">
      </div>

    </div>
    <router-view />
    <div class="row justify-content-center">
      <div class="col-9">
        <img class="img-fluid" src="https://codeworks.blob.core.windows.net/public/assets/ads/BannerAdMusicisfun.png"
          alt="">
      </div>

    </div>




  </main>
  <footer class="bg-dark text-light">

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {

    // async function getAds() {
    //   try {
    //     await posts.getAds();
    //   }
    //   catch (error) {
    //   }
    // }
    return {
      // ads: computed(() => appState.ads),
      // appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
