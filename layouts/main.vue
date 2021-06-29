<template>
  <div class="box">
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