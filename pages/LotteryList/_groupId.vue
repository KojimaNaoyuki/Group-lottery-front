<template>
    <div class="box">
        <div class="group">
            <h2 class="group-name">{{groupName}}</h2>
        </div>

        <div class="card">
            <h3 class="card-title">TitleTitle</h3>
            <h4 class="card-day">期限： 2021/06/29</h4>
            <Btn text="投票"/>
            <div class="card-status">受付中</div>
        </div>
        <div class="card">
            <h3 class="card-title">TitleTitle</h3>
            <h4 class="card-day">期限： 2021/06/29</h4>
            <Btn text="投票"/>
            <div class="card-status">受付中</div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Btn from './../../components/presentational/atoms/Btn.vue';
export default {
    layout: 'deepPageLayout',
    components: {
        Btn
    },
    data() {
        return {
            groupName: '存在しないグループ',
            firebase_id: null
        }
    },
    mounted: async function() {
        //グループIDを切り出す、DB検索用に
        let groupId =  this.$route.params.groupId;
        let groupIdLength = groupId.length-4;
        const dbGroupId = groupId.slice(0, groupIdLength);
        
        //DB検索
        await axios
        .get("http://localhost:8000/api/group/" + dbGroupId)
        .then(response => {
            this.firebase_id = response.data.data[0].firebase_id; //firebase_idを取得
            this.groupName = response.data.data[0].name; //groupNameを取得
        })
        .catch(error => console.log('エラー: ' + error));

        //グループidの検証
        console.log(groupId + ' == ' + this.firebase_id);
        if(Number(groupId) == this.firebase_id) {
            console.log('グループid検証完了');
        } else {
            console.log('グループidが不正です');
            alert('グループが存在しません');
            window.location = "/";
        }
    }
}
</script>

<style scoped>
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
</style>