<template>
  <div class="box">
    <div class="wrap">
      <section class="card">
        <h2 class="card-title">グループID</h2>
        <input type="text" placeholder="ID" class="input" v-model="groupInputId">

        <div class="mtb-M"></div>

        <Btn text="決定" @clickedFn="ToLotteryList" />
      </section>
      <!-- アコーディオンメニュー -->
      <section class="new-create" id="list0">
        <h3 class="new-create-title" @click="listOpen(0)"><ListOpenIcon :text="list0Text" />アカウントを新規作成</h3>
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
      <!-- アコーディオンメニュー -->

      <!-- アコーディオンメニュー -->
      <section class="login" id="list1">
        <h3 class="login-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />主催者ログイン</h3>
        <div class="login-contents">
          <label class="login-label">
            <div class="login-input-box">グループID</div>
            <input type="text" placeholder="入力" class="input" v-model="groupInputId">
          </label>
          <label class="login-label">
            <div class="login-input-box">メールアドレス</div>
            <input type="text" placeholder="入力" class="input" v-model="loginEmail">
          </label>
          <label class="login-label">
            <div class="login-input-box">パスワード</div>
            <input type="password" placeholder="入力" class="input" v-model="loginPassword">
          </label>

          <Btn text="ログイン" @clickedFn="login" />
        </div>
      </section>
      <!-- アコーディオンメニュー -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      list0Text: '+',
      list1Text: '+',
      email: null,
      groupName: null,
      password: null,
      passwordre: null,
      groupInputId: null,
      loginEmail: null,
      loginPassword: null
    }
  },
  methods: {
    listOpen: function(num) {
      //アコーディオンメニュー開閉
      switch(num) {
        case 0:
          if(this.list0Text == '+') {
            this.list0Text = '--'
          } else {
            this.list0Text = '+'
          }
          break;
        case 1:
          if(this.list1Text == '+') {
            this.list1Text = '--'
          } else {
            this.list1Text = '+'
          }
          break;
      }
      document.querySelector('#list' + num).classList.toggle('list-open');
    },
    random: function() {
      //ランダムの4桁を生成
      let result = '';

      for(let i = 0; i < 4; i++) {
        result += String(Math.floor(Math.random() * 9) + 1);
      }
      
      return result;
    },
    
    register: async function() {
      //アカウント新規作成(firebase)
      let firebaseOk = true;

      //入力されているかの判定
      if(!this.email || !this.password) {
        alert('メールアドレスまたは、パスワードが入力されていません');
        return;
      }

      //最後に登録されているグループidを取得
      let lastedId = 0;
      await axios
      .get("http://localhost:8000/api/group")
      .then(response => {
        response.data.data.forEach(element => {
          lastedId = element.id;
        });
      })
      .catch(error => console.log('エラー: ' + error));

      //グループIDを発行
      lastedId++;
      let groupId = lastedId;
      groupId += this.random();
      Number(groupId);
      console.log('groupId: ' + groupId);
      
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
            firebaseOk = false;
            break
          case 'auth/email-already-in-use':
            alert('このメールアドレスはすでに使われています。')
            firebaseOk = false;
            break
          case 'auth/weak-password':
            alert('パスワードは6文字以上で入力してください。')
            firebaseOk = false;
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            firebaseOk = false;
            break
        }
      });

      if(!firebaseOk) {
        return
      }

      await firebase.auth().currentUser.updateProfile({
        displayName: groupId
      }).then(() => {
        console.log('displayName設定完了');
      }).catch(error => console.log(error));

      ////////////////////////////////////////////////////////////
      //DB登録

      //データベースに登録
      const sendData = {
        firebase_id: groupId,
        name: this.groupName
      }
      await axios
      .post("http://localhost:8000/api/group/", sendData)
      .then(() => {
        console.log('データベース登録完了');
      })
      .catch(error => console.log('エラー: ' + error));

      alert('アカウントを作成しました\nグループIDは ' + groupId + ' です');
    },
    login: async function() {
      if(!this.loginEmail || !this.loginPassword) {
        alert('メールアドレスまたはパスワードが入力されていません。');
        return;
      }

      firebase
      .auth()
      .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then(() => {
        this.$router.push('/ManagementPage/' + this.groupInputId);
      })
      .catch(error => console.log(error));
    },

    ToLotteryList: function() {
      this.$router.push('/LotteryList/' + this.groupInputId);
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
.list-open .new-create-contents {
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

.login {
  padding: 20px;
  background-color: #44968e;
}
.login-title {
  font-size: 16px;
  font-weight: bold;
  color: #3f51b5;
  line-height: 22px;
}

.login-contents {
  visibility: hidden;
  height: 0;
  opacity: 0;
  transition: all 0.4s;
  text-align: center;
}
.list-open .login-contents {
  visibility: visible;
  height: 350px;
  opacity: 1;
  transition: all 0.4s;
  text-align: center;
  padding: 40px 0;
  overflow-y: scroll;
}

.login-label {
  display: block;
  margin: 0 0 40px 0;
}

.login-input-box {
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
