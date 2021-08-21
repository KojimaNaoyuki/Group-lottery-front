<template>
    <div class="box">
        <div class="group">
            <div class="back-img"><NuxtLink to="/"><h3>&lt;</h3></NuxtLink></div>
            <h2 class="group-title">グループ管理</h2>
            <h3 class="group-name">{{groupName}}</h3>
        </div>

        <!-- アコーディオンメニュー -->
        <div class="list" id="list0">
            <h2 class="list-title" @click="listOpen(0)"><ListOpenIcon :text="list0Text" />投票を作成</h2>
            <div class="list-contents-big">
                <div class="content-width">
                    <validation-observer ref="obs" v-slot="ObserverProps">
                        <validation-provider v-slot="ProviderProps" rules="required">
                            <label class="list-label">
                                <div class="list-input-box">抽選名</div>
                                <input type="text" placeholder="入力" class="input" v-model="LotteryName" name="抽選名">
                                <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                            </label>
                        </validation-provider>

                        <validation-provider v-slot="ProviderProps" rules="required">
                            <label class="list-label">
                                <div class="list-input-box">抽選登録〆切日</div>
                                <div class="list-day">
                                    <input type="date" class="input" v-model="LotteryDay" name="〆切日">
                                </div>
                                <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                            </label>
                        </validation-provider>

                        <Btn text="作成" @clickedFn="createLottery" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
                    </validation-observer>
                </div>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list1">
            <h2 class="list-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />投票を管理</h2>
            <div class="list-contents-big">
                <div class="content-width">
                    <label class="list-label">
                        <div class="list-input-box">管理対象抽選</div>
                        <form name="formSelect">
                            <select name="lotterySelect" id="" class="input">
                                <option :value="item.id" v-for="item in lotteryTitleArr" :key="item.id">{{item.lottery_title}}</option>
                            </select>
                        </form>
                    </label>

                    <div class="link-copy-box">
                        <h4 class="link-copy-box-title">抽選リンク</h4>
                        <input type="text" value="http://localhost:3000/ManagementPage/13416" readonly class="link-copy-box-text" id="copyTg">
                        <img src="~/assets/img/copy.png" alt="copy" class="link-copy-box-img" @click="linkCopy">
                    </div>

                    <label class="list-label">
                        <div class="list-input-box">抽選受付状態</div>
                        <div class="btnBox"><button id="LotteryStatusBtnTrue" class="list-input-Btn" @click="LotteryStatus(true)">受け付ける</button><button id="LotteryStatusBtnFalse" class="list-input-Btn" @click="LotteryStatus(false)">受け付けない</button></div>
                    </label>

                    <label class="list-label">
                        <Btn text="抽選する" @clickedFn="lottery" />
                    </label>
                    <div class="list-lottery">
                        <div class="list-input-box">抽選結果</div>
                        <div class="list-lottery-header">
                            <h3 class="list-lottery-header-text">順位</h3>
                            <h3 class="list-lottery-header-text">代表(人数)</h3>
                            <h3 class="list-lottery-header-text">学年</h3>
                            <h3 class="list-lottery-header-text">状態</h3>
                        </div>
                        <div class="list-lottery-leader" v-for="item in lotteryMemberArr" :key="item.order">
                            <input type="checkbox" class="list-lottery-leader-check" :id="'lotteryCheckbox' + item.order" v-if="!item.del_flag">
                            <h4 class="list-lottery-leader-text" v-if="!item.del_flag">{{item.order}}</h4>
                            <h4 class="list-lottery-leader-text" v-if="!item.del_flag">{{item.name}}({{item.member_num}})</h4>
                            <h4 class="list-lottery-leader-text" v-if="!item.del_flag">{{item.schoolYear | otherYear}}</h4>
                            <h4 class="list-lottery-leader-text" v-if="item.status == 'join' && !item.del_flag">参加</h4>
                            <h4 class="list-lottery-leader-text" v-if="item.status == 'hold' && !item.del_flag">保留</h4>
                        </div>
                        <div class="mtb"></div>
                        <Btn text="当選者確定" @clickedFn="winning" />
                    </div>

                    <label class="list-label">
                        <div class="list-input-box">抽選登録メンバーを削除する</div>
                        <Btn text="メンバーを表示" @clickedFn="delMemberDisplay" />
                    </label>
                    <div class="list-del-member">
                        <div class="list-input-box">登録メンバー</div>
                        <div class="list-lottery-header">
                            <h3 class="list-lottery-header-text">名前</h3>
                            <h3 class="list-lottery-header-text">学年</h3>
                            <h3 class="list-lottery-header-text">状態</h3>
                        </div>
                        <div class="list-lottery-leader" v-for="item in delMemberArr" :key="item.id">
                            <input type="checkbox" class="list-lottery-leader-check" :id="'delCheckbox' + item.id" v-if="!item.del_flag">
                            <h4 class="list-lottery-leader-text" v-if="!item.del_flag">{{item.member_name}}</h4>
                            <h4 class="list-lottery-leader-text" v-if="!item.del_flag">{{item.school_year | otherYear}}</h4>
                            <h4 class="list-lottery-leader-text" v-if="item.status == 'join' && !item.del_flag">参加</h4>
                            <h4 class="list-lottery-leader-text" v-if="item.status == 'hold' && !item.del_flag">保留</h4>
                            <div class="list-lottery-leader-text" v-if="item.del_flag">削除済み</div>
                        </div>
                        <div class="mtb"></div>
                        <Btn text="削除" @clickedFn="delMember" />
                    </div>

                    <label class="list-label">
                        <div class="list-input-box">投票を削除</div>
                        <Btn text="削除" @clickedFn="deleteLottery" />
                    </label>
                </div>

                <DownArrow />
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
                    <Btn text="削除" @clickedFn="accountDel" />
                </label>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

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
    </div>
</template>

<script>
import axios from "axios";
import firebase from '~/plugins/firebase';
import ListOpenIcon from './../../components/presentational/atoms/ListOpenIcon.vue';
import Btn from './../../components/presentational/atoms/Btn.vue';
import DownArrow from './../../components/presentational/atoms/DownArrow.vue';

export default {
    layout: 'deepPageLayout',
    components: {
        ListOpenIcon,
        Btn,
        DownArrow
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
            lotteryTitleArr: [],
            lotteryMemberArr: [],
            renderVal: true,
            delMemberArr: []
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

        this.loaderDisplay(true); //ローダー開始

        //グループIDを切り出す、DB検索用に
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        this.dbGroupId = groupId.slice(0, groupIdLength);

        //グループ情報を取得
        await axios
        .get("https://www.kwebk.xyz/api/group/" + this.dbGroupId)
        .then(response => {
            this.firebase_id = response.data.data[0].firebase_id; //firebase_idを取得
            this.groupName = response.data.data[0].name; //groupNameを取得
        })
        .catch(error => console.log('エラー: ' + error));

        //ルーム情報を取得
        await axios
        .get("https://www.kwebk.xyz/api/roomCustom?group_id=" + this.dbGroupId)
        .then(response => {
            this.lotteryTitleArr = response.data.data;
        })
        .catch(error => console.log(error));

        this.linkSet();

        this.loaderDisplay(false); //ローダー終了
    },
    filters: {
        otherYear: function(value) {
            if(value == 0) {
                return '他'
            } else {
                return value;
            }
        }
    },
    computed: {
        judgStatus: function(status) {
            if(status == 'join') {
                return true;
            } else {
                return false;
            }
        }
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

            this.loaderDisplay(true); //ローダー開始

            //DBアップデート
            await axios
            .put("http://160.251.14.192/api/room/" + LotteryId, sendData)
            .then(() => console.log('更新が完了しました'))
            .catch(error => console.log(error));

            this.loaderDisplay(false); //ローダー終了

            alert("更新しました");
        },
        createLottery: async function() {
            //抽選を作成
            this.loaderDisplay(true); //ローダー開始

            const sendData = {
                lottery_title: this.LotteryName,
                public_private_info: true,
                lottery_day: this.LotteryDay,
                group_id: this.dbGroupId
            }
            await axios
            .post("http://160.251.14.192/api/room/", sendData)
            .then(() => console.log("データベース登録完了"))
            .catch(error => console.log(error));

            this.loaderDisplay(false); //ローダー終了

            alert('投票を作成しました');
        },
        lottery: async function() {
            //抽選

            this.loaderDisplay(true); //ローダー開始

            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            //抽選済みかどうかチェック
            let alreadyLotteryFlag = false;
            await axios
            .get("https://www.kwebk.xyz/api/LotteryResultValidationAlready/?group_id=" + this.dbGroupId + "&room_id=" + LotteryId)
            .then(response => {
                if(!response.data.data) {
                    alreadyLotteryFlag = true;
                }
            })
            .catch(error => console.log(error));
            if(alreadyLotteryFlag) {
                this.loaderDisplay(false); //ローダー終了
                alert('すでに抽選が行われています');
                return;
            }

            //メンバー情報を取得
            let lotteryMembers = [];
            let lotteryMemberAll = [];
            let memberNum = [];
            await axios
            .get("https://www.kwebk.xyz/api/roomMemberGetmemmber/?group_id=" + this.dbGroupId + "&room_id=" + LotteryId)
            .then(response => {
                //メンバー全体を取得
                lotteryMemberAll = response.data.data;

                //代表者ごとメンバー人数取得
                memberNum = response.data.memberNum;

                //代表者だけを抽出
                response.data.data.forEach(element => {
                    if(element.id == element.group_judg && !element.del_flag) {
                        lotteryMembers.push(element.member_name);
                    }
                });
            })
            .catch(error => console.log(error));

            //シャッフル
            for(let i = (lotteryMembers.length-1); 0 < i; i--) {
                let r = Math.floor(Math.random() * (i+1));

                let tmp = lotteryMembers[i];
                lotteryMembers[i] = lotteryMembers[r];
                lotteryMembers[r] = tmp;
            }

            //オブジェクトへ変換
            lotteryMembers.forEach((element, index) => {
                let schoolYear;
                let status;
                lotteryMemberAll.forEach(Element => {
                    if(Element.member_name == element) {
                        schoolYear = Element.school_year;
                        status = Element.status;
                    }
                });
                this.lotteryMemberArr[index] = {
                    order: index + 1,
                    name: element,
                    schoolYear: schoolYear,
                    status: status,
                    member_num: memberNum[element].member_num
                }
            });

            console.log(this.lotteryMemberArr);

            //描画
            this.listOpen(1);
            this.listOpen(1);
            document.querySelector('.list-lottery').classList.add('list-lottery-open');

            this.loaderDisplay(false); //ローダー終了

            alert("抽選が完了しました");
        },
        winning: async function() {
            //当選者DB保存

            this.loaderDisplay(true); //ローダー開始

            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            for(let i = 0; i < this.lotteryMemberArr.length; i++) {
                if(document.querySelector('#lotteryCheckbox' + (i+1)).checked) {
                    const sendData = {
                        leader_name: this.lotteryMemberArr[i].name,
                        order: this.lotteryMemberArr[i].order,
                        group_id: this.dbGroupId,
                        room_id: LotteryId
                    }
                    await axios
                    .post("https://www.kwebk.xyz/api/lotteryResult/", sendData)
                    .then(() => console.log("データベース登録完了"))
                    .catch(error => console.log(error));
                }
            }

            //抽選非公開へ
            const sendData = {
                public_private_info: false
            }
            await axios
            .put("https://www.kwebk.xyz/api/room/" + LotteryId, sendData)
            .then(() => console.log('更新が完了しました'))
            .catch(error => console.log(error));

            this.loaderDisplay(false); //ローダー終了

            alert('当選者を確定しました');
        },
        delMemberDisplay: async function() {
            //抽選登録者削除処理 メンバー取得

            this.loaderDisplay(true); //ローダー開始

            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            await axios
            .get("https://www.kwebk.xyz/api/roomMemberGetmemmber/?group_id=" + this.dbGroupId + "&room_id=" + LotteryId)
            .then(response => {
                this.delMemberArr = response.data.data;
                console.log(this.delMemberArr);
            })
            .catch(error => console.log(error));

            //描画
            this.listOpen(1);
            this.listOpen(1);
            document.querySelector('.list-del-member').classList.add('list-open');

            this.loaderDisplay(false); //ローダー終了
        },
        delMember: async function() {
            //メンバーの削除処理 DB

            this.loaderDisplay(true); //ローダー開始

            //↓未完成(バックエンド側に問題あり idが届いてなくて更新できず)
            let sendData;
            for(let i = 0; i < this.delMemberArr.length; i++) {
                if(document.querySelector('#delCheckbox' + (this.delMemberArr[i].id)).checked) {
                    sendData = {
                        id: this.delMemberArr[i].id,
                        del_flag: true
                    }
                    await axios
                    .put("https://www.kwebk.xyz/api/roomMember/" + this.delMemberArr[i].id, sendData)
                    .then(() => console.log('更新が完了しました'))
                    .catch(error => console.log(error));
                }
            }

            this.loaderDisplay(false); //ローダー終了

            alert('削除しました');
        },
        deleteLottery: async function() {
            //抽選を削除
            let confirmResult = confirm('抽選を削除しますか？\n削除すると復元できません');
            if(!confirmResult) {
                return;
            }

            this.loaderDisplay(true); //ローダー開始

            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            await axios
            .delete("https://www.kwebk.xyz/api/room/" + LotteryId)
            .then(() => console.log("削除完了"))
            .catch(error => console.log(error));

            this.loaderDisplay(false); //ローダー終了

            alert('削除しました');
        },
        logout: function() {
            //ログアウト
            let confirmResult = confirm('ログアウトしますか？\n再度ログインが必要になります');
            if(!confirmResult) {
                return;
            }

            firebase.auth().signOut().then(() => {
                console.log('ログアウトしました');
            });
        },
        accountDel: function() {
            //アカウントを削除する
            let result = confirm('アカウントを削除しますか？\n削除すると復元する事はできません');
            if(result) {
                const user = firebase.auth().currentUser;
                user.delete().then(() => {
                    alert('アカウントを削除しました');
                    this.$router.replace('/');
                }).catch(error => console.log(error));
            } else {
                return;
            }
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
        linkSet: function() {
            //抽選リンクを作成
            const selectNum = document.formSelect.lotterySelect.selectedIndex;
            const LotteryId = document.formSelect.lotterySelect.options[selectNum].value;

            document.querySelector('#copyTg').value = 'http://localhost:3000/LotteryPage/' + this.$route.params.groupId + '/' + LotteryId;
            console.log('リンクを作成');
        },
        linkCopy: function() {
            //抽選リンクのコピー
            const tg = document.querySelector('#copyTg');

            tg.select();

            document.execCommand('copy');

            alert('URLをコピーしました');
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3f51b5;
}
.mtb {
    margin: 35px 0;
}
.back-img {
    position: absolute;
    top: 0px;
    left: 15px;
    color: #3f51b5;
    font-size: 28px;
}

.content-width {
    position: relative;
    margin: 0 auto;
    max-width: 640px;
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
    position: relative;
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
.list-title:hover {
    cursor: pointer;
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
    -ms-overflow-style: none;    /* IE, Edge 対応 */
    scrollbar-width: none;       /* Firefox 対応 */
}
.list-contents-big::-webkit-scrollbar {  /* Chrome, Safari 対応 */
    display: none;
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

.list-lottery {
    display: none;
    opacity: 0;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: #44968e;
}
.list-lottery-open.list-lottery {
    display: block;
    opacity: 1.0;
}
.list-lottery-header {
    display: flex;
    justify-content: space-around;
    border-bottom: solid 2px #3f51b5;
}
.list-lottery-header-text {
    font-size: 15px;
    font-weight: normal;
    width: 25%;
}
.list-lottery-leader {
    position: relative;
    margin: 5px 0;
    display: flex;
    justify-content: space-around;
}
.list-lottery-leader-text {
    font-size: 15px;
    font-weight: normal;
    width: 25%;
}

.list-lottery-leader-check {
    position: absolute;
    left: 10px;
}

.list-del-member {
    display: none;
    opacity: 0;
    margin-bottom: 30px;
    padding: 10px 0;
    background-color: #44968e;
}
.list-open.list-del-member {
    display: block;
    opacity: 1.0;
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

.error-ms {
  padding: 5px 10px 0;
  text-align: right;
  font-size: 14px;
  color: #a73f1e;
}

.link-copy-box {
    padding: 5px 0;
    margin: 0 0 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #44968e;
}
.link-copy-box-title {
    padding-right: 15px;
    font-size: 14px;
    font-weight: normal;
}
.link-copy-box-text {
    font-size: 14px;
    border: none;
    outline: none;
    background-color: transparent;
    overflow-x: scroll;
    color: #3f51b5;
}
.link-copy-box-img {
    margin-left: 5px;
    width: 20px;
}


@media screen and (min-width: 1060px) {
    .box {
      width: calc(100vw - 201px);
    }
}
</style>