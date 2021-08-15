<template>
    <div class="boxDeepPage" id="global-contents">
        <DrawerMeny />

        <div class="menu-icon" @click="MenuClicked">
          <DrawerMenyIcon />
        </div>

        <Nuxt />
    </div>
</template>

<script>
import DrawerMeny from './../components/presentational/molecules/DrawerMeny.vue';
import DrawerMenyIcon from './../components/presentational/molecules/DrawerMenyIcon.vue';

export default {
  components: {
    DrawerMeny,
    DrawerMenyIcon
  },
  methods: {
    MenuClicked() {
      document.querySelector('.menu-icon').classList.toggle('drawer-meny-icon-open');
      document.querySelector('.boxDeepPage').classList.toggle('drawer-menu-open');
    }
  }
}
</script>


<style scoped>
.boxDeepPage {
  width: 100vw;
  height: 100vh;
  background-color: #4f7776;
}
.menu-icon {
  position: absolute;
  top: 2px;
  right: 4px;
  z-index: 10;
}
</style>