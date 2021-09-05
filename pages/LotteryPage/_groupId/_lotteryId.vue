<template>
    <div class="box">
        <div class="lottery-info">
            <div class="back-img"><NuxtLink :to="'/LotteryList/' + this.$route.params.groupId"><h3>&lt;</h3></NuxtLink></div>
            <h2 class="lottery-info-title">{{LotteryInfo.lottery_title}}</h2>
            <h3 class="lottery-info-day">期限： {{LotteryInfo.lottery_day}}</h3>
        </div>
        <!-- アコーディオンメニュー -->
        <div class="list" id="list0">
            <h2 class="list-title" @click="listOpen(0)"><ListOpenIcon :text="list0Text" />メンバーを確認</h2>
            <div class="list-contents-big">
                <div class="content-width">
                    <div class="member-list">
                        <div class="member-list-header">
                            <h3>名前</h3>
                            <h3>学年</h3>
                            <h3>状態</h3>
                        </div>
                    </div>
                    <div class="member-list-contents" v-for="item in memberArr" :key="item.id">
                        <div class="leader-icon" v-if="item.id == item.group_judg"></div>
                        <h4 v-if="!item.del_flag">{{item.member_name}}</h4>
                        <h4 v-if="!item.del_flag">{{item.school_year | otherYear}}</h4>
                        <h4 v-if="item.status == 'join' && !item.del_flag">参加</h4>
                        <h4 v-if="item.status == 'hold' && !item.del_flag">保留</h4>
                        <h4 v-if="item.del_flag">削除済み</h4>
                    </div>
                </div>

                <DownArrow />
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list1">
            <h2 class="list-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />一人で参加</h2>
            <div class="list-contents">
                <div class="content-width">
                    <validation-observer ref="obs" v-slot="ObserverProps">
                        <label class="input-box">
                            <validation-provider v-slot="ProviderProps" rules="required">
                                名前&ensp;
                                <input type="text" class="input" placeholder="入力" v-model="inputName[0]" name="名前">
                                <form name="formSelect">
                                    <select name="year" class="input-select">
                                        <option value="1">1年</option>
                                        <option value="2">2年</option>
                                        <option value="3">3年</option>
                                        <option value="4">4年</option>
                                        <option value="0">他</option>
                                    </select>
                                    <select name="status" class="input-select">
                                        <option value="join">参加</option>
                                        <option value="hold">保留</option>
                                    </select>
                                </form>
                                <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                            </validation-provider>
                        </label>
                        <Btn text="登録" class="list-btn" @clickedFn="registerMember" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
                    </validation-observer>
                </div>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list2">
            <h2 class="list-title" @click="listOpen(2)"><ListOpenIcon :text="list2Text" />複数人で参加</h2>
            <div class="list-contents-big">
                <div class="content-width">
                    <validation-observer ref="obs" v-slot="ObserverProps">
                        <label class="input-box" v-for="n in inputNum" :key="n">
                            <validation-provider v-slot="ProviderProps" rules="required">
                                名前&ensp;
                                <input type="text" class="input" placeholder="入力" v-model="inputName[n]" name="名前">
                                <form :name="'formSelect' + n">
                                    <select :name="'year' + n" class="input-select">
                                        <option value="1">1年</option>
                                        <option value="2">2年</option>
                                        <option value="3">3年</option>
                                        <option value="4">4年</option>
                                        <option value="0">他</option>
                                    </select>
                                    <select :name="'status' + n" class="input-select">
                                        <option value="join">参加</option>
                                        <option value="hold">保留</option>
                                    </select>
                                </form>
                                <div class="error-ms">{{ ProviderProps.errors[0] }}</div>
                            </validation-provider>
                        </label>

                        <div @click="inputAdd"><ListOpenIcon text="+" class="list-add-btn" /></div>

                        <Btn text="登録" class="list-btn" @clickedFn="registerMemberMulti" :disabled="ObserverProps.invalid || !ObserverProps.validated" />
                    </validation-observer>
                </div>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list3">
            <h2 class="list-title" @click="listOpen(3)"><ListOpenIcon :text="list3Text" />抽選結果を表示</h2>
            <div class="list-contents-big">
                <div class="content-width">
                    <div class="member-list">
                        <div class="member-list-header">
                            <h3>当選者名</h3>
                        </div>
                    </div>
                    <div class="member-list-contents-block" v-for="itemWrap in memberWinnerArr" :key="itemWrap.id">
                        <div class="member-list-contents-group">
                            <h4 v-for="item in itemWrap" :key="item.id">{{item.member_name}}</h4>
                        </div>
                    </div>
                </div>

                <DownArrow />
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
import ListOpenIcon from './../../../components/presentational/atoms/ListOpenIcon.vue';
import Input from './../../../components/presentational/atoms/Input.vue';
import Btn from './../../../components/presentational/atoms/Btn.vue';
import DownArrow from './../../../components/presentational/atoms/DownArrow.vue';
import firebase from '~/plugins/firebase';

export default {
    layout: 'deepPageLayout',
    components: {
        ListOpenIcon,
        Input,
        Btn,
        DownArrow
    },
    data() {
        return {
            list0Text: '+',
            list1Text: '+',
            list2Text: '+',
            list3Text: '+',
            inputNum: 2,
            LotteryId: null,
            GroupId: null,
            leaderId: 1,
            LotteryInfo: [],
            inputName: [],
            memberArr: [],
            memberWinnerArr: []
        }
    },
    mounted: async function() {
        this.loaderDisplay(true); //ローダー開始

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        let roomRef = firebase.firestore().collection("rooms");
        let roomMemberRef = firebase.firestore().collection("rooms_members");
        let lotteryResultsRef = firebase.firestore().collection("lottery_results");
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //グループIDを取得
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        this.GroupId = Number(groupId.slice(0, groupIdLength));

        //抽選IDを取得
        this.LotteryId = Number(this.$route.params.lotteryId);

        //抽選情報を取得
        //-------------------------------------------------// original API  //-------------------------------------------------//
        // await axios
        // .get("https://www.kwebk.xyz/api/room/" + this.LotteryId)
        // .then(response => {
        //     this.LotteryInfo = response.data.data[0];
        // })
        // .catch(error => console.log(error));
        //-------------------------------------------------// original API  //-------------------------------------------------//

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        await roomRef.where('id', '==', Number(this.LotteryId))
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.LotteryInfo = doc.data();
            });
        }).catch(error => console.log(error));
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //メンバーを取得
        //-------------------------------------------------// original API  //-------------------------------------------------//
        // await axios
        // .get("https://www.kwebk.xyz/api/roomMemberGetmemmber/?group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
        // .then(response => {
        //     this.memberArr = response.data.data;
        // })
        // .catch(error => console.log(error));
        //-------------------------------------------------// original API  //-------------------------------------------------//

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        await roomMemberRef.where('group_id', '==', this.GroupId).where('room_id', '==', this.LotteryId)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.memberArr.push(doc.data());
            })
        }).catch(error => console.log(error));
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //当選者を取得
        //当選者リーダーを取得
        let leaderWinnerArr = [];
        //-------------------------------------------------// original API  //-------------------------------------------------//
        // await axios
        // .get("https://www.kwebk.xyz/api/LotteryResultGetLotteryResultMember/?group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
        // .then(response => {
        //     leaderWinnerArr = response.data.data;
        // })
        // .catch(error => console.log(error));
        //-------------------------------------------------// original API  //-------------------------------------------------//

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        await lotteryResultsRef.where('group_id', '==', this.GroupId).where('room_id', '==', this.LotteryId)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                leaderWinnerArr.push(doc.data());
            })
        }).catch(error => console.log(error));
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //リーダ名から当選者IDを取得
        let leaderWinnerIdArr = [];
        for(let i = 0; i < leaderWinnerArr.length; i++) {
            //-------------------------------------------------// original API  //-------------------------------------------------//
            // await axios
            // .get("https://www.kwebk.xyz/api/roomMemberGetLeaderId/?group_id=" + this.GroupId + "&room_id=" + this.LotteryId + "&member_name=" + leaderWinnerArr[i].leader_name)
            // .then(response => {
            //     leaderWinnerIdArr.push(response.data.data);
            // })
            // .catch(error => console.log(error));
            //-------------------------------------------------// original API  //-------------------------------------------------//

            //-------------------------------------------------//  firebase  //-------------------------------------------------//
            await roomMemberRef.where('group_id', '==', Number(this.GroupId)).where('room_id', '==', Number(this.LotteryId)).where('member_name', '==', String(leaderWinnerArr[i].leader_name))
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    leaderWinnerIdArr.push(doc.data());
                });
            }).catch(error => console.log(error));
            //-------------------------------------------------//  firebase  //-------------------------------------------------//
        }

        //リーダIDから当選者全体を取得
        for(let i = 0; i < leaderWinnerIdArr.length; i++) {
            //-------------------------------------------------// original API  //-------------------------------------------------//
            // await axios
            // .get("https://www.kwebk.xyz/api/getMemmberWhereJudg/?group_id=" + this.GroupId + "&room_id=" + this.LotteryId + "&group_judg=" + leaderWinnerIdArr[i][0].id)
            // .then(response => {
            //     this.memberWinnerArr.push(response.data.data);
            // })
            // .catch(error => console.log(error));
            //-------------------------------------------------// original API  //-------------------------------------------------//

            //-------------------------------------------------//  firebase  //-------------------------------------------------//
            let tmp = [];
            await roomMemberRef.where('group_id', '==', Number(this.GroupId)).where('room_id', '==', Number(this.LotteryId)).where('group_judg', '==', Number(leaderWinnerIdArr[i].id)).where('del_flag', '==', false)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    tmp.push(doc.data());
                });
                this.memberWinnerArr.push(tmp);
            }).catch(error => console.log(error));
            //-------------------------------------------------//  firebase  //-------------------------------------------------//
        }
        console.log(this.memberWinnerArr);

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
                case 3:
                    if(this.list3Text == '+') {
                        this.list3Text = '--'
                    } else {
                        this.list3Text = '+'
                    }
                    break;
            }
        },
        inputAdd: function() {
            //テキストボックス追加
            this.inputNum++;
        },
        registerMember: async function() {
            //メンバー登録

            //投票状態チェック
            if(!this.LotteryInfo.public_private_info) {
                alert('この抽選は受付停止してます');
                return;
            }

            this.loaderDisplay(true); //ローダーを開始

            let roomsMembersRef = firebase.firestore().collection("rooms_members");

            //同一名で登録されていないか確認
            //DB登録済み名チェック
            let ValidationFlag = true;
            // await axios
            // .get("https://www.kwebk.xyz/api/roomMemberValidationName/?member_name=" + this.inputName[0] + "&group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
            // .then(response => {
            //     if(response.data.data == 'false') {
            //         ValidationFlag = false;
            //     }
            // })
            // .catch(error => console.log(error));
            await roomsMembersRef.where('group_id', '==', this.GroupId).where('room_id', '==', this.LotteryId).where('member_name', '==', this.inputName[0])
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    ValidationFlag = false;
                });
            }).catch(error => console.log(error));
            if(!ValidationFlag) {
                this.loaderDisplay(false); //ローダー終了
                alert('同じ名前が使用されています');
                return;
            }

            //代表者のIDを取得
            let leaderId;
            // await axios
            // .get("https://www.kwebk.xyz/api/roomMemberGetMaxId")
            // .then(response => {
            //     leaderId = response.data.data + 1;
            // })
            // .catch(error => console.log(error));
            await roomsMembersRef.orderBy("id", "desc").limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.leaderId = doc.data().id + 1;
                })
            })

            let selectNum;

            selectNum = document.formSelect.year.selectedIndex;
            const schoolYear = Number(document.formSelect.year.options[selectNum].value);

            selectNum = document.formSelect.status.selectedIndex;
            const status = document.formSelect.status.options[selectNum].value;

            // const sendData = {
                // member_name: this.inputName[0],
                // school_year: schoolYear,
                // status: status,
                // group_judg: leaderId,
                // group_id: this.GroupId,
                // room_id: this.LotteryId,
                // del_flag: false
            // }

            // await axios
            // .post("https://www.kwebk.xyz/api/roomMember/", sendData)
            // .then(() => console.log("データベース登録完了"))
            // .catch(error => console.log(error));
            await roomsMembersRef.doc(String(this.leaderId)).set({
                id: Number(this.leaderId),
                member_name: this.inputName[0],
                school_year: schoolYear,
                status: status,
                group_judg: Number(this.leaderId),
                group_id: this.GroupId,
                room_id: this.LotteryId,
                del_flag: false
            })
            .then(() => console.log('firebase ok'))
            .catch(error => console.log(error));

            this.loaderDisplay(false); //ローダー終了

            alert('登録しました');

            location.reload(); //リロード
        },
        registerMemberMulti: async function() {
            //メンバー登録 複数人

            //投票状態チェック
            if(!this.LotteryInfo.public_private_info) {
                alert('この抽選は受付停止してます');
                return;
            }

            //同一名で登録されていないか確認
            //フロント側インプットボックス
            let ValidationFlag = true;
            this.inputName.forEach((element, index, arr) => {
                for(let i = 0; i < arr.length; i++) {
                    if(index != i) {
                        if(element == arr[i]) {
                            ValidationFlag = false;
                        }
                    }
                }
            });
            if(!ValidationFlag) {
                alert('同じ名前が使用されています');
                return;
            }

            this.loaderDisplay(true); //ローダーを開始

            let roomsMembersRef = firebase.firestore().collection("rooms_members");

            //DB登録済み名チェック
            for(let i = 1; i < this.inputName.length; i++) {
                // await axios
                // .get("https://www.kwebk.xyz/api/roomMemberValidationName/?member_name=" + this.inputName[i] + "&group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
                // .then(response => {
                //     if(response.data.data == 'false') {
                //         ValidationFlag = false;
                //     }
                // })
                // .catch(error => console.log(error));
                await roomsMembersRef.where('group_id', '==', this.GroupId).where('room_id', '==', this.LotteryId).where('member_name', '==', this.inputName[i])
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        ValidationFlag = false;
                    });
                }).catch(error => console.log(error));
            }
            if(!ValidationFlag) {
                this.loaderDisplay(false); //ローダー終了
                alert('同じ名前が使用されています');
                return;
            }

            //代表者のIDを取得
            let leaderId;
            // await axios
            // .get("https://www.kwebk.xyz/api/roomMemberGetMaxId")
            // .then(response => {
            //     leaderId = response.data.data + 1;
            // })
            // .catch(error => console.log(error));
            await roomsMembersRef.orderBy("id", "desc").limit(1).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.leaderId = doc.data().id + 1;
                })
            })

            let selectNum;
            let schoolYear;
            let status;
            let str;
            for(let i = 1; i < this.inputNum + 1; i++) {
                str = 'document.formSelect' + i + '.year' + i;
                selectNum = eval(str + '.selectedIndex');
                str += '.options[' + selectNum + '].' + 'value';
                schoolYear = Number(eval(str));

                str = 'document.formSelect' + i + '.status' + i;
                selectNum = eval(str + '.selectedIndex');
                str += '.options[' + selectNum + '].' + 'value';
                status = eval(str);

                // const sendData = {
                //     member_name: this.inputName[i],
                //     school_year: schoolYear,
                //     status: status,
                //     group_judg: leaderId,
                //     group_id: this.GroupId,
                //     room_id: this.LotteryId,
                //     del_flag: false
                // }
                
                // await axios
                // .post("https://www.kwebk.xyz/api/roomMember/", sendData)
                // .then(() => console.log("データベース登録完了"))
                // .catch(error => console.log(error));
                await roomsMembersRef.doc(String(this.leaderId+(i-1))).set({
                    id: Number(this.leaderId+(i-1)),
                    member_name: this.inputName[i],
                    school_year: schoolYear,
                    status: status,
                    group_judg: Number(this.leaderId),
                    group_id: this.GroupId,
                    room_id: this.LotteryId,
                    del_flag: false
                })
                .then(() => console.log('firebase ok'))
                .catch(error => console.log(error));
            }

            this.loaderDisplay(false); //ローダー終了

            alert("登録しました");

            location.reload(); //リロード
        },
        loaderDisplay: function(state) {
            //ローダーの表示
            const tg = document.querySelector('#global-contents');

            if(state) {
                tg.classList.add('rod-on');  
            } else {
                tg.classList.remove('rod-on');
            }
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3f51b5;
}
form {
    display: inline;
}

.content-width {
    position: relative;
    margin: 0 auto;
    max-width: 640px;
}

.block {
    display: block;
}

.lottery-info {
    position: relative;
    padding: 0 0 20px 0;
    background-color: #69b5a3;
}
.back-img {
    position: absolute;
    top: 0px;
    left: 15px;
    color: #3f51b5;
    font-size: 28px;
}
.lottery-info-title {
    padding: 30px 0;
    text-align: center;
    font-size: 22px;
}
.lottery-info-day {
    text-align: center;
    font-size: 16px;
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
    display:none;
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

.member-list {
    width: 100%;
}
.member-list-header {
    display: flex;
    justify-content: space-around;
    border-bottom: solid 2px #3f51b5;
}
.member-list-header > h3 {
    width: 33%;
    padding: 5px 0;
    font-size: 16px;
    font-weight: 600;
}
.member-list-contents {
    position: relative;
    display: flex;
    justify-content: space-around;
}
.member-list-contents > h4 {
    width: 33%;
    height: 31px;
    padding: 5px 0;
    font-size: 14px;
    font-weight: normal;
    overflow-x: scroll;
    -ms-overflow-style: none;    /* IE, Edge 対応 */
    scrollbar-width: none;       /* Firefox 対応 */
}
.member-list-contents > h4::-webkit-scrollbar {  /* Chrome, Safari 対応 */
    display:none;
}
.member-list-contents-block {
    position: relative;
    text-align: center;
}
.member-list-contents-block > h4 {
    width: 33%;
    height: 31px;
    padding: 5px 0;
    font-size: 14px;
    font-weight: normal;
}
.member-list-contents-group {
    padding: 5px 0;
    margin: 15px 20px;
    background-color: #44968e;
    border-radius: 3px;
}
.member-list-contents-group > h4 {
    font-size: 14px;
    font-weight: normal;
}
.leader-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 12px;
    height: 12px;
    background-color: #ff9800;
    border-radius: 50%;
}

.input-box {
    display: block;
    margin-bottom: 30px;
}

.list-btn {
    display: block;
    margin: 30px auto 0 auto;
}

.list-add-btn {
    margin: 30px auto;
    display: block;
}

.input {
  width: 40%;
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

.input-select {
    width: 65px;
    padding: 0 5px;
    background-color: transparent;
    border: solid 2px #525252;
    border-radius: 5px;
    outline: none !important;
    transition: all 0.4s;
    font-size: 14px;
}
.input-select:hover {
    border: solid 2px #3f51b5;
}

.error-ms {
  padding: 5px 10px 0;
  text-align: right;
  font-size: 14px;
  color: #a73f1e;
}


@media screen and (min-width: 1060px) {
    .box {
      width: calc(100vw - 201px);
    }
}
</style>