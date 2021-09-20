<template>
  <div class="box" id="indexContent">
    <div class="wrap">
      <section class="card">
        <div class="content-width">

          <div class="mv">
            <img src="~/assets/img/mv.jpg" alt="mv" class="mv-img">
          </div>

          <div class="card-inner">
            <div class="card-inner-text">
              <p>Group Selectorは団体の人数調整に最適です</p>
              <p>一人、複数人、どちらの場合でも抽選可能！</p>
            </div>

            <div class="mtb-M"></div>

            <div class="card-inner-content">
              <validation-observer ref="obs" v-slot="ObserverProps">
                <validation-provider v-slot="ProviderProps" rules="min:5">
                  <h2 class="card-title">グループに参加</h2>
                  <input type="text" placeholder="グループID" class="card-input" v-model="groupInputId" name="ID">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </validation-provider>

                <div class="mtb-M"></div>

                <Btn text="参加" @clickedFn="ToLotteryList" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
              </validation-observer>
            </div>

          </div>

        </div>
      </section>
      <!-- アコーディオンメニュー -->
      <section class="new-create" id="list0">
        <h3 class="new-create-title" @click="listOpen(0)"><ListOpenIcon :text="list0Text" />アカウントを新規作成</h3>
        <div class="new-create-contents">
          <div class="content-width">
            <validation-observer ref="obs" v-slot="ObserverProps">
              <validation-provider v-slot="ProviderProps" rules="required">
                <label class="new-create-label">
                  <div class="new-create-input-box">グループ名</div>
                  <input type="text" placeholder="入力" class="input" v-model="groupName" name="グループ名">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </label>
              </validation-provider>

              <validation-provider v-slot="ProviderProps" rules="email">
                <label class="new-create-label">
                  <div class="new-create-input-box">メールアドレス</div>
                  <input type="text" placeholder="入力" class="input" v-model="email" name="アドレス">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </label>
              </validation-provider>

              <label class="new-create-label">
                  <div class="new-create-input-box">パスワード</div>

                <validation-provider v-slot="ProviderProps" rules="min:8">
                  <input type="password" placeholder="入力" class="input" v-model="password" name="パスワード">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </validation-provider>
              </label>

              <label class="new-create-label-permission">
                <input type="checkbox" name="permission" id="permission">
                注意事項・免責事項に同意する
              </label>
              <div @click="permissionOpen" class="permission-title">注意事項・免責事項</div>

              <label class="new-create-label">
                  <div class="new-create-input-box">利用許可コード</div>

                  <input type="text" placeholder="入力" class="input" v-model="permissionPs" name="利用許可コード">
              </label>
              
              <Btn text="登録" @clickedFn="register" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
            </validation-observer>
          </div>

          <DownArrow />
        </div>
      </section>
      <!-- アコーディオンメニュー -->

      <!-- アコーディオンメニュー -->
      <section class="login" id="list1">
        <h3 class="login-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />主催者ログイン</h3>
        <div class="login-contents">
          <div class="content-width">
            <validation-observer ref="obs" v-slot="ObserverProps">
              <validation-provider v-slot="ProviderProps" rules="min:5">
                <label class="login-label">
                  <div class="login-input-box">グループID</div>
                  <input type="text" placeholder="入力" class="input" v-model="groupInputId" name="ID">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </label>
              </validation-provider>

              <validation-provider v-slot="ProviderProps" rules="email">
                <label class="login-label">
                  <div class="login-input-box">メールアドレス</div>
                  <input type="text" placeholder="入力" class="input" v-model="loginEmail" name="アドレス">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </label>
              </validation-provider>

              <validation-provider v-slot="ProviderProps" rules="min:8">
                <label class="login-label">
                  <div class="login-input-box">パスワード</div>
                  <input type="password" placeholder="入力" class="input" v-model="loginPassword" name="パスワード">
                  <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                </label>
              </validation-provider>

              <Btn text="ログイン" @clickedFn="login" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
            </validation-observer>
          </div>
        </div>
      </section>
      <!-- アコーディオンメニュー -->
    </div>

    <div class="rod-back"></div>
    <div class="rod-animation">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="ms-back"></div>
    <div class="start-ms">
      <h2>注意事項・免責事項</h2>
      <p>本サービスは、自主利用及び自主学習のため開発されました。そのため、広く一般に公開されているサービスではありません。</p>
      <p>グループ名、抽選名、抽選に登録する名前は公開されます。個人情報は記載しないでください。</p>
      <p>主催者ログインに必要なメールアドレスは存在しない架空のメールアドレスをご利用頂けます。</p>
      <p>本サービスは正式に公開しているサービスではないため、セキュリティが不十分な可能性がございます。従って、架空のメールアドレスを使用してください。</p>
      <p>例) ×××@〇〇〇.com</p>
      <p>ご利用は自己責任でお願いします。</p>
      <p>一般に公開されているサービスではないため、利用許可コードをお持ちの方のみのご利用をお願い申し上げます。</p>
      <button class="start-ms-btn" @click="permissionClose">閉じる</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from '~/plugins/firebase';
import Input from './../components/presentational/atoms/Input.vue';
import ListOpenIcon from './../components/presentational/atoms/ListOpenIcon.vue';
import Btn from './../components/presentational/atoms/Btn.vue';
import DownArrow from './../components/presentational/atoms/DownArrow.vue';

export default {
  layout: 'main',
  components: {
    Input,
    ListOpenIcon,
    Btn,
    DownArrow
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
      loginPassword: null,
      permissionPs: null
    }
  },
  mounted: function() {
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
      //アカウント新規作成
      
      //注意事項・免責事項同意確認
      if(!document.querySelector('#permission').checked) {
        alert('注意事項・免責事項に同意されていません');
        return;
      }

      //利用許可コード確認
      if(this.permissionPs != '24373') {
        alert('利用許可コードが間違っています');
        return;
      }

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      let firebaseOk = true;
      let groupRef = firebase.firestore().collection("groups");
      let roomRef = firebase.firestore().collection("rooms");
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      //入力されているかの判定
      if(!this.email || !this.password) {
        alert('メールアドレスまたは、パスワードが入力されていません');
        return;
      }

      this.loaderDisplay(true); //ローダを開始

      //最後に登録されているグループidを取得
      let lastedId = 0;
      //-------------------------------------------------// original API  //-------------------------------------------------//
      // await axios
      // .get("https://www.kwebk.xyz/api/group")
      // .then(response => {
      //   response.data.data.forEach(element => {
      //     lastedId = element.id;
      //   });
      // })
      // .catch(error => console.log('エラー: ' + error));
      //-------------------------------------------------// original API  //-------------------------------------------------//

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      await groupRef.orderBy("id", "desc").limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          lastedId = doc.data().id;
        });
      });
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      //グループIDを発行
      lastedId++;
      let groupId = lastedId;
      groupId += this.random();
      Number(groupId);
      console.log('groupId: ' + groupId);
      
      //-------------------------------------------------//  firebase  //-------------------------------------------------//
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
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      if(!firebaseOk) {
        this.loaderDisplay(false); //ローダを終了
        return
      }

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      await firebase.auth().currentUser.updateProfile({
        displayName: groupId
      }).then(() => {
        console.log('displayName設定完了');
      }).catch(error => console.log(error));
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      ////////////////////////////////////////////////////////////
      //DB登録

      //データベースに登録
      //-------------------------------------------------// original API  //-------------------------------------------------//
      // const sendData = {
      //   firebase_id: groupId,
      //   name: this.groupName
      // }
      // console.log(sendData);
      // await axios
      // .post("https://www.kwebk.xyz/api/group/", sendData)
      // .then(() => {
      //   console.log('データベース登録完了');
      // })
      // .catch(error => console.log('エラー: ' + error));
      //-------------------------------------------------// original API  //-------------------------------------------------//

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      await groupRef.add({
        id: lastedId,
        firebase_id: groupId,
        name: this.groupName
      })
      .then(() => console.log('firebase ok'))
      .catch(error => console.log(error));
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      let roomId = 1;
      await roomRef.orderBy("id", "desc").limit(1).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          roomId = doc.data().id + 1;
        });
      }).catch(error => console.log(error));
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      await roomRef.doc(String(roomId)).set({
        group_id: Number(roomId),
        id: Number(roomId),
        lottery_day: '0000-00-00',
        lottery_title: 'デモ抽選',
        public_private_info: false
      }).catch(error => console.log(error));
      //-------------------------------------------------//  firebase  //-------------------------------------------------//

      this.loaderDisplay(false); //ローダを終了

      alert('アカウントを作成しました\nグループIDは ' + groupId + ' です\n必ず忘れないようにしてください');

      location.reload(); //リロード
    },
    login: async function() {
      //ログイン
      if(!this.loginEmail || !this.loginPassword) {
        alert('メールアドレスまたはパスワードが入力されていません。');
        return;
      }

      //-------------------------------------------------//  firebase  //-------------------------------------------------//
      firebase
      .auth()
      .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
      .then(() => {
        this.$router.push('/ManagementPage/' + this.groupInputId);
      })
      .catch(error => console.log(error));
      //-------------------------------------------------//  firebase  //-------------------------------------------------//
    },

    ToLotteryList: function() {
      this.$router.push('/LotteryList/' + this.groupInputId);
    },

    loaderDisplay: function(state) {
      //ローダーの表示
      const tg = document.querySelector('#global-contents');

      if(state) {
        tg.classList.add('rod-on');  
      } else {
        tg.classList.remove('rod-on');
      }
    },

    permissionOpen: function() {
      //注意事項open
      document.querySelector('#global-contents').classList.add('start-ms-open');
    },
    permissionClose: function() {
      //注意事項close
      document.querySelector('#global-contents').classList.remove('start-ms-open');
    }
  }
};
</script>

<style scoped>
.content-width {
  margin: 0 auto;
  max-width: 640px;
}
.mtb {
  margin: 20px 0;
}
.mtb-M {
  margin: 40px 0;
}

.box {
  height: 100vh;
}

.wrap {
  position: relative;
  top: 0;
  left: 0;
}

.card {
  position: relative;
  padding: 20px 0 40px 0;
  text-align: center;
  height: 450px;
}
.card-inner {
  z-index: 10;
  opacity: 1;
}
.card-inner-text {
  padding: 50px 10px 25px;
}
.card-inner-text > p {
  font-size: 16px;
  letter-spacing: 0.2px;
  font-weight: bold;
  line-height: 28px;
  color: #dedede;
}
.card-title {
  padding: 10px 0 20px 0;
  font-size: 20px;
  letter-spacing: 2px;
  color: #dedede;
  z-index: 10;
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
.new-create-title:hover {
  cursor: pointer;
}

.new-create-contents {
  position: relative;
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
  -ms-overflow-style: none;    /* IE, Edge 対応 */
  scrollbar-width: none;       /* Firefox 対応 */
}
.list-open .new-create-contents::-webkit-scrollbar {  /* Chrome, Safari 対応 */
  display:none;
}

.new-create-label {
  display: block;
  margin: 0 0 40px 0;
}
.new-create-label-permission {
  display: block;
  margin: 0 0 0 0;
  font-size: 15px;
}
.permission-title {
  margin-bottom: 40px;
  font-size: 14px;
  color: #3f51b5;
  text-decoration: underline;
  cursor: pointer;
}
.permission-title:hover {
  opacity: 0.8;
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
.login-title:hover {
  cursor: pointer;
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
  -ms-overflow-style: none;    /* IE, Edge 対応 */
  scrollbar-width: none;       /* Firefox 対応 */
}
.list-open .login-contents::-webkit-scrollbar {  /* Chrome, Safari 対応 */
  display:none;
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
  width: 240px;
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

.card-input {
  width: 260px;
  padding: 0 5px;
  background-color: #FFF;
  border: none;
  border-bottom: solid 2px #dedede;
  outline: none !important;
  transition: all 0.4s;
}
.card-input:hover {
  border-bottom: solid 2px #3f51b5;
}

.error-ms {
  padding: 5px 10px 0;
  text-align: right;
  font-size: 14px;
  color: #a73f1e;
}

.ms-back {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  z-index: 100;
}
.start-ms-open .ms-back {
  display: block;
}
.start-ms {
  display: none;
  padding: 8px 5px 40px;
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 100;
}
.start-ms-open .start-ms {
  display: block;
}
.start-ms > h2 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #e22424;
}
.start-ms > p {
  font-size: 13px;
  margin-bottom: 5px;
}
.start-ms-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 3px 15px;
  border: none;
  font-size: 13px;
  background-color: #2382ce;
  color: #FFF;
}
.start-ms-btn:hover {
  cursor: pointer;
  opacity: 0.6;
}

.start-ms-label {
  font-size: 13px;
  font-weight: bold;
}

.start-ms-input {
  margin-left: 6px;
  font-size: 12px;
  border: 1px solid rgb(163, 163, 163);
  background-color: transparent;
  outline: none;
}

.mv {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: -10;
}
.mv-img {
  width: 100vw;
  height: 450px;
  object-fit: cover;
}


@media screen and (min-width: 1060px) {
    .wrap {
      /* width: calc(100vw - 201px); */
    }
    .card-inner-text > p {
      font-size: 22px;
      line-height: 42px;
    }
}
</style>
