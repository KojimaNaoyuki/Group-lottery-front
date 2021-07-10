<template>
  <div class="boxMain">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from './../components/presentational/molecules/Header.vue';

export default {
    components: {
        Header
    }
}
</script>

<style scoped>
.boxMain {
  width: 100vw;
  height: 100vh;
  background-color: #4f7776;
}
</style>