<template>
    <div class="box">
        <div class="lottery-info">
            <div class="back-img"><h3>&lt;</h3></div>
            <h2 class="lottery-info-title">titletitle</h2>
            <h3 class="lottery-info-day">期限： 2021/06/29</h3>
        </div>
        <div class="list" id="list0" @click="listOpen(0)">
            <h2 class="list-title"><ListOpenIcon :text="list0Text" />メンバーを確認</h2>
            <div class="list-contents">
                <h2>dddddd</h2>
            </div>
        </div>
        <div class="list" id="list1" @click="listOpen(1)">
            <h2 class="list-title"><ListOpenIcon :text="list1Text" />一人で参加</h2>
            <div class="list-contents">
                <h2>dddddd</h2>
            </div>
        </div>
        <div class="list" id="list2" @click="listOpen(2)">
            <h2 class="list-title"><ListOpenIcon :text="list2Text" />複数人で参加</h2>
            <div class="list-contents">
                <h2>dddddd</h2>
            </div>
        </div>
    </div>
</template>

<script>
import ListOpenIcon from './../../../components/presentational/atoms/ListOpenIcon.vue';
export default {
    layout: 'deepPageLayout',
    components: {
        ListOpenIcon
    },
    data() {
        return {
            list0Text: '+',
            list1Text: '+',
            list2Text: '+',
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
        }
    }
}
</script>

<style scoped>
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
}
.list-open .list-contents {
    visibility: visible;
    height: 100px;
    opacity: 1;
    transition: all 0.4s;
}
</style>