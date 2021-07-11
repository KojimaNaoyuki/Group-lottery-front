<template>
  <div class="box">
    <div class="wrap">
      <section class="card">
        <h2 class="card-title">グループID</h2>
        <Input placeholder="ID"/>

        <div class="mtb-M"></div>

        <Btn text="決定"/>
      </section>
      <section class="new-create">
        <h3 class="new-create-title" @click="listOpen"><ListOpenIcon :text="listText" />アカウントを新規作成</h3>
        <div class="new-create-contents">
          <label class="new-create-label">
            <div class="new-create-input-box">グループ名</div>
            <Input placeholder="入力"/>
          </label>

          <label class="new-create-label">
            <div class="new-create-input-box">パスワード</div>
            <Input placeholder="入力"/>
            <div class="mtb"></div>
            <Input placeholder="再度入力"/>
          </label>
          
          <Btn text="登録"/>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Input from './../components/presentational/atoms/Input.vue';
import ListOpenIcon from './../components/presentational/atoms/ListOpenIcon.vue';
import Btn from './../components/presentational/atoms/Btn.vue';

export default {
  layout: 'main',
  components: {
    Input,
    ListOpenIcon,
    Btn
  },
  data() {
    return {
      listText: '+'
    }
  },
  methods: {
    listOpen: function() {
      if(this.listText == '+') {
        this.listText = '--';
      } else {
        this.listText = '+';
      }
      document.querySelector('.new-create').classList.toggle('new-create-open');
    }
  }
};
</script>

<style scoped>
.mtb {
  margin: 20px 0;
}
.mtb-M {
  margin: 40px 0;
}

.box {
  position: relative;
  height: 100vh;
}

.wrap {
  position: relative;
  width: 100vw;
  top: 10%;
  left: 0;
}

.card {
  padding: 20px 0 40px 0;
  background-color: #44968e;
  text-align: center;
}
.card-title {
  padding: 10px 0 20px 0;
  font-size: 20px;
  letter-spacing: 2px;
}

.new-create {
  padding: 20px;
  background-color: #74a9a7;
}
.new-create-title {
  font-size: 16px;
  font-weight: bold;
  color: #3f51b5;
  line-height: 22px;
}

.new-create-contents {
  visibility: hidden;
  height: 0;
  opacity: 0;
  transition: all 0.4s;
  text-align: center;
}
.new-create-open .new-create-contents {
  visibility: visible;
  height: 300px;
  opacity: 1;
  transition: all 0.4s;
  text-align: center;
  padding: 40px 0;
}

.new-create-label {
  display: block;
  margin: 0 0 40px 0;
}

.new-create-input-box {
  font-size: 16px;
  font-weight: bold;
}
</style>
