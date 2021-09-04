<template>
    <div class="box">
        <div class="group">
            <h2 class="group-name">{{groupName}}</h2>
        </div>

        <div class="card" v-for="item in LotteryArr" :key="item.id">
            <div class="content-width">
                <h3 class="card-title">{{item.lottery_title}}</h3>
                <h4 class="card-day">期限： {{item.lottery_day}}</h4>
                <Btn text="確認" @clickedFn="toLotteryPage(item.id)"/>
                <div class="card-status" v-if="item.public_private_info">受付中</div>
                <div class="card-status-stop" v-if="!item.public_private_info">受付停止</div>
            </div>
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
    </div>
</template>

<script>
import axios from "axios";
import Btn from './../../components/presentational/atoms/Btn.vue';
import firebase from '~/plugins/firebase';

export default {
    layout: 'deepPageLayout',
    components: {
        Btn
    },
    data() {
        return {
            groupName: '存在しないグループ',
            firebase_id: null,
            LotteryArr: []
        }
    },
    mounted: async function() {
        this.loaderDisplay(true); //ローダー開始
        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        let groupRef = firebase.firestore().collection("groups");
        let roomRef = firebase.firestore().collection("rooms");
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //グループIDを切り出す、DB検索用に
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        const dbGroupId = groupId.slice(0, groupIdLength);
        
        //DB検索
        //-------------------------------------------------// original API  //-------------------------------------------------//
        // await axios
        // .get("https://www.kwebk.xyz/api/group/" + dbGroupId)
        // .then(response => {
        //     this.firebase_id = response.data.data[0].firebase_id; //firebase_idを取得
        //     this.groupName = response.data.data[0].name; //groupNameを取得
        // })
        // .catch(error => console.log('エラー: ' + error));
        //-------------------------------------------------// original API  //-------------------------------------------------//

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        await groupRef.where('id', '==', Number(dbGroupId))
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.firebase_id = doc.data().firebase_id;
                this.groupName = doc.data().name;
            });
        })
        .catch(error => console.log(error));
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        //グループidの検証
        console.log(groupId + ' == ' + this.firebase_id);
        if(Number(groupId) == this.firebase_id) {
            console.log('グループid検証完了');
        } else {
            console.log('グループidが不正です');
            alert('グループが存在しません');
            window.location = "/";
        }

        //ルーム取得
        //-------------------------------------------------// original API  //-------------------------------------------------//
        // await axios
        // .get("https://www.kwebk.xyz/api/roomCustom?group_id=" + dbGroupId)
        // .then(response => {
        //     console.log(response.data.data);
        //     this.LotteryArr = response.data.data;
        // })
        // .catch(error => console.log(error));
        //-------------------------------------------------// original API  //-------------------------------------------------//

        //-------------------------------------------------//  firebase  //-------------------------------------------------//
        await roomRef.where('group_id', '==', Number(dbGroupId))
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.LotteryArr.push(doc.data());
            });
        }).catch(error => console.log(error));
        //-------------------------------------------------//  firebase  //-------------------------------------------------//

        this.loaderDisplay(false); //ローダー終了
    },
    methods: {
        toLotteryPage: function(id) {
            this.$router.push('/LotteryPage/' + this.$route.params.groupId + '/' + id);
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
.content-width {
    position: relative;
    margin: 0 auto;
    max-width: 640px;
}

.box {
    padding: 0 0 45px;
}
.group {
    position: relative;
    background-color: #69b5a3;
}
.group-name {
    padding: 40px 0;
    text-align: center;
    font-size: 22px;
}
.card {
    position: relative;
    padding: 20px;
    background-color: #44968e;
    text-align: center;
}
.card:nth-child(odd) {
    background-color: #74a9a7;
}
.card:last-child {
    margin: 0 auto
}
.card-title {
    margin: 0 auto;
    width: 80%;
    padding: 5px 0;
    font-size: 20px;
    border-bottom: solid 2px #2382ce;
}
.card-day {
    padding: 25px 0;
    font-size: 16px;
    font-weight: 600;
}
.card-status {
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: brown;
    font-size: 16px;
    font-weight: bold;
}
.card-status-stop {
    position: absolute;
    right: 10px;
    bottom: 5px;
    color: #3e4b94;
    font-size: 16px;
    font-weight: bold;
}

@media screen and (min-width: 1060px) {
    .box {
      width: calc(100vw - 201px);
    }
}
</style>