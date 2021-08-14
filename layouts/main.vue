<template>
  <div class="boxMain" id="global-contents">

    <DrawerMeny />

    <div id="header">
      <Header @clickedFnMenu="MenuClicked"/>
    </div>
    <Nuxt />
  </div>
</template>

<script>
import Header from './../components/presentational/molecules/Header.vue';
import DrawerMeny from './../components/presentational/molecules/DrawerMeny.vue';

export default {
    components: {
        Header,
        DrawerMeny
    },
    head() {
      return {
        title: 'Group Selector'
      }
    },
    methods: {
      MenuClicked() {
        document.querySelector('#header').classList.toggle('drawer-meny-icon-open');
        document.querySelector('#global-contents').classList.toggle('drawer-menu-open');
      }
    }
}
</script>

<style scoped>
.boxMain {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #4f7776;
}
</style>