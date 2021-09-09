<template>
  <div class="boxMain" id="global-contents">

    <DrawerMeny />

    <div class="wrap">
      <div id="header">
        <Header @clickedFnMenu="MenuClicked"/>
      </div>
      <Nuxt />
    </div>
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


@media screen and (min-width: 1060px) {
    .boxMain {
      width: calc(100vw - 17px);
      padding: 0 0 0 201px;
    }
}
</style>