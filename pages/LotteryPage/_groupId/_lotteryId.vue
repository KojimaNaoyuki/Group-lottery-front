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
                <div class="member-list">
                    <div class="member-list-header">
                        <h3>名前</h3>
                        <h3>学年</h3>
                        <h3>状態</h3>
                    </div>
                </div>
                <div class="member-list-contents" v-for="item in memberArr" :key="item.id">
                    <div class="leader-icon" v-if="item.id == item.group_judg"></div>
                    <h4>{{item.member_name}}</h4>
                    <h4>{{item.school_year | otherYear}}</h4>
                    <h4 v-if="item.status == 'join'">参加</h4>
                    <h4 v-if="item.status == 'hold'">保留</h4>
                </div>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list1">
            <h2 class="list-title" @click="listOpen(1)"><ListOpenIcon :text="list1Text" />一人で参加</h2>
            <div class="list-contents">
                <label class="input-box">
                    名前&ensp;
                    <input type="text" class="input" placeholder="入力" v-model="inputName[0]">
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
                </label>
                <Btn text="登録" class="list-btn" @clickedFn="registerMember" />
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list2">
            <h2 class="list-title" @click="listOpen(2)"><ListOpenIcon :text="list2Text" />複数人で参加</h2>
            <div class="list-contents-big">
                <label class="input-box" v-for="n in inputNum" :key="n">
                    名前&ensp;
                    <input type="text" class="input" placeholder="入力" v-model="inputName[n]">
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
                </label>

                <div @click="inputAdd"><ListOpenIcon text="+" class="list-add-btn" /></div>

                <Btn text="登録" class="list-btn" @clickedFn="registerMemberMulti" />
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list3">
            <h2 class="list-title" @click="listOpen(3)"><ListOpenIcon :text="list3Text" />抽選結果を表示</h2>
            <div class="list-contents-big">
                <div class="member-list">
                    <div class="member-list-header">
                        <h3>当選者名</h3>
                    </div>
                </div>
                <div class="member-list-contents" v-for="item in memberWinnerArr" :key="item.id">
                    <h4>{{item.leader_name}}</h4>
                </div>
            </div>
        </div>
        <!-- アコーディオンメニュー -->
    </div>
</template>

<script>
import axios from "axios";
import ListOpenIcon from './../../../components/presentational/atoms/ListOpenIcon.vue';
import Input from './../../../components/presentational/atoms/Input.vue';
import Btn from './../../../components/presentational/atoms/Btn.vue';
export default {
    layout: 'deepPageLayout',
    components: {
        ListOpenIcon,
        Input,
        Btn
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
            LotteryInfo: [],
            inputName: [],
            memberArr: [],
            memberWinnerArr: []
        }
    },
    mounted: async function() {
        //グループIDを取得
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        this.GroupId = Number(groupId.slice(0, groupIdLength));

        //抽選IDを取得
        this.LotteryId = Number(this.$route.params.lotteryId);

        //抽選情報を取得
        await axios
        .get("http://localhost:8000/api/room/" + this.LotteryId)
        .then(response => {
            this.LotteryInfo = response.data.data[0];
        })
        .catch(error => console.log(error));

        //メンバーを取得
        await axios
        .get("http://localhost:8000/api/roomMemberGetmemmber/?group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
        .then(response => {
            this.memberArr = response.data.data;
        })
        .catch(error => console.log(error));

        //当選者を取得
        await axios
        .get("http://localhost:8000/api/LotteryResultWhereRoomId/?room_id=" + this.LotteryId)
        .then(response=> {
            console.log(response.data.data);
            this.memberWinnerArr = response.data.data;
        })
        .catch(error => console.log(error));
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

            //同一名で登録されていないか確認
            //DB登録済み名チェック
            let ValidationFlag = true;
            await axios
            .get("http://localhost:8000/api/roomMemberValidationName/?member_name=" + this.inputName[0] + "&group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
            .then(response => {
                if(response.data.data == 'false') {
                    ValidationFlag = false;
                }
            })
            .catch(error => console.log(error));
            if(!ValidationFlag) {
                alert('同じ名前が使用されています');
                return;
            }

            //代表者のIDを取得
            let leaderId;
            await axios
            .get("http://localhost:8000/api/roomMemberGetMaxId")
            .then(response => {
                leaderId = response.data.data + 1;
            })
            .catch(error => console.log(error));

            let selectNum;

            selectNum = document.formSelect.year.selectedIndex;
            const schoolYear = Number(document.formSelect.year.options[selectNum].value);

            selectNum = document.formSelect.status.selectedIndex;
            const status = document.formSelect.status.options[selectNum].value;

            const sendData = {
                member_name: this.inputName[0],
                school_year: schoolYear,
                status: status,
                group_judg: leaderId,
                group_id: this.GroupId,
                room_id: this.LotteryId
            }

            await axios
            .post("http://localhost:8000/api/roomMember/", sendData)
            .then(() => console.log("データベース登録完了"))
            .catch(error => console.log(error));

            alert('登録しました');
        },
        registerMemberMulti: async function() {
            //メンバー登録 複数人

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
            //DB登録済み名チェック
            for(let i = 1; i < this.inputName.length; i++) {
                await axios
                .get("http://localhost:8000/api/roomMemberValidationName/?member_name=" + this.inputName[i] + "&group_id=" + this.GroupId + "&room_id=" + this.LotteryId)
                .then(response => {
                    if(response.data.data == 'false') {
                        ValidationFlag = false;
                    }
                })
                .catch(error => console.log(error));
            }
            if(!ValidationFlag) {
                alert('同じ名前が使用されています');
                return;
            }

            //代表者のIDを取得
            let leaderId;
            await axios
            .get("http://localhost:8000/api/roomMemberGetMaxId")
            .then(response => {
                leaderId = response.data.data + 1;
            })
            .catch(error => console.log(error));

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

                const sendData = {
                    member_name: this.inputName[i],
                    school_year: schoolYear,
                    status: status,
                    group_judg: leaderId,
                    group_id: this.GroupId,
                    room_id: this.LotteryId
                }
                
                await axios
                .post("http://localhost:8000/api/roomMember/", sendData)
                .then(() => console.log("データベース登録完了"))
                .catch(error => console.log(error));
            }

            alert("登録しました");
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
</style>