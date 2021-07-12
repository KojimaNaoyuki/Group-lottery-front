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
            <input type="text" placeholder="入力" class="input" v-model="groupName">
          </label>

          <label class="new-create-label">
            <div class="new-create-input-box">メールアドレス</div>
            <input type="text" placeholder="入力" class="input" v-model="email">
          </label>

          <label class="new-create-label">
            <div class="new-create-input-box">パスワード</div>
            <input type="password" placeholder="入力" class="input" v-model="password">
            <div class="mtb"></div>
            <input type="password" placeholder="入力" class="input" v-model="passwordre">
          </label>
          
          <Btn text="登録" @clickedFn="register" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
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
      listText: '+',
      email: null,
      groupName: null,
      password: null,
      passwordre: null
    }
  },
  methods: {
    listOpen: function() {
      //アコーディオンメニュー開閉
      if(this.listText == '+') {
        this.listText = '--';
      } else {
        this.listText = '+';
      }
      document.querySelector('.new-create').classList.toggle('new-create-open');
    },
    
    register: async function() {
      //アカウント新規作成
      if(!this.email || !this.password) {
        //入力されているかの判定
        alert('メールアドレスまたは、パスワードが入力されていません');
        return;
      }
      
      await firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password) //新規登録
      .then(data => {
        data.user.sendEmailVerification() //新規登録したメアド宛にメールが送られる
        console.log('新規登録完了');
      })
      .catch((error) => {
        //エラー
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/email-already-in-use':
            alert('このメールアドレスはすでに使われています。')
            break
          case 'auth/weak-password':
            alert('パスワードは6文字以上で入力してください。')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            break
        }
      });

      await firebase.auth().currentUser.updateProfile({
        displayName: this.groupName
      }).then(() => {
        console.log('displayName設定完了');
      }).catch(error => console.log(error));

      alert('アカウントを作成しました');
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
  height: 350px;
  opacity: 1;
  transition: all 0.4s;
  text-align: center;
  padding: 40px 0;
  overflow-y: scroll;
}

.new-create-label {
  display: block;
  margin: 0 0 40px 0;
}

.new-create-input-box {
  font-size: 16px;
  font-weight: bold;
}

.input {
  width: 70%;
  padding: 0 5px;
  background-color: transparent;
  border: none;
  border-bottom: solid 2px #525252;
  outline: none !important;
  transition: all 0.4s;
}
.input:hover {
  border-bottom: solid 2px #3f51b5;
}
</style>
