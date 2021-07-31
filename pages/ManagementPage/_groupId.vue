<template>
    <div class="box">
        <div class="group">
            <div class="back-img"><NuxtLink to="/LotteryList"><h3>&lt;</h3></NuxtLink></div>
            <h2 class="group-title">グループ管理</h2>
            <h3 class="group-name">{{groupName}}</h3>
        </div>

        <!-- アコーディオンメニュー -->
        <div class="list" id="list0">
            <h2 class="list-title" @click="listOpen(0)"><ListOpenIcon :text="list0Text" />投票を作成</h2>
            <div class="list-contents-big">
                <label class="list-label">
                    <div class="list-input-box">抽選名</div>
                    <input type="text" placeholder="入力" class="input" v-model="LotteryName">
                </label>
                <label class="list-label">
                    <div class="list-input-box">抽選登録〆切日</div>
                    <div class="list-day">
                        <input type="date" class="input" v-model="LotteryDay">
                    </div>
                </label>
                <Btn text="作成" @clickedFn="createLottery"/>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list1">
            <h2 class="list-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />投票を管理</h2>
            <div class="list-contents-big">
                <label class="list-label">
                    <div class="list-input-box">管理対象抽選</div>
                    <form name="formSelect">
                        <select name="lotterySelect" id="" class="input">
                            <option :value="item.id" v-for="item in lotteryTitleArr" :key="item.id">{{item.lottery_title}}</option>
                        </select>
                    </form>
                </label>
                <label class="list-label">
                    <div class="list-input-box">抽選受付状態</div>
                    <div class="btnBox"><button id="LotteryStatusBtnTrue" class="list-input-Btn" @click="LotteryStatus(true)">受け付ける</button><button id="LotteryStatusBtnFalse" class="list-input-Btn" @click="LotteryStatus(false)">受け付けない</button></div>
                </label>
                <label class="list-label">
                    <div class="list-input-box">抽選をする</div>
                    <Btn text="実行"/>
                </label>
                <label class="list-label">
                    <div class="list-input-box">投票を削除</div>
                    <Btn text="削除" @clickedFn="deleteLottery" />
                </label>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list2">
            <h2 class="list-title" @click="listOpen(2)"><ListOpenIcon :text="list2Text" />アカウント管理</h2>
            <div class="list-contents-big">
                <label class="list-label">
                    <Btn text="ログアウト" @clickedFn="logout" />
                </label>
                <label class="list-label">
                    <div class="list-input-box">アカウントを削除</div>
                    <Btn text="削除" />
                </label>
            </div>
        </div>
        <!-- アコーディオンメニュー -->
    </div>
</template>

<script>
import axios from "axios";
import firebase from '~/plugins/firebase';
import ListOpenIcon from './../../components/presentational/atoms/ListOpenIcon.vue';
import Btn from './../../components/presentational/atoms/Btn.vue';

export default {
    layout: 'deepPageLayout',
    components: {
        ListOpenIcon,
        Btn
    },
    data() {
        return {
            list0Text: '+',
            list1Text: '+',
            list2Text: '+',
            dbGroupId: null,
            groupName: null,
            firebase_id: null,
            LotteryName: null,
            LotteryDay: null,
            lotteryTitleArr: []
        }
    },
    mounted: async function() {
        //ログイン判定
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                //ログインされていない
                alert("ログインされていません");
                this.$router.push('/');
            } else {
                console.log('正常にログインされています');
            }
        });

        //グループIDを切り出す、DB検索用に
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        this.dbGroupId = groupId.slice(0, groupIdLength);

        //グループ情報を取得
        await axios
        .get("http://localhost:8000/api/group/" + this.dbGroupId)
        .then(response => {
            this.firebase_id = response.data.data[0].firebase_id; //firebase_idを取得
            this.groupName = response.data.data[0].name; //groupNameを取得
        })
        .catch(error => console.log('エラー: ' + error));

        //ルーム情報を取得
        await axios
        .get("http://localhost:8000/api/roomCustom?group_id=" + this.dbGroupId)
        .then(response => {
            console.log(response.data.data);
            this.lotteryTitleArr = response.data.data;
        })
        .catch(error => console.log(error));
    },
    methods: {
        listOpen: function(num) {
            //アコーディオンメニュー開閉
            console.log('open: ' + num);
            document.querySelector('#list' + num).classList.toggle('list-open');
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
                case 2:
                    if(this.list2Text == '+') {
                        this.list2Text = '--'
                    } else {
                        this.list2Text = '+'
                    }
                    break;
            }
        },
        LotteryStatus: async function(status) {
            //抽選受付状態
            let sendData = {}

            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            if(status) {
                //投票受付
                console.log('投票を受付ます');
                document.querySelector('#LotteryStatusBtnTrue').classList.add('list-input-Btn-clicked');
                document.querySelector('#LotteryStatusBtnFalse').classList.remove('list-input-Btn-clicked');

                sendData = {
                    public_private_info: true
                }
            } else {
                //投票受付を禁止
                console.log('投票を受け付けません');
                document.querySelector('#LotteryStatusBtnFalse').classList.add('list-input-Btn-clicked');
                document.querySelector('#LotteryStatusBtnTrue').classList.remove('list-input-Btn-clicked');

                sendData = {
                    public_private_info: false
                }
            }

            //DBアップデート
            await axios
            .put("http://localhost:8000/api/room/" + LotteryId, sendData)
            .then(() => console.log('更新が完了しました'))
            .catch(error => console.log(error));

            alert("更新しました");
        },
        createLottery: async function() {
            //抽選を作成
            const sendData = {
                lottery_title: this.LotteryName,
                public_private_info: true,
                lottery_day: this.LotteryDay,
                group_id: this.dbGroupId
            }
            await axios
            .post("http://localhost:8000/api/room/", sendData)
            .then(() => console.log("データベース登録完了"))
            .catch(error => console.log(error));

            alert('投票を作成しました');
        },
        deleteLottery: async function() {
            //抽選を削除
            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            await axios
            .delete("http://localhost:8000/api/room/" + LotteryId)
            .then(() => console.log("削除完了"))
            .catch(error => console.log(error));

            alert('削除しました');
        },
        logout: function() {
            //ログアウト
            firebase.auth().signOut().then(() => {
                alert('ログアウトが完了しました');
                this.$router.replace('/');
            });
        }
    }
}
</script>


<style scoped>
a {
    text-decoration: none;
    color: #3f51b5;
}
.back-img {
    position: absolute;
    top: 0px;
    left: 15px;
    color: #3f51b5;
    font-size: 28px;
}

.group {
    position: relative;
    background-color: #69b5a3;
}
.group-title {
    padding: 40px 0;
    text-align: center;
    font-size: 22px;
}
.group-name {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 14px;
    font-weight: normal;
    color: #3f51b5;
}

.list {
    padding: 20px;
    background-color: #44968e;
}
.list:nth-child(odd) {
    background-color: #74a9a7;
}
.list-title {
    font-size: 16px;
    font-weight: bold;
    color: #3f51b5;
    line-height: 22px;
}

.list-input-box {
    display: block;
    margin-bottom: 30px;
}

.list-contents {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transition: all 0.4s;
    text-align: center;
}
.list-contents-big {
    visibility: hidden;
    height: 0;
    opacity: 0;
    transition: all 0.4s;
    text-align: center;
    overflow-y: scroll;
}
.list-open .list-contents {
    visibility: visible;
    height: 150px;
    opacity: 1;
    transition: all 0.4s;
    text-align: center;
    padding: 40px 0;
}
.list-open .list-contents-big {
    visibility: visible;
    height: 400px;
    opacity: 1;
    transition: all 0.4s;
    text-align: center;
    padding: 40px 0;
}

.list-label {
  display: block;
  margin: 0 0 40px 0;
}

.list-input-box {
  font-size: 16px;
  font-weight: bold;
}

.list-input-Btn {
    margin: 0 15px;
    padding: 3px 15px;
    background-color: transparent;
    border: solid 2px #3f51b5;
    border-radius: 5px;
    font-size: 15px;
    font-weight: normal;
}
.list-input-Btn-clicked {
    background-color: #3f51b5;
    color: #fff;
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