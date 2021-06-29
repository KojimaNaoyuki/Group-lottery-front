<template>
  <div class="box">
    <div class="title-box">
      <h1 class="title">Group Lottery</h1>
    </div>
    
    <section class="card">
      <h2 class="card-title">グループID</h2>
      <Input placeholder="ID"/>
    </section>
  </div>
</template>

<script>
import Input from './../components/presentational/atoms/Input.vue';

export default {
  components: {
    Input
  }
};
</script>

<style scoped>
.box {
  position: relative;
}
.title-box {
  padding: 30px 0;
}
.title {
  text-align: center;
  font-size: 32px;
}

.card {
  width: 100vw;
  padding: 15px 0 30px 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #95afa0;
  text-align: center;
}
.card-title {
  padding: 10px 0 20px 0;
  font-size: 20px;
  letter-spacing: 2px;
}
</style>
