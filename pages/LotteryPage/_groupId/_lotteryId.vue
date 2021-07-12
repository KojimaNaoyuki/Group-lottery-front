<template>
    <div class="box">
        <div class="lottery-info">
            <div class="back-img"><NuxtLink to="/LotteryList"><h3>&lt;</h3></NuxtLink></div>
            <h2 class="lottery-info-title">titletitle</h2>
            <h3 class="lottery-info-day">期限： 2021/06/29</h3>
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
                <div class="member-list-contents">
                    <div class="leader-icon"></div>
                    <h4>埼玉太郎</h4>
                    <h4>3</h4>
                    <h4>参加</h4>
                </div>
                <div class="member-list-contents">
                    <div class="leader-icon"></div>
                    <h4>五郎埼玉</h4>
                    <h4>2</h4>
                    <h4>保留</h4>
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
                    <Input placeholder="入力"/>
                </label>
                <Btn text="登録" class="list-btn"/>
            </div>
        </div>
        <!-- アコーディオンメニュー -->

        <!-- アコーディオンメニュー -->
        <div class="list" id="list2">
            <h2 class="list-title" @click="listOpen(2)"><ListOpenIcon :text="list2Text" />複数人で参加</h2>
            <div class="list-contents-big">
                <label class="input-box" v-for="n in inputNum" :key="n">
                    名前&ensp;
                    <Input placeholder="入力"/>
                </label>

                <div @click="inputAdd"><ListOpenIcon text="+" class="list-add-btn" /></div>

                <Btn text="登録" class="list-btn"/>
            </div>
        </div>
        <!-- アコーディオンメニュー -->
    </div>
</template>

<script>
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
            inputNum: 2
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
        inputAdd: function() {
            //テキストボックス追加
            this.inputNum++;
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: #3f51b5;
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
</style>